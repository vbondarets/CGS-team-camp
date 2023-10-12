import { useMutation, useQueryClient } from 'react-query';
import { todoService } from '../../services/todo.service';
import { BACKEND_KEYS } from '../consts/app-keys.const';
import { ITodo } from '../types/todo.types';

export const useCreateTodo = () => {
  const client = useQueryClient();

  return useMutation((todo: ITodo) => todoService.createTodo(todo), {
    onSuccess: () => {
      client.invalidateQueries([BACKEND_KEYS.TODO]);
    }
  });
};
