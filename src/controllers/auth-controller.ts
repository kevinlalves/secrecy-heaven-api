import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { JwtPayload } from 'jsonwebtoken';
import { usersRepository } from '@/repositories';
import { authenticationServices } from '@/services';
import { signInSchema } from '@/schemas';
import { jwtTokenDuration, sessionKeyName } from '@/utils/constants';
import { exclude } from '@/utils/functions';

export async function singIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as z.infer<typeof signInSchema>;

  try {
    const sessionCookie = await authenticationServices.signIn({ email, password });

    return res
      .cookie(sessionKeyName, sessionCookie, {
        httpOnly: true,
        maxAge: jwtTokenDuration * 1000,
        path: '/',
      })
      .send();
  } catch (err) {
    next(err);
  }
}

export async function getCurrentUser(_req: Request, res: Response, next: NextFunction) {
  const { userId }: JwtPayload = res.locals;

  try {
    const user = await usersRepository.findById(userId);

    return res.send(exclude(user, 'passwordDigest'));
  } catch (err) {
    next(err);
  }
}
