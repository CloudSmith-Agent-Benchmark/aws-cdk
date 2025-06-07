import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';
import { Construct } from 'constructs';

/**
 * S3 logging options for CodeBuild projects
 */
export interface S3LoggingOptions {
  /**
   * The S3 Bucket to send logs to
   */
  readonly bucket: s3.IBucket;

  /**
   * Optional prefix to use for log objects
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
 * CloudWatch logging options for CodeBuild projects
 */
export interface CloudWatchLoggingOptions {
  /**
   * The CloudWatch log group to send logs to
   */
  readonly logGroup: logs.LogGroup;

  /**
   * Optional prefix to use for log streams
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
 * Logging options for CodeBuild projects
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
 * Creates a new CloudWatch log group for CodeBuild logging
 * 
 * @param scope The construct scope
 * @param id The construct id
 * @returns The created log group
 */
export function createLogGroup(scope: Construct, id: string): logs.LogGroup {
  const group = new logs.LogGroup(scope, id);
  return group;
}

/**
 * Configures S3 logging for a CodeBuild project
 * 
 * @param bucket The S3 bucket to use for logging
 * @returns The configured bucket
 */
export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  return bucket;
}

/**
 * Default log group name for CodeBuild projects
 */
export const DEFAULT_LOG_GROUP_NAME = "codebuild-logs";