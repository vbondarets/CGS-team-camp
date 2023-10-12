import { useMutation, useQueryClient } from 'react-query';

export const useLogOut = () => {
  const client = useQueryClient();

  return useMutation(async () => localStorage.removeItem('token'), {
    onSuccess: () => {
      client.removeQueries();
    }
  });
};
