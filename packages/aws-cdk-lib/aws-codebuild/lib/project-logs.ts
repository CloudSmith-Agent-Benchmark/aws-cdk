import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';

/**
 * Options for S3 logging for a CodeBuild Project
 */
export interface S3LoggingOptions {
  /**
   * The S3 Bucket to send logs to
   */
  readonly bucket: s3.IBucket;
  
  /**
   * The path prefix in the bucket for logs
   * 
   * @default - no prefix
   */
  readonly prefix?: string;
  
  /**
   * Whether to enable S3 logging
   * 
   * @default true
   */
  readonly enabled?: boolean;
  
  /**
   * Whether to disable encryption for the logs
   * 
   * @default false
   */
  readonly encrypted?: boolean;
}

/**
 * Options for CloudWatch logging for a CodeBuild Project
 */
export interface CloudWatchLoggingOptions {
  /**
   * The CloudWatch log group to send logs to
   */
  readonly logGroup: logs.ILogGroup;
  
  /**
   * The path prefix in the log group for logs
   * 
   * @default - no prefix
   */
  readonly prefix?: string;
  
  /**
   * Whether to enable CloudWatch logging
   * 
   * @default true
   */
  readonly enabled?: boolean;
}

/**
 * Options for logging configuration for a CodeBuild Project
 */
export interface LoggingOptions {
  /**
   * S3 logging options
   * 
   * @default - no S3 logging
   */
  readonly s3?: S3LoggingOptions;
  
  /**
   * CloudWatch logging options
   * 
   * @default - no CloudWatch logging
   */
  readonly cloudWatch?: CloudWatchLoggingOptions;
}

/**
 * Creates a CloudWatch log group for CodeBuild
 * 
 * @returns The created log group
 */
export function createLogGroup(scope: logs.Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}

/**
 * Configures S3 logging for a CodeBuild project
 * 
 * @param bucket The S3 bucket to use for logging
 * @returns The S3 bucket configured for logging
 */
export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  return bucket;
}

/**
 * Default log group for CodeBuild projects
 */
export const defaultLogGroup = (scope: logs.Construct, id: string): logs.LogGroup => {
  return new logs.LogGroup(scope, id, {
    logGroupName: 'my-log-group'
  });
};