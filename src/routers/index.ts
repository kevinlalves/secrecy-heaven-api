import { Router } from 'express';
import authenticationRouter from './authentication-router';
import usersRouter from './users-router';
import storagesRouter from './storages-router';

const appRouter = Router();

appRouter.use('/auth', authenticationRouter);
appRouter.use('/users', usersRouter);
appRouter.use('/storages', storagesRouter);

export default appRouter;
