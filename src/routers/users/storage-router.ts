import { Router } from 'express';
import { createStorage } from '@/controllers';

export const storagesRouter = Router();

storagesRouter.post('/', createStorage);
