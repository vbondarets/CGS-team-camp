import styled from 'styled-components';
import { LoginComponent } from './login.component';
import { COLORS } from '../../../theme';

export const LoginForm = styled(LoginComponent)`
  .login-form-buttons {
    width: 100%;
    display: flex;
    margin-top: 12px;
    justify-content: space-between;
  }
  .error-message {
    position: relative;
    max-width: 203px;
    text-align: center;
    color: ${COLORS.red};
    margin-top: 24px;
  }
`;
