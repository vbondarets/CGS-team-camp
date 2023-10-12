import { useQuery } from 'react-query';
import { BACKEND_KEYS } from '../consts/app-keys.const';
import { todoService } from '../../services/todo.service';

export const useGetTodosQuery = (queryParams: string) =>
  useQuery([BACKEND_KEYS.TODO], () => todoService.getTodos(queryParams), {
    refetchOnMount: true,
    retry: false
  });
