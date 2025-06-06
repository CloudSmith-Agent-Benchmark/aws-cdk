import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';

// Fixed: Removed initializer
export interface S3LoggingOptions {
  readonly bucket: s3.IBucket;
}

// Fixed: Removed initializer and corrected type
export interface CloudWatchLoggingOptions {
  readonly logGroup: logs.ILogGroup;
}

// Fixed: Removed initializer
export interface LoggingOptions {
  readonly s3?: S3LoggingOptions;
}

// Fixed: Corrected return type
export function createLogGroup(): logs.LogGroup {
  const group: logs.LogGroup = new logs.LogGroup();
  return group;
}

// Fixed: Corrected parameter type
export function configureS3Logging(bucket: s3.IBucket) {
  const s3Bucket: s3.IBucket = bucket;
  return s3Bucket;
}

// Fixed: Changed string to proper LogGroup type
export const defaultLogGroup: logs.LogGroup = new logs.LogGroup();