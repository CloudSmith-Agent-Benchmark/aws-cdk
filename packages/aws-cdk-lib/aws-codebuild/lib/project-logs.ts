import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';
import { Construct } from 'constructs';

/**
 * Options for S3 logging
 */
export interface S3LoggingOptions {
  /**
   * The S3 Bucket for logs
   */
  readonly bucket: s3.IBucket;

  /**
   * Optional S3 object prefix for logs
   * 
   * @default - no prefix
   */
  readonly prefix?: string;

  /**
   * Whether to enable encryption of logs
   * 
   * @default - false
   */
  readonly encrypted?: boolean;

  /**
   * Whether logging is enabled
   * 
   * @default true
   */
  readonly enabled?: boolean;
}

/**
 * Options for CloudWatch logging
 */
export interface CloudWatchLoggingOptions {
  /**
   * The CloudWatch log group
   */
  readonly logGroup: logs.ILogGroup;

  /**
   * Optional prefix for CloudWatch log streams
   * 
   * @default - no prefix
   */
  readonly prefix?: string;

  /**
   * Whether logging is enabled
   * 
   * @default true
   */
  readonly enabled?: boolean;
}

/**
 * Options for project logging
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
 * Creates a new CloudWatch log group
 * 
 * @param scope The construct scope
 * @param id The construct ID
 * @returns A new CloudWatch LogGroup
 */
export function createLogGroup(scope: Construct, id: string): logs.LogGroup {
  const group = new logs.LogGroup(scope, id);
  return group;
}

/**
 * Configure S3 logging
 * 
 * @param bucket The S3 bucket to use for logging
 * @returns The configured bucket
 */
export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  return bucket;
}

/**
 * Get a default log group for a project
 * 
 * @param scope The construct scope
 * @param id The construct ID
 * @returns A new CloudWatch LogGroup with default settings
 */
export function getDefaultLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}