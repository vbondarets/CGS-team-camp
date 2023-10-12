import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import ApiError from '../helpers/error/ApiError.js';

const validation = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return next(ApiError.conflict(`Validation error: ${error.details[0].message}`));
  }
  next();
};

export default validation;
