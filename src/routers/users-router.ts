import { Router } from 'express';
import { storagesRouter } from '@/routers/users';
import { createUserSchema } from '@/schemas';
import { authenticateCredentials, validateBody } from '@/middlewares';
import { createUser } from '@/controllers';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), createUser);
usersRouter.use(authenticateCredentials);
usersRouter.use('/storages', storagesRouter);

export default usersRouter;
