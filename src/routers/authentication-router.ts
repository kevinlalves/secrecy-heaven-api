import { Router } from 'express';
import { authenticateCredentials, validateBody } from '@/middlewares';
import { getCurrentUser, singIn } from '@/controllers';
import { signInSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singIn);
authenticationRouter.get('/me', authenticateCredentials, getCurrentUser);

export default authenticationRouter;
