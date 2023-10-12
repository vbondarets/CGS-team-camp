import styled from 'styled-components';
import { RegisterComponent } from './register.component';
import { COLORS } from '../../../theme';

export const RegisterForm = styled(RegisterComponent)`
  .register-form-buttons {
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
  .error-message.success {
    color: ${COLORS.palmLeaf};
  }
`;
