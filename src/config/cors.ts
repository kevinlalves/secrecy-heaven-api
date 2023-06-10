import cors from 'cors';
import { fetchEnv } from '@/utils/functions';

export const corsConfig = () =>
  cors({
    origin: fetchEnv('SECRECY_HEAVEN_WEB_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
