import { useMutation } from 'react-query';
import { authService } from '../../services/auth.service';

export const useForgotPassword = () =>
  useMutation((email: string) => authService.frogotPassword(email));
