/* eslint-disable arrow-body-style */
import { useQuery } from 'react-query';
import jwt from 'jwt-decode';
import { BACKEND_KEYS } from '../consts/app-keys.const';
import { IUser } from '../types/user.types';

export const useGetUser = () =>
  useQuery(
    [BACKEND_KEYS.AUTH.AUTH],
    () => {
      const token = localStorage.getItem('token');
      const decode = jwt(token as string);
      return { token, user: decode as IUser };
    },
    {
      refetchOnMount: true
    }
  );
