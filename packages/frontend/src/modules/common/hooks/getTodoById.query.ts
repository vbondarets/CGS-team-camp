import { useQuery } from 'react-query';
import { todoService } from '../../services/todo.service';
import { BACKEND_KEYS } from '../consts/app-keys.const';

export const useGetTodoByIdQuery = (id: string | undefined) =>
  useQuery([BACKEND_KEYS.TODO, id], () => todoService.getTodoById(id || ''), {
    refetchOnMount: true
  });
