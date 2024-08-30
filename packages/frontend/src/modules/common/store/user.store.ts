/* eslint-disable import/no-extraneous-dependencies */
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { IUser } from '../types/user.types';

interface IUserState {
  user?: IUser;
  setUser: (value?: IUser) => void;
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export const useUserStore = createWithEqualityFn<IUserState>(
  (set) => ({
    isAuth: false,
    setUser: (value?: IUser): void => {
      set(() => ({
        user: value
      }));
    },
    setIsAuth: (value: boolean): void => {
      set(() => ({
        isAuth: value
      }));
    }
  }),
  shallow
);
