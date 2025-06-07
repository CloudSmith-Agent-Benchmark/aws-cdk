import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';
import { Construct } from 'constructs';

// Error 1: Fixed type assignment for interface property
export interface S3LoggingOptions {
  readonly bucket: s3.IBucket;
  readonly prefix?: string;
  readonly enabled?: boolean;
  readonly encrypted?: boolean;
}

// Error 2: Fixed type declaration
export interface CloudWatchLoggingOptions {
  readonly logGroup?: logs.ILogGroup;
  readonly enabled?: boolean;
}

// Error 3: Fixed type mismatch in property
export interface LoggingOptions {
  readonly s3?: S3LoggingOptions;
  readonly cloudWatch?: CloudWatchLoggingOptions;
}

// Error 4: Fixed return type and added required parameters
export function createLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}

// Error 5: Fixed parameter type
export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  return bucket;
}

// Error 6: Fixed incompatible type assignment
export function defaultLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}