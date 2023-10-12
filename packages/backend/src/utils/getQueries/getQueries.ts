import { ITodoQuery } from '../../types/todos.type';

export const getQueries = (query: Record<string, any>): ITodoQuery => {
  const { active, isPrivate, title, page } = query;
  return {
    active: active ? active.toString() : '',
    isPrivate: isPrivate ? isPrivate.toString() : '',
    title: title ? title.toString() : '',
    page: page || ''
  };
};
