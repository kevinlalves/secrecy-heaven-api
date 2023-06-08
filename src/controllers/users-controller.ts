import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { userServices } from '@/services';
import { created } from '@/utils/constants';
import { createUserSchema } from '@/schemas';
import { exclude } from '@/utils/functions';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { name, email, password }: z.infer<typeof createUserSchema> = req.body;

  try {
    const newUser = await userServices.createUser({ name, email, password });

    return res.status(created).send(exclude(newUser, 'passwordDigest'));
  } catch (err) {
    next(err);
  }
}
