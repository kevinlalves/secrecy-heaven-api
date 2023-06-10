import { loadEnv } from '@/config';

export function fetchEnv(key: string, defaultValue?: string) {
  loadEnv();
  const value = defaultValue ? defaultValue : process.env[key];

  if (typeof value === 'undefined') {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
}
