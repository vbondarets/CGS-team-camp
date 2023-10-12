import { useMutation } from 'react-query';
import { authService } from '../../services/auth.service';

export const useResetPassword = () =>
  useMutation(({ password, token }: { password: string; token: string }) =>
    authService.resetPassword(password, token)
  );
