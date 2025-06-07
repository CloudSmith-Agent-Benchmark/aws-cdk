import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';
import { Construct } from 'constructs';

// Fixed Error 1: Corrected type and removed initializer
export interface S3LoggingOptions {
  readonly bucket: s3.IBucket;
  readonly prefix?: string;
  readonly enabled?: boolean;
  readonly encrypted?: boolean;
}

// Fixed Error 2: Corrected type and removed initializer
export interface CloudWatchLoggingOptions {
  readonly logGroup?: logs.ILogGroup;
  readonly prefix?: string;
  readonly enabled?: boolean;
}

// Fixed Error 3: Corrected type and removed initializer
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

// Fixed Error 6: Replaced string with proper LogGroup instance
export function getDefaultLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}