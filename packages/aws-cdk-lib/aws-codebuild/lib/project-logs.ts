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
   * The path prefix in the bucket for logs
   * 
   * @default - no prefix
   */
  readonly prefix?: string;

  /**
   * Whether to enable S3 logs
   * 
   * @default true
   */
  readonly enabled?: boolean;

  /**
   * Whether logs should be encrypted
   * 
   * @default - encryption disabled
   */
  readonly encrypted?: boolean;
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
   * The path prefix for CloudWatch logs
   * 
   * @default - no prefix
   */
  readonly prefix?: string;

  /**
   * Whether to enable CloudWatch logs
   * 
   * @default true
   */
  readonly enabled?: boolean;
}

/**
 * Options for project logs
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
 * Creates a CloudWatch LogGroup for CodeBuild
 */
export function createLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}

/**
 * Configure S3 logging for a CodeBuild project
 */
export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  return bucket;
}

/**
 * Default log group for CodeBuild projects
 */
export function getDefaultLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}