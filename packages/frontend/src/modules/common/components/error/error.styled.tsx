import styled from 'styled-components';
import { ErrorContainer } from './error.container';
import { COLORS } from '../../../theme';

export const ErrorCont = styled(ErrorContainer)`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 300px;
  height: 200px;
  background-color: ${COLORS.white};
  border: 3px solid ${COLORS.black};
  justify-content: center;
  align-items: center;
  .error-message {
    color: ${COLORS.red};
    width: fit-content;
    text-align: center;
  }
`;
