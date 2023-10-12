import styled from 'styled-components';
import { authComponent } from './auth.component';

export const Auth = styled(authComponent)`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  .auth-main {
    display: flex;
    flex-direction: column;
    height: 30%;
    align-items: center;
    .auth-login-button {
      margin-top: 20px;
    }
    .auth-register-button {
      margin-top: 20px;
    }
  }
`;
