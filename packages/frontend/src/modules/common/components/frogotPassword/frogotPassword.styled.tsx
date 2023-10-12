import styled from 'styled-components';
import { ForgotPasswordComponent } from './forgotPassword.component';

export const ForgotPassword = styled(ForgotPasswordComponent)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  .form-buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
