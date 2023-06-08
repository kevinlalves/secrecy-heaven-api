import { Router } from 'express';
import authRouter from './auth-router';
import { usersRouter } from './users-router';

const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/users', usersRouter);

export default appRouter;
