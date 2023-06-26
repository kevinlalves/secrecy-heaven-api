import { Router } from 'express';
import { createStorage, getStorage, getStorages } from '@/controllers';
import { authenticateCredentials, validateParams } from '@/middlewares';
import { upload } from '@/config/multer';
import { showRecordSchema } from '@/schemas/shared-schemas';

const storagesRouter = Router();

storagesRouter.use(authenticateCredentials);
storagesRouter.get('/', getStorages);
storagesRouter.get('/:id', validateParams(showRecordSchema), getStorage);
storagesRouter.post('/', upload.single('file'), createStorage);

export default storagesRouter;
