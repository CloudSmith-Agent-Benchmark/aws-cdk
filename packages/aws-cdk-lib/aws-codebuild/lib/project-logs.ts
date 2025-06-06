import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';
import { Construct } from 'constructs';

// Fixed Error 1: Removed initializer and corrected type
export interface S3LoggingOptions {
  readonly bucket: s3.IBucket;
}

// Fixed Error 2: Removed initializer and corrected type
export interface CloudWatchLoggingOptions {
  readonly logGroup: logs.ILogGroup;
}

// Fixed Error 3: Removed initializer and made property optional
export interface LoggingOptions {
  readonly s3?: S3LoggingOptions;
  readonly cloudWatch?: CloudWatchLoggingOptions;
}

// Fixed Error 4: Corrected return type and added required parameters
export function createLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}

// Fixed Error 5: Corrected parameter type
export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  return bucket;
}

// Fixed Error 6: Replaced constant with a function
export function getDefaultLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}