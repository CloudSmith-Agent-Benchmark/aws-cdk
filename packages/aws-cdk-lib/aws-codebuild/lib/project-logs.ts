import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';
import { Construct } from 'constructs';

// Fixed: Removed initializer and corrected type
export interface S3LoggingOptions {
  readonly bucket: s3.IBucket;
  readonly enabled?: boolean;
  readonly prefix?: string;
  readonly encrypted?: boolean;
}

// Fixed: Removed initializer and corrected type
export interface CloudWatchLoggingOptions {
  readonly logGroup: logs.LogGroup;
  readonly enabled?: boolean;
  readonly prefix?: string;
}

// Fixed: Removed initializer and corrected type
export interface LoggingOptions {
  readonly s3?: S3LoggingOptions;
  readonly cloudWatch?: CloudWatchLoggingOptions;
}

// Fixed: Added required parameters and corrected return type
export function createLogGroup(scope: Construct, id: string): logs.LogGroup {
  const group: logs.LogGroup = new logs.LogGroup(scope, id);
  return group;
}

// Fixed: Corrected parameter type
export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  const s3Bucket: s3.IBucket = bucket;
  return s3Bucket;
}

// Fixed: Removed incompatible assignment
// export const defaultLogGroup: logs.LogGroup = "my-log-group";