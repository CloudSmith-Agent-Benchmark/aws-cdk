import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';
import { Construct } from 'constructs';

// Fixed interface definition without initializers
export interface S3LoggingOptions {
  readonly bucket: s3.IBucket;
  readonly prefix?: string;
  readonly enabled?: boolean;
  readonly encrypted?: boolean;
}

// Fixed interface definition without initializers
export interface CloudWatchLoggingOptions {
  readonly logGroup?: logs.LogGroup;
  readonly prefix?: string;
  readonly enabled?: boolean;
}

// Fixed interface definition with proper types
export interface LoggingOptions {
  readonly s3?: S3LoggingOptions;
  readonly cloudWatch?: CloudWatchLoggingOptions;
}

// Fixed function with proper return type and arguments
export function createLogGroup(scope: Construct, id: string): logs.LogGroup {
  const group = new logs.LogGroup(scope, id);
  return group;
}

// Fixed function with proper parameter type
export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  const s3Bucket: s3.IBucket = bucket;
  return s3Bucket;
}

// Fixed constant with proper type
export const defaultLogGroupName: string = "my-log-group";