// TODO: Put a real interfaces here

export interface ITodo {
  id?: string;
  title?: string;
  description?: string;
  active?: boolean;
  private?: boolean;
}
export interface ITodoQuery {
  title: string | undefined;
  isPrivate: string | undefined;
  active: string | undefined;
  page: string | undefined;
}
