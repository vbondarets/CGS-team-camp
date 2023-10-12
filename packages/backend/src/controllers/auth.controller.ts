import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/user.type';
import UserService from '../services/user.service';
import { mailer } from '../utils/nodemailer/nodemailer';
import ApiError from '../helpers/error/ApiError';
import { tokenGenerator, verify } from '../utils/jwt/jwt';

export class AuthController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password }: IUser = req.body;
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    const user = await this.userService.createUser({ email, password: hasedPassword });
    const token = tokenGenerator(user);
    if (user) {
      await mailer.sendConfirmation(user.email, token);
    } else {
      return next(ApiError.internal());
    }
    return res.send({ status: 'ok' });
  }

  async confirmUser(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    const payload = verify(token);
    const user = await this.userService.confirm(payload.id);
    if (user) {
      return res.send({ status: 'ok' });
    }
    return next(ApiError.internal());
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await this.userService.login(email);
    if (user && user.confirmed) {
      if (await bcrypt.compare(password, user.password)) {
        return res.send({ token: tokenGenerator(user) });
      }
      return next(ApiError.conflict('Wrong password'));
    }
    return next(ApiError.internal());
  }

  async getRessetPassword(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return next(ApiError.notFound('User not found'));
    }
    const token = tokenGenerator(user);
    await mailer.sendResset(email, token);
    return res.send({ status: 'ok' });
  }

  async ressetPassword(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    const { token } = req.params;
    const payload = verify(token);
    if (!payload.id) {
      return next(ApiError.forbidden('Wrong token'));
    }
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    const user = await this.userService.updatePassword(payload.id, hasedPassword);
    if (user) {
      return res.send({ status: 'ok' });
    }
    return next(ApiError.internal());
  }
}
const authController = new AuthController(new UserService());
export default authController;
