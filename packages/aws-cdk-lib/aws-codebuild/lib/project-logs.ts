import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';

/**
 * Options for S3 logging
 */
export interface S3LoggingOptions {
  /**
   * The S3 Bucket for logs
   */
  readonly bucket: s3.IBucket;
  
  /**
   * Whether to enable S3 logging
   * 
   * @default true
   */
  readonly enabled?: boolean;
  
  /**
   * Optional S3 prefix
   * 
   * @default - no prefix
   */
  readonly prefix?: string;
  
  /**
   * Whether logs should be encrypted
   * 
   * @default - false (encryption disabled)
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
  readonly logGroup: logs.LogGroup;
  
  /**
   * Whether to enable CloudWatch logging
   * 
   * @default true
   */
  readonly enabled?: boolean;
  
  /**
   * Optional log stream prefix
   * 
   * @default - no prefix
   */
  readonly prefix?: string;
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
 * Creates a new CloudWatch log group for CodeBuild
 * 
 * @param scope The construct scope
 * @param id The construct id
 * @returns The created log group
 */
export function createLogGroup(scope: logs.Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}

/**
 * Configure S3 logging for a CodeBuild project
 * 
 * @param bucket The S3 bucket to use for logging
 * @returns The S3 bucket configured for logging
 */
export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  return bucket;
}