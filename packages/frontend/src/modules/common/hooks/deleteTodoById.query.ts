import { useQueryClient, useMutation } from 'react-query';
import { todoService } from '../../services/todo.service';
import { BACKEND_KEYS } from '../consts/app-keys.const';

export const useDeleteTodoQuery = () => {
  const client = useQueryClient();
  return useMutation((id: string) => todoService.deleteTodoById(id), {
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [BACKEND_KEYS.TODO] });
    }
  });
};
