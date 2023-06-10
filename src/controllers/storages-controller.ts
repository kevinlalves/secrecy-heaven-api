import { NextFunction, Request, Response } from 'express';

export async function createStorage(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('wait for it');
  } catch (err) {
    next(err);
  }
}
