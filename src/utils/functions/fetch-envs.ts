import { loadEnv } from '@/config';

loadEnv();

export function fetchEnv(key: string) {
  const value = process.env[key];

  if (typeof value === 'undefined') {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
}
