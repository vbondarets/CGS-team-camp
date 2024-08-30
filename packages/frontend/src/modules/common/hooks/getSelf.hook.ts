import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../consts/app-keys.const';
import { authService } from '../../services/auth.service';
import { useUserStore } from '../store/user.store';

type TUseGetSelfReturn = {
  isSelfLoading: boolean;
};

export const useGetSelf = (): TUseGetSelfReturn => {
  const { setUser, setIsAuth } = useUserStore();
  const { isFetching: isSelfLoading } = useQuery({
    queryKey: [QUERY_KEYS.SELF],
    queryFn: async () => authService.getSelf(),
    onSuccess: (data) => {
      setUser(data);
      setIsAuth(true);
    },
    onError: () => {
      localStorage.removeItem('token');
      setUser();
      setIsAuth(false);
    },
    refetchOnMount: true,
    retry: false
  });
  return { isSelfLoading };
};
