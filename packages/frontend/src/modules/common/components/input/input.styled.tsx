import styled from 'styled-components';
import { InputComponent } from './input.component';
import { COLORS, FONTS } from '../../../theme';

export const Input = styled(InputComponent)`
  display: flex;
  justify-content: left;
  flex-direction: column;
  .input-label {
    margin-top: 8px;
    color: ${COLORS.black};
    display: flex;
    font-weight: ${FONTS.WEIGHTS.semiBold};
    flex-direction: column;
    justify-content: start;
    width: fit-content;
    margin-bottom: 4px;
  }
  .input {
    border: 2px solid ${COLORS.black};
    font-weight: ${FONTS.WEIGHTS.normal};
  }
  .checkbox {
    width: 24px;
    height: 24px;
    outline: none;
  }
`;
