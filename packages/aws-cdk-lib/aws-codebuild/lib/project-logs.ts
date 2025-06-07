import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';

// Fixed: Removed initializer from interface property
export interface S3LoggingOptions {
  readonly bucket: s3.IBucket;
  readonly prefix?: string;
  readonly enabled?: boolean;
  readonly encrypted?: boolean;
}

// Fixed: Removed initializer from interface property
export interface CloudWatchLoggingOptions {
  readonly logGroup: logs.LogGroup;
  readonly prefix?: string;
  readonly enabled?: boolean;
}

// Fixed: Corrected interface definition
export interface LoggingOptions {
  readonly s3?: S3LoggingOptions;
  readonly cloudWatch?: CloudWatchLoggingOptions;
}

// Fixed: Corrected function to provide required arguments and return correct type
export function createLogGroup(scope: any, id: string): logs.LogGroup {
  const group = new logs.LogGroup(scope, id);
  return group;
}

// Fixed: Corrected parameter type to match expected interface
export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  const s3Bucket: s3.IBucket = bucket;
  return s3Bucket;
}

// Fixed: Changed type to match value or vice versa
export const defaultLogGroupName: string = "my-log-group";