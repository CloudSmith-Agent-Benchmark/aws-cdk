import { Construct } from 'constructs';
/**
 * Options for S3 logging
 */
  /**
   * The S3 Bucket to send logs to
   */
  readonly bucket: s3.IBucket;
  
  /**
   * Optional S3 path prefix for the logs
   */
  readonly prefix?: string;
  
  /**
   * Whether to disable encryption for the logs
   * @default false
   */
  readonly encrypted?: boolean;
  
  /**
   * Whether to enable S3 logging
   * @default true
   */
  readonly enabled?: boolean;
/**
 * Options for CloudWatch logging
 */
  /** 
   * The log group where logs will be stored
   */
  readonly logGroup?: logs.ILogGroup;
  
  /**
   * Optional log stream prefix
   */
  readonly prefix?: string;
  
  /**
   * Whether to enable CloudWatch logging
   * @default true
   */
  readonly enabled?: boolean;
/**
 * Options for CodeBuild project logging
 */
   * @default - no prefix
   */
  readonly prefix?: string;

  /**
   * The current status of the logs in Amazon CloudWatch Logs for a build project
   *
   * @default true
   */
  readonly enabled?: boolean;
}

/**
 * Information about logs built to a CloudWatch Log Group for a build project.
 */
export interface CloudWatchLoggingOptions {
  /**
   * The Log Group to send logs to
   *
   * @default - no log group specified
   */
  readonly logGroup?: logs.ILogGroup;

  /**
   * The prefix of the stream name of the Amazon CloudWatch Logs
   *
   * @default - no prefix
   */
  readonly prefix?: string;

  /**
   * The current status of the logs in Amazon CloudWatch Logs for a build project
   *
   * @default true
   */
  readonly enabled?: boolean;
}

/**
 * Information about logs for the build project. A project can create logs in Amazon CloudWatch Logs, an S3 bucket, or both.
 */
export interface LoggingOptions {
  /**
   * Information about logs built to an S3 bucket for a build project.
   *
   * @default - disabled
   */
  readonly s3?: S3LoggingOptions;

  /**
   * Information about Amazon CloudWatch Logs for a build project.
   *
   * @default - enabled
   */
  readonly cloudWatch?: CloudWatchLoggingOptions;
}
