import { createClient } from 'redis';
import RedisClient from '@redis/client/dist/lib/client';
import { fetchEnv } from '@/utils/functions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let redis: RedisClient<any, any, any>;

export async function connectRedis() {
  redis = createClient({
    url: fetchEnv('REDIS_URL'),
  });

  redis.on('error', (err) => console.log('Redis Client Error: ', err));
  await redis.connect();
}
