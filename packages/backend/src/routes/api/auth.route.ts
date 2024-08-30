import { Router } from 'express';

import { isAuth } from '../../middlewares/isAuth';
import authController from '../../controllers/auth.controller';
import { wrapper } from '../../middlewares/ctrlWrapper';
import isExist from '../../middlewares/isExist';
import { User } from '../../entities/User';
import validation from '../../middlewares/validation';
import userSchema from '../../helpers/joiSchemas/user.schema';

const authRouter: Router = Router();

authRouter.get('/self', isAuth(), wrapper(authController.getSelf.bind(authController)));
authRouter.post(
  '/register',
  validation(userSchema),
  isExist(User),
  wrapper(authController.register.bind(authController))
);
authRouter.post(
  '/login',
  validation(userSchema),
  wrapper(authController.login.bind(authController))
);
authRouter.get('/confirm/:token', wrapper(authController.confirmUser.bind(authController)));
authRouter.post('/reset-password', wrapper(authController.getRessetPassword.bind(authController)));
authRouter.post(
  '/reset-password/:token',
  wrapper(authController.ressetPassword.bind(authController))
);

export default authRouter;
