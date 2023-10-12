import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/error/ApiError';

type ControllerMethod = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const wrapper =
  (controllerMethod: ControllerMethod) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerMethod(req, res, next);
    } catch (err) {
      if (err) {
        if (err instanceof ApiError) {
          return res.status(err.status).json({ message: err.message });
        }
        return next(ApiError.internal(err as string));
      }
    }
  };
