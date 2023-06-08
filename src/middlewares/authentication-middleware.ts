import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret, sessionKeyName, unauthorized } from '@/utils/constants';

export async function authenticateCredentials(req: Request, res: Response, next: NextFunction) {
  const sessionCookie = req.cookies[sessionKeyName];

  if (!sessionCookie) return res.sendStatus(unauthorized);

  try {
    const { userId } = jwt.verify(sessionCookie, jwtSecret) as JWTPayload;

    res.locals = { userId };

    return next();
  } catch (err) {
    return res.sendStatus(unauthorized);
  }
}

export type JWTPayload = {
  userId: string;
};
