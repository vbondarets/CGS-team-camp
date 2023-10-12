export interface IUser {
  id?: string;
  email: string;
  password: string;
  active?: boolean;
  confirmed?: boolean;
}
