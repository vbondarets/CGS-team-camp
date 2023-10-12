import { BACKEND_KEYS } from '../common/consts/app-keys.const';
import { IUser } from '../common/types/user.types';
import { HttpSerivce } from './http.service';

class AuthService extends HttpSerivce {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  async register(user: IUser) {
    const response = await this.post({
      url: BACKEND_KEYS.AUTH.REGISTER,
      data: user
    });
    return response.data;
  }

  async login(user: IUser) {
    const response = await this.post({
      url: BACKEND_KEYS.AUTH.LOGIN,
      data: user
    });
    return response.data;
  }

  async frogotPassword(email: string) {
    const response = await this.post({
      url: BACKEND_KEYS.AUTH.FORGOT_PASSWORD,
      data: { email }
    });
    return response.data;
  }

  async resetPassword(password: string, token: string) {
    const response = await this.post({
      url: `${BACKEND_KEYS.AUTH.FORGOT_PASSWORD}/${token}`,
      data: { password }
    });
    return response.data;
  }
}

export const authService = new AuthService();
