import { NextFunction, Request, Response } from 'express';
import { unprocessableEntity } from '@/utils/constants';
import { JWTPayload } from '@/middlewares';
import storageServices from '@/services/storage-services';

export async function createStorage(req: Request, res: Response, next: NextFunction) {
  const { userId } = res.locals as JWTPayload;
  if (!req.file) return res.status(unprocessableEntity).send({ message: 'file must have content' });

  try {
    await storageServices.createStorage(req.file, userId);

    return res.send();
  } catch (err) {
    next(err);
  }
}

export async function getStorage(req: Request, res: Response, next: NextFunction) {
  const { userId } = res.locals as JWTPayload;
  const { name } = req.params;

  try {
    const { fileData, fileName } = await storageServices.downloadFile(name, userId);

    res.set('Content-Disposition', `attachment; filename=${fileName}`).send(fileData);
  } catch (err) {
    next(err);
  }
}
