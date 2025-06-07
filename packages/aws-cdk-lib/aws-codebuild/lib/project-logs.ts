import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';

export interface S3LoggingOptions {
  readonly bucket: s3.IBucket;
  readonly prefix?: string;
  readonly enabled?: boolean;
  readonly encrypted?: boolean;
}

export interface CloudWatchLoggingOptions {
  readonly logGroup: logs.ILogGroup;
  readonly prefix?: string;
  readonly enabled?: boolean;
}

export interface LoggingOptions {
  readonly s3?: S3LoggingOptions;
  readonly cloudWatch?: CloudWatchLoggingOptions;
}

export function createLogGroup(scope: logs.Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id);
}

export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  return bucket;
}

export function defaultLogGroup(scope: logs.Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id, {
    logGroupName: 'my-log-group'
  });
}