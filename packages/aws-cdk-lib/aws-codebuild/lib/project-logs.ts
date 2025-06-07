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
  readonly logGroup?: logs.ILogGroup;
  readonly prefix?: string;
  readonly enabled?: boolean;
}

// Fixed interface definition without initializers
export interface LoggingOptions {
  readonly s3?: S3LoggingOptions;
  readonly cloudWatch?: CloudWatchLoggingOptions;
}

// Fixed function with proper parameter types and return type
export function createLogGroup(scope: Construct, id: string): logs.LogGroup {
  const group = new logs.LogGroup(scope, id);
  return group;
}

// Fixed function with proper parameter types
export function configureS3Logging(bucket: s3.IBucket): s3.IBucket {
  const s3Bucket: s3.IBucket = bucket;
  return s3Bucket;
}

// Fixed constant with proper type
export function getDefaultLogGroup(scope: Construct, id: string): logs.LogGroup {
  return new logs.LogGroup(scope, id, { 
    logGroupName: "my-log-group" 
  });
}