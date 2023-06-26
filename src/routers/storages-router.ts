import { Router } from 'express';
import { createStorage, getStorage } from '@/controllers';
import { authenticateCredentials } from '@/middlewares';
import { upload } from '@/config/multer';

const storagesRouter = Router();

storagesRouter.use(authenticateCredentials);
storagesRouter.get('/:name', getStorage);
storagesRouter.post('/', upload.single('file'), createStorage);

export default storagesRouter;
