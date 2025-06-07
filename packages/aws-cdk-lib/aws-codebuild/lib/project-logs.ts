import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';

// Fixed: Removed initializer and corrected type to s3.IBucket
export interface S3LoggingOptions {
  /**
   * The S3 bucket for logs
   */
  readonly bucket: s3.IBucket;
  
  /**
   * Whether the logging is enabled
   */
  readonly enabled?: boolean;
  
  /**
   * The prefix to use for the logs
   */
  readonly prefix?: string;
  
  /**
   * Whether the logs should be encrypted
   */
  readonly encrypted?: boolean;
}

// Fixed: Removed initializer and corrected type to logs.LogGroup
export interface CloudWatchLoggingOptions {
  /**
   * The log group for logs
   */
  readonly logGroup?: logs.LogGroup;
  
  /**
   * Whether the logging is enabled
   */
  readonly enabled?: boolean;
  
  /**
   * The prefix to use for the logs
   */
  readonly prefix?: string;
}

// Fixed: Corrected type and removed initializer
export interface LoggingOptions {
  /**
   * S3 logging options
   */
  readonly s3?: S3LoggingOptions;
  
  /**
   * CloudWatch logging options
   */
  readonly cloudWatch?: CloudWatchLoggingOptions;
}

// Fixed: Corrected return type to match actual return value
export function createLogGroup(): logs.LogGroup {
  const group: logs.LogGroup = new logs.LogGroup();
  return group;
}

// Fixed: Corrected parameter type
export function configureS3Logging(bucket: s3.IBucket) {
  const s3Bucket: s3.IBucket = bucket;
  return s3Bucket;
}

// Fixed: Corrected type assignment
export const defaultLogGroup = new logs.LogGroup();