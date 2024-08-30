import { useMutation, useQueryClient } from 'react-query';
import { useUserStore } from '../store/user.store';
import { QUERY_KEYS } from '../consts/app-keys.const';
import { authService } from '../../services/auth.service';
import { IUser } from '../types/user.types';

type TUseGetSelfReturn = {
  isAuth: boolean;
  handleLogin: (user: IUser) => void;
  isLoadingLogin: boolean;
  errorLogin: unknown;
  handleRegister: (user: IUser) => void;
  isLoadingRegister: boolean;
  errorRegister: unknown;
  user?: IUser;
  handleLogOut: () => void;
  isRegisterSuccess: boolean;
};

export const useAuth = (): TUseGetSelfReturn => {
  const { isAuth, user } = useUserStore();
  const client = useQueryClient();

  const {
    mutate: loginMutation,
    error: errorLogin,
    isLoading: isLoadingLogin
  } = useMutation((data: IUser) => authService.login(data), {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token as string);
      client.invalidateQueries([QUERY_KEYS.SELF]);
    }
  });
  const {
    mutate: registerMutation,
    error: errorRegister,
    isLoading: isLoadingRegister,
    isSuccess: isRegisterSuccess
  } = useMutation((data: IUser) => authService.register(data), {
    onSuccess: () => {}
  });

  const handleLogOut = () => {
    localStorage.removeItem('token');
    client.invalidateQueries([QUERY_KEYS.SELF]);
  };
  const handleLogin = (data: IUser) => {
    loginMutation(data);
  };
  const handleRegister = (data: IUser) => {
    registerMutation(data);
  };

  return {
    isAuth,
    handleLogin,
    errorLogin,
    isLoadingLogin,
    user,
    handleLogOut,
    errorRegister,
    isLoadingRegister,
    handleRegister,
    isRegisterSuccess
  };
};
