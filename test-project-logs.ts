import * as logs from './packages/aws-cdk-lib/aws-logs';
import * as s3 from './packages/aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

// Test interface definitions
export interface S3LoggingOptions {
  readonly bucket: s3.IBucket;
  readonly prefix?: string;
  readonly enabled?: boolean;
  readonly encrypted?: boolean;
}

export interface CloudWatchLoggingOptions {
  readonly logGroup: logs.ILogGroup;
  readonly enabled?: boolean;
}

export interface LoggingOptions {
  readonly s3?: S3LoggingOptions;
  readonly cloudWatch?: CloudWatchLoggingOptions;
}

// Test function with proper constructor usage
export function createLogGroup(scope: Construct, id: string): logs.LogGroup {
  const group = new logs.LogGroup(scope, id);
  return group;
}

// Test function with proper parameter type
export function configureS3Logging(bucket: s3.IBucket) {
  const s3Bucket: s3.IBucket = bucket;
  return s3Bucket;
}

// Test function instead of constant
export function getDefaultLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}

console.log('TypeScript validation passed!');