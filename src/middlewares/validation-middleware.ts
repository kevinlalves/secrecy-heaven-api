import { NextFunction, Request, Response } from 'express';
import { Schema } from 'zod';
import { invalidDataError } from '@/errors';
import { unprocessableEntity } from '@/utils/constants';

export function validateBody<T>(schema: Schema<T>) {
  return validate(schema, 'body');
}

export function validateParams<T>(schema: Schema<T>) {
  return validate(schema, 'params');
}

function validate(schema: Schema, type: 'body' | 'params') {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[type]);

    if (result.success) {
      next();
    } else {
      const { error } = result;

      res.status(unprocessableEntity).send(invalidDataError(error.issues.map((issue) => issue.message)));
    }
  };
}
