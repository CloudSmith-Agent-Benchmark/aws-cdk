import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';
import { Construct } from 'constructs';

// Define proper interfaces without initializers
export interface S3LoggingOptions {
  /**
   * The S3 Bucket for build logs.
   */
  readonly bucket: s3.IBucket;
  
  /**
   * Optional prefix to use for log objects in the bucket.
   * @default - no prefix
   */
  readonly prefix?: string;
  
  /**
   * Whether to disable encryption for the logs.
   * @default false
   */
  readonly encrypted?: boolean;
  
  /**
   * Whether logging is enabled.
   * @default true
   */
  readonly enabled?: boolean;
}

export interface CloudWatchLoggingOptions {
  /**
   * The CloudWatch log group to send logs to.
   */
  readonly logGroup: logs.ILogGroup;
  
  /**
   * Optional prefix to use for log streams.
   * @default - no prefix
   */
  readonly prefix?: string;
  
  /**
   * Whether logging is enabled.
   * @default true
   */
  readonly enabled?: boolean;
}

export interface LoggingOptions {
  /**
   * S3 logging options.
   * @default - no S3 logging
   */
  readonly s3?: S3LoggingOptions;
  
  /**
   * CloudWatch logging options.
   * @default - no CloudWatch logging
   */
  readonly cloudWatch?: CloudWatchLoggingOptions;
}

/**
 * Creates a new CloudWatch log group for CodeBuild logs.
 * 
 * @param scope The construct scope
 * @param id The construct ID
 * @param props Optional properties for the log group
 * @returns The created log group
 */
export function createLogGroup(scope: Construct, id: string, props?: logs.LogGroupProps): logs.LogGroup {
  const group = new logs.LogGroup(scope, id, props);
  return group;
}

/**
 * Configures S3 logging for a CodeBuild project.
 * 
 * @param bucket The S3 bucket to use for logging
 * @returns S3LoggingOptions object
 */
export function configureS3Logging(bucket: s3.IBucket): S3LoggingOptions {
  return {
    bucket: bucket
  };
}

/**
 * Default CloudWatch log group for CodeBuild projects.
 * This is just a placeholder - actual log groups should be created with createLogGroup.
 */
export const defaultLogGroup = undefined;