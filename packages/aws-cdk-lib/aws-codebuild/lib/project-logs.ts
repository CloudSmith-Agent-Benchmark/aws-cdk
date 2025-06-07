import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';
import { Construct } from 'constructs';

// Fix 1: Removed initializer and corrected type
export interface S3LoggingOptions {
  readonly bucket: s3.IBucket;
  readonly prefix?: string;
  readonly enabled?: boolean;
  readonly encrypted?: boolean;
}

// Fix 2: Removed initializer and corrected type
export interface CloudWatchLoggingOptions {
  readonly logGroup: logs.ILogGroup;
  readonly enabled?: boolean;
}

// Fix 3: Corrected interface property type and removed initializer
export interface LoggingOptions {
  readonly s3?: S3LoggingOptions;
  readonly cloudWatch?: CloudWatchLoggingOptions;
}

// Fix 4: Corrected return type and constructor usage
export function createLogGroup(scope: Construct, id: string): logs.LogGroup {
  const group = new logs.LogGroup(scope, id);
  return group;
}

// Fix 5: Corrected parameter type
export function configureS3Logging(bucket: s3.IBucket) {
  const s3Bucket: s3.IBucket = bucket;
  return s3Bucket;
}

// Fix 6: Removed incorrect constant or replaced with a factory function
export function getDefaultLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}