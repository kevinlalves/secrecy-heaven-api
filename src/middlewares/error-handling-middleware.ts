import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { internalServerError } from '@/utils/constants';

export function handleApplicationErrors(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err.name === 'CannotEnrollBeforeStartDateError') {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.name === 'ConflictError' || err.name === 'DuplicatedEmailError') {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === 'InvalidCredentialsError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === 'CannotListHotelsError') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === 'BadRequestError') {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.name === 'ForBiddenError') {
    return res.status(httpStatus.FORBIDDEN).send({
      message: err.message,
    });
  }

  if (err.name === 'CannotBookingError') {
    return res.status(httpStatus.FORBIDDEN).send({
      message: err.message,
    });
  }

  console.error(err);
  res.status(internalServerError).send({ message: 'Internal server error' });
}
