import { useMutation, useQueryClient } from 'react-query';
import { IUser } from '../types/user.types';
import { authService } from '../../services/auth.service';
import { BACKEND_KEYS } from '../consts/app-keys.const';

export const useRegister = () => {
  const client = useQueryClient();

  return useMutation((user: IUser) => authService.register(user), {
    onSuccess: () => {
      client.invalidateQueries([BACKEND_KEYS.AUTH.AUTH]);
    }
  });
};
