import { Router } from 'express';
import authenticationRouter from './authentication-router';
import usersRouter from './users-router';

const appRouter = Router();

appRouter.use('/auth', authenticationRouter);
appRouter.use('/users', usersRouter);

export default appRouter;
