import { NextFunction, Request, Response } from 'express';
import { unprocessableEntity } from '@/utils/constants';

export async function createStorage(req: Request, res: Response, next: NextFunction) {
  if (!req.file) return res.status(unprocessableEntity).send({ message: 'file must have content' });

  try {
    const partSize = req.file.size / 3;

    console.log('1st part', req.file.buffer.slice(0, partSize));
    console.log('2st part', req.file.buffer.slice(partSize, 2 * partSize));
    console.log('3rd part', req.file.buffer.slice(2 * partSize));

    return res.send();
  } catch (err) {
    next(err);
  }
}
