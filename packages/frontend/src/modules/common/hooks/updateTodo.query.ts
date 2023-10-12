import { useMutation, useQueryClient } from 'react-query';
import { todoService } from '../../services/todo.service';
import { BACKEND_KEYS } from '../consts/app-keys.const';
import { ITodo } from '../types/todo.types';

export const useUpdateTodo = () => {
  const client = useQueryClient();

  return useMutation((todo: ITodo) => todoService.updateTodo(todo, todo.id as string), {
    onSuccess: () => {
      client.invalidateQueries([BACKEND_KEYS.TODO]);
    }
  });
};
