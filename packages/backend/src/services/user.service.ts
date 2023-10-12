import ApiError from '../helpers/error/ApiError';
import { User } from '../entities/User';
import { IUser } from '../types/user.type';

export default class UserService {
  async createUser(params: IUser) {
    const user = new User();
    user.email = params.email;
    user.password = params.password;
    await user.save();
    return user;
  }

  async getUserById(id: string) {
    const user = await User.findOneBy({ id });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await User.findOneBy({ email });
    return user;
  }

  async confirm(id: string) {
    const user = await User.findOneBy({ id });
    if (user) {
      user.confirmed = true;
      await user.save();
    }
    return user;
  }

  async login(email: string) {
    const user = await User.findOneBy({ email });
    if (!user?.confirmed) {
      throw ApiError.notFound('User not found');
    }
    return user;
  }

  async updatePassword(id: string, password: string) {
    const user = await User.findOneBy({ id });
    if (user) {
      user.password = password;
      user.save();
    }
    return user;
  }
}
