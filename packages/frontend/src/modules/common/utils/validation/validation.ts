// eslint-disable-next-line import/no-extraneous-dependencies
import { Schema } from 'joi';

const validation = (schema: Schema, body: object): { message: string } => {
  const { error } = schema.validate(body);
  if (error) {
    return error.details[0];
  }
  return { message: 'ok' };
};

export default validation;
