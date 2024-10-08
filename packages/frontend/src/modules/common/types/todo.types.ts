import { IUser } from './user.types';

export interface ITodo {
  id?: string;
  title: string;
  description: string;
  active: boolean;
  private: boolean;
  user?: IUser;
}
export interface ITodoRes {
  todos: ITodo[];
  pages: number;
}
