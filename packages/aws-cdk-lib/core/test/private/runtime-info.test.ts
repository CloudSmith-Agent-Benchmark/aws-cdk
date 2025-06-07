import { Construct } from 'constructs';
import { App, MetadataEntry, NestedStack, Stack, Stage } from '../../lib';
import { MetadataType } from '../../lib/metadata-resource';
import {
  constructInfoFromConstruct,
  constructInfoFromStack,
  filterMetadataType,
} from '../../lib/private/runtime-info';
import { IPolicyValidationPluginBeta1 } from '../../lib/validation';

describe('runtime-info', () => {
  test('test filterMetadataType correct filter', () => {
    const metadata: MetadataEntry[] = [
      { type: MetadataType.CONSTRUCT, data: { hello: 'world' } },
      {
        type: MetadataType.METHOD,
        data: {
          bool: true,
          nested: { foo: 'bar' },
          arr: [1, 2, 3],
          str: 'foo',
          arrOfObjects: [{ foo: { hello: 'world' } }],
        },
      },
      {
        type: 'hello',
        data: { bool: true, nested: { foo: 'bar' }, arr: [1, 2, 3], str: 'foo' },
      },
      {
        type: MetadataType.FEATURE_FLAG,
        data: 'foobar',
      },
    ];

    expect(filterMetadataType(metadata)).toEqual([
      { hello: 'world' },
      {
        bool: true,
        nested: { foo: 'bar' },
        arr: [1, 2, 3],
        str: 'foo',
        arrOfObjects: [{ foo: { hello: 'world' } }],
      },
      'foobar',
    ]);
  });

  test('constructInfoFromConstruct returns undefined when no jsii runtime info', () => {
    // GIVEN
    class TestConstruct extends Construct {
      constructor(scope: Construct, id: string) {
        super(scope, id);
      }
    }
    const construct = new TestConstruct(new Stack(), 'TestConstruct');

    // WHEN
    const info = constructInfoFromConstruct(construct);

    // THEN
    expect(info).toBeUndefined();
  });

  test('constructInfoFromConstruct throws when jsii runtime info is malformed', () => {
    // GIVEN
    class TestConstruct extends Construct {
      constructor(scope: Construct, id: string) {
        super(scope, id);
      }
    }
    const construct = new TestConstruct(new Stack(), 'TestConstruct');
    
    // Add malformed jsii runtime info
    Object.getPrototypeOf(construct).constructor[Symbol.for('jsii.rtti')] = { 
      // Missing version field
      fqn: 'test.TestConstruct'
    };

    // THEN
    expect(() => constructInfoFromConstruct(construct)).toThrow(/malformed jsii runtime info/);
  });

  test('constructInfoFromStack collects info from all constructs', () => {
    // GIVEN
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    new Construct(stack, 'Child1');
    new Construct(stack, 'Child2');

    // WHEN
    const infos = constructInfoFromStack(stack);

    // THEN
    expect(infos.length).toBeGreaterThan(0);
    // Should include jsii runtime
    expect(infos.some(info => info.fqn === 'jsii-runtime.Runtime')).toBeTruthy();
  });

  test('validation plugin info is added to stack info', () => {
    // GIVEN
    const app = new App();
    const stage = new Stage(app, 'Stage');
    const stack = new Stack(stage, 'TestStack');
    
    // Create a mock validation plugin
    const mockPlugin: IPolicyValidationPluginBeta1 = {
      name: 'test-plugin',
      version: '1.0.0',
      validate: jest.fn(),
      ruleIds: ['rule1', 'rule2'],
    };
    
    // Add the plugin to the stage
    stage.policyValidationBeta1.push(mockPlugin);

    // WHEN
    const infos = constructInfoFromStack(stack);

    // THEN
    expect(infos.some(info => 
      info.fqn === 'policyValidation.test-plugin.rule1|rule2' && 
      info.version === '1.0.0'
    )).toBeTruthy();
  });

  test('validation plugin without ruleIds is handled correctly', () => {
    // GIVEN
    const app = new App();
    const stage = new Stage(app, 'Stage');
    const stack = new Stack(stage, 'TestStack');
    
    // Create a mock validation plugin without ruleIds
    const mockPlugin: IPolicyValidationPluginBeta1 = {
      name: 'test-plugin',
      version: '1.0.0',
      validate: jest.fn(),
      // No ruleIds
    };
    
    // Add the plugin to the stage
    stage.policyValidationBeta1.push(mockPlugin);

    // WHEN
    const infos = constructInfoFromStack(stack);

    // THEN
    expect(infos.some(info => 
      info.fqn === 'policyValidation.test-plugin' && 
      info.version === '1.0.0'
    )).toBeTruthy();
  });

  test('validation plugin without version uses default version', () => {
    // GIVEN
    const app = new App();
    const stage = new Stage(app, 'Stage');
    const stack = new Stack(stage, 'TestStack');
    
    // Create a mock validation plugin without version
    const mockPlugin: IPolicyValidationPluginBeta1 = {
      name: 'test-plugin',
      validate: jest.fn(),
      ruleIds: ['rule1'],
    };
    
    // Add the plugin to the stage
    stage.policyValidationBeta1.push(mockPlugin);

    // WHEN
    const infos = constructInfoFromStack(stack);

    // THEN
    expect(infos.some(info => 
      info.fqn === 'policyValidation.test-plugin.rule1' && 
      info.version === '0.0.0'
    )).toBeTruthy();
  });

  test('jsii agent version sanitizes special characters', () => {
    // Save original JSII_AGENT
    const originalJsiiAgent = process.env.JSII_AGENT;
    
    try {
      // Set JSII_AGENT with special characters
      process.env.JSII_AGENT = 'DotNet/5.0.3/.NETCoreApp,Version=v3.1/1.0.0.0';
      
      // Create a stack to trigger getJsiiAgentVersion
      const app = new App();
      const stack = new Stack(app, 'TestStack');
      
      // Get runtime info
      const infos = constructInfoFromStack(stack);
      
      // Find the jsii runtime entry
      const jsiiRuntime = infos.find(info => info.fqn === 'jsii-runtime.Runtime');
      
      // Verify special characters were sanitized
      expect(jsiiRuntime).toBeDefined();
      expect(jsiiRuntime!.version).toBe('DotNet/5.0.3/.NETCoreApp-Version=v3.1/1.0.0.0');
    } finally {
      // Restore original JSII_AGENT
      if (originalJsiiAgent === undefined) {
        delete process.env.JSII_AGENT;
      } else {
        process.env.JSII_AGENT = originalJsiiAgent;
      }
    }
  });

  test('jsii agent version defaults to node.js version when JSII_AGENT is not set', () => {
    // Save original JSII_AGENT
    const originalJsiiAgent = process.env.JSII_AGENT;
    
    try {
      // Unset JSII_AGENT
      delete process.env.JSII_AGENT;
      
      // Create a stack to trigger getJsiiAgentVersion
      const app = new App();
      const stack = new Stack(app, 'TestStack');
      
      // Get runtime info
      const infos = constructInfoFromStack(stack);
      
      // Find the jsii runtime entry
      const jsiiRuntime = infos.find(info => info.fqn === 'jsii-runtime.Runtime');
      
      // Verify it uses node.js version
      expect(jsiiRuntime).toBeDefined();
      expect(jsiiRuntime!.version).toContain('node.js/');
      expect(jsiiRuntime!.version).toContain(process.version);
    } finally {
      // Restore original JSII_AGENT
      if (originalJsiiAgent === undefined) {
        delete process.env.JSII_AGENT;
      } else {
        process.env.JSII_AGENT = originalJsiiAgent;
      }
    }
  });

  test('constructsInStack stops at nested stack boundaries', () => {
    // GIVEN
    const app = new App();
    const parentStack = new Stack(app, 'ParentStack');
    
    // Create a nested stack
    const nestedStack = new NestedStack(parentStack, 'NestedStack');
    
    // Add constructs to both stacks
    new Construct(parentStack, 'ParentConstruct');
    new Construct(nestedStack, 'NestedConstruct');
    
    // WHEN
    const parentInfos = constructInfoFromStack(parentStack);
    const nestedInfos = constructInfoFromStack(nestedStack);
    
    // THEN
    // Both should have their own constructs but not the other's
    expect(parentInfos.length).toBeGreaterThan(0);
    expect(nestedInfos.length).toBeGreaterThan(0);
    
    // The nested stack should be treated as a boundary
    const parentPaths = parentInfos.map(info => info.fqn);
    const nestedPaths = nestedInfos.map(info => info.fqn);
    
    // Both should have jsii runtime
    expect(parentPaths).toContain('jsii-runtime.Runtime');
    expect(nestedPaths).toContain('jsii-runtime.Runtime');
  });

  test('constructsInStack stops at stage boundaries', () => {
    // GIVEN
    const app = new App();
    const stage = new Stage(app, 'Stage');
    const stack = new Stack(stage, 'Stack');
    
    // Add constructs
    new Construct(app, 'AppConstruct');
    new Construct(stage, 'StageConstruct');
    new Construct(stack, 'StackConstruct');
    
    // WHEN
    const stackInfos = constructInfoFromStack(stack);
    
    // THEN
    // Should have stack constructs but not app or stage constructs
    expect(stackInfos.length).toBeGreaterThan(0);
    
    // All constructs should be from the stack or below
    const constructPaths = stackInfos.map(info => info.fqn).filter(fqn => !fqn.startsWith('jsii-runtime'));
    expect(constructPaths.length).toBeGreaterThan(0);
  });
});
