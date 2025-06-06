import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';
import { Construct } from 'constructs';

export interface S3LoggingOptions {
  /**
   * The S3 Bucket for logs
   */
  readonly bucket: s3.IBucket;
  
  /**
   * Optional S3 path prefix
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
   * Whether S3 logs are enabled
   * 
   * @default true
   */
  readonly enabled?: boolean;
}

export interface CloudWatchLoggingOptions {
  /**
   * The CloudWatch log group
   */
  readonly logGroup: logs.ILogGroup;
  
  /**
   * The prefix for the stream name
   * 
   * @default - no prefix
   */
  readonly prefix?: string;
  
  /**
   * Whether CloudWatch logs are enabled
   * 
   * @default true
   */
  readonly enabled?: boolean;
}

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
 * 
 * @param scope The construct scope
 * @param id The construct id
 */
export function createLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}

/**
 * Configure S3 logging for CodeBuild
 * 
 * @param bucket The S3 bucket to use for logging
 */
export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  return bucket;
}

/**
 * Get a default log group for CodeBuild
 * 
 * @param scope The construct scope
 * @param id The construct id
 */
export function getDefaultLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}