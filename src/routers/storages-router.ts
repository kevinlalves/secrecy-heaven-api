import { Router } from 'express';
import { createStorage } from '@/controllers';
import { authenticateCredentials } from '@/middlewares';
import { upload } from '@/config/multer';

const storagesRouter = Router();

storagesRouter.use(authenticateCredentials);
storagesRouter.post('/', upload.single('file'), createStorage);

export default storagesRouter;
