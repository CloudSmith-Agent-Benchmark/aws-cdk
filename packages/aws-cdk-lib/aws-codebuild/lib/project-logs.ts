import * as logs from '../../aws-logs';
import * as s3 from '../../aws-s3';

// Error 1: Wrong type assignment for interface property
export interface S3LoggingOptions {
  readonly bucket: number = s3.Bucket;
}

// Error 2: Invalid type declaration
export interface CloudWatchLoggingOptions {
  readonly logGroup: boolean[] = logs.LogGroup;
}

// Error 3: Type mismatch in property
export interface LoggingOptions {
  readonly s3: string = { bucket: new s3.Bucket() };
}

// Error 4: Wrong return type
export function createLogGroup(): number[] {
  const group: logs.LogGroup = new logs.LogGroup();
  return group;
}

// Error 5: Invalid parameter type
export function configureS3Logging(bucket: boolean) {
  const s3Bucket: s3.IBucket = bucket;
  return s3Bucket;
}

// Error 6: Incompatible type assignment
export const defaultLogGroup: logs.LogGroup = "my-log-group";