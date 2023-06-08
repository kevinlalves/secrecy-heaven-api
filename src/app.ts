import 'reflect-metadata';
import 'express-async-errors';
import express, { Express, json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import appRouter from './routers';
import { loadEnv, connectDb, disconnectDB, connectRedis } from '@/config';
import { handleApplicationErrors } from '@/middlewares';

loadEnv();

const app = express();
app
  .use(cors())
  .use(cookieParser())
  .use(json())
  .get('/health', (_req, res) => res.sendStatus(200))
  .use(appRouter)
  .use(handleApplicationErrors);

export async function init(): Promise<Express> {
  connectDb();
  await connectRedis();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
