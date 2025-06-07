import * as cxapi from '../../cx-api';
import { FeatureFlags, Stack } from '../lib';

// Mock the CURRENT_VERSION_EXPIRED_FLAGS array for testing
jest.mock('../../cx-api', () => {
  const originalModule = jest.requireActual('../../cx-api');
  return {
    ...originalModule,
    CURRENT_VERSION_EXPIRED_FLAGS: ['expired-flag'],
    futureFlagDefault: jest.fn().mockImplementation((flag) => {
      if (flag === 'test-flag') return true;
      return false;
    }),
  };
});

describe('feature flags', () => {
  describe('isEnabled', () => {
    test('returns true when the flag is enabled', () => {
      const stack = new Stack();
      stack.node.setContext(cxapi.NEW_STYLE_STACK_SYNTHESIS_CONTEXT, true);

      const actual = FeatureFlags.of(stack).isEnabled(cxapi.NEW_STYLE_STACK_SYNTHESIS_CONTEXT);
      expect(actual).toEqual(true);
    });

    test('falls back to the default', () => {
      const stack = new Stack();

      expect(FeatureFlags.of(stack).isEnabled(cxapi.NEW_STYLE_STACK_SYNTHESIS_CONTEXT)).toEqual(
        cxapi.futureFlagDefault(cxapi.NEW_STYLE_STACK_SYNTHESIS_CONTEXT));
    });

    test('invalid flag', () => {
      const stack = new Stack();

      expect(FeatureFlags.of(stack).isEnabled('non-existent-flag')).toEqual(false);
    });

    test('strings are evaluated as boolean', () => {
      const stack = new Stack();
      stack.node.setContext(cxapi.NEW_STYLE_STACK_SYNTHESIS_CONTEXT, 'true');

      const actual = FeatureFlags.of(stack).isEnabled(cxapi.NEW_STYLE_STACK_SYNTHESIS_CONTEXT);
      expect(actual).toEqual(true);
    });
    
    test('returns true for expired flags', () => {
      const stack = new Stack();
      
      // This should return true since it's an expired flag
      const actual = FeatureFlags.of(stack).isEnabled('expired-flag');
      expect(actual).toEqual(true);
    });
    
    test('throws error when expired flag is explicitly set', () => {
      const stack = new Stack();
      stack.node.setContext('expired-flag', false);
      
      // This should throw an error since we're trying to set an expired flag
      expect(() => {
        FeatureFlags.of(stack).isEnabled('expired-flag');
      }).toThrow(/Unsupported feature flag 'expired-flag'/);
    });
    
    test('returns default value for known flag', () => {
      const stack = new Stack();
      
      // This should return the mocked default value (true)
      const actual = FeatureFlags.of(stack).isEnabled('test-flag');
      expect(actual).toEqual(true);
    });
    
    test('false is properly evaluated as boolean false', () => {
      const stack = new Stack();
      stack.node.setContext('test-flag', false);
      
      const actual = FeatureFlags.of(stack).isEnabled('test-flag');
      expect(actual).toEqual(false);
    });
  });
});
