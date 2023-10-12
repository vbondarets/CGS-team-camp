import { useMutation, useQueryClient } from 'react-query';
import { IUser } from '../types/user.types';
import { authService } from '../../services/auth.service';
import { BACKEND_KEYS } from '../consts/app-keys.const';

export const useLogin = () => {
  const client = useQueryClient();

  return useMutation((user: IUser) => authService.login(user), {
    onSuccess: (user) => {
      localStorage.setItem('token', user.token as string);
      // we need to put the token into storage, so I don't understand why you left a comment here
      client.setQueryData([BACKEND_KEYS.AUTH.AUTH], () => user);
    }
  });
};
