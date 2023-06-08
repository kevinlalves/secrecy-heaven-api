import { fetchEnv } from '../functions';

export const jwtSecret = fetchEnv('JWT_SECRET');
export const jwtTokenDuration = 60 * 60 * 24;
