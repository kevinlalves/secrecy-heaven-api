import { S3Client } from '@aws-sdk/client-s3';
import { fetchEnv } from '@/utils/functions';

export const s3 = new S3Client({
  credentials: {
    accessKeyId: fetchEnv('ACCESS_KEY_ID'),
    secretAccessKey: fetchEnv('SECRET_ACCESS_KEY'),
  },
  region: 'us-east-1',
});
