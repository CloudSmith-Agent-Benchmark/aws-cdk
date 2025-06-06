import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';

// Error 1: Fixed - removed initializer and corrected type
export interface S3LoggingOptions {
  readonly bucket: s3.IBucket;
}

// Error 2: Fixed - removed initializer and corrected type
export interface CloudWatchLoggingOptions {
  readonly logGroup: logs.ILogGroup;
}

// Error 3: Fixed - removed initializer and corrected type
export interface LoggingOptions {
  readonly s3?: S3LoggingOptions;
}

// Error 4: Fixed - corrected return type
export function createLogGroup(): logs.LogGroup {
  const group: logs.LogGroup = new logs.LogGroup();
  return group;
}

// Error 5: Fixed - corrected parameter type
export function configureS3Logging(bucket: s3.IBucket) {
  const s3Bucket: s3.IBucket = bucket;
  return s3Bucket;
}

// Error 6: Fixed - changed string to proper LogGroup instance
export const defaultLogGroup: logs.LogGroup = new logs.LogGroup();