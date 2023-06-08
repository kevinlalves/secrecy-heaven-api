import { Router } from 'express';
import { authenticateCredentials, validateBody } from '@/middlewares';
import { getCurrentUser, singIn } from '@/controllers';
import { signInSchema } from '@/schemas';

const authRouter = Router();

authRouter.post('/sign_in', validateBody(signInSchema), singIn);
authRouter.get('/me', authenticateCredentials, getCurrentUser);

export default authRouter;
