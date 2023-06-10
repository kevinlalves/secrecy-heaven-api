import { NextFunction, Request, Response } from 'express';
import { badRequest, conflict, forbidden, internalServerError, notFound, unauthorized } from '@/utils/constants';

export function handleApplicationErrors(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err.name === 'CannotEnrollBeforeStartDateError') {
    return res.status(badRequest).send({
      message: err.message,
    });
  }

  if (err.name === 'ConflictError' || err.name === 'DuplicatedEmailError') {
    return res.status(conflict).send({
      message: err.message,
    });
  }

  if (err.name === 'InvalidCredentialsError') {
    return res.status(unauthorized).send({
      message: err.message,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(unauthorized).send({
      message: err.message,
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(notFound).send({
      message: err.message,
    });
  }

  if (err.name === 'CannotListHotelsError') {
    return res.status(notFound).send({
      message: err.message,
    });
  }

  if (err.name === 'BadRequestError') {
    return res.status(badRequest).send({
      message: err.message,
    });
  }

  if (err.name === 'ForBiddenError') {
    return res.status(forbidden).send({
      message: err.message,
    });
  }

  if (err.name === 'CannotBookingError') {
    return res.status(forbidden).send({
      message: err.message,
    });
  }

  console.error(err);
  res.status(internalServerError).send({ message: 'Internal server error' });
}
