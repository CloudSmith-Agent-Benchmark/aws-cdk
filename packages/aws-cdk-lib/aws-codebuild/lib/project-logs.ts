/**
 * S3 logging options for CodeBuild projects
 */
  /**
   * The S3 Bucket to send logs to.
   */
  readonly bucket: s3.IBucket;

  /**
   * Optional S3 path prefix for the logs.
   *
   * @default - No prefix
   */
  readonly prefix?: string;

  /**
   * Whether to disable encryption for the S3 logs.
   *
   * @default - false (encryption enabled)
   */
  readonly encrypted?: boolean;

  /**
   * Whether to enable S3 logging.
   *
   * @default - true
   */
  readonly enabled?: boolean;
/**
 * CloudWatch logging options for CodeBuild projects
 */
  /**
   * The CloudWatch log group to send logs to.
   */
  readonly logGroup: logs.ILogGroup;

  /**
   * Optional string to prefix CloudWatch log streams.
   *
   * @default - No prefix
   */
  readonly prefix?: string;

  /**
   * Whether to enable CloudWatch logging.
   *
   * @default - true
   */
  readonly enabled?: boolean;
/**
 * Logging options for CodeBuild projects
 */
  /**
   * S3 logging configuration.
   *
   * @default - No S3 logging
   */
  readonly s3?: S3LoggingOptions;
  
  /**
   * CloudWatch logging configuration.
   *
   * @default - No CloudWatch logging
   */
  readonly cloudWatch?: CloudWatchLoggingOptions;
/**
 * Creates a CloudWatch LogGroup for CodeBuild.
 * Requires the scope and id parameters for the LogGroup construction.
 */
export function createLogGroup(scope: any, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
/**
 * Default name for CloudWatch LogGroup when not specified
 */
export const DEFAULT_LOG_GROUP_NAME = 'codebuild-logs';

  /**
   * The path prefix for S3 logs
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
