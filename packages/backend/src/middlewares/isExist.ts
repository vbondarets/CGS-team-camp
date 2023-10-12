import { Request, Response, NextFunction } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import ApiError from '../helpers/error/ApiError';
import { myDataSource } from '../config/database';

export default (entity: EntityTarget<ObjectLiteral>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const repository = myDataSource.getRepository(entity);
    const id = req.params.id ? req.params.id : req.body.id;
    if ('email' in req.body) {
      const { email } = req.body;
      if (await repository.findOneBy({ email })) {
        next(ApiError.conflict('User alresy exist'));
      } else {
        next();
        return;
      }
    }
    if (!id) {
      next(ApiError.conflict('No data provided'));
    }
    if (!(await repository.findOneBy({ id }))) {
      return next(ApiError.notFound(`${repository.metadata.name} not found`));
    }
    next();
  };
