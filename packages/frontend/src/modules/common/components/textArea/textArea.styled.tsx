import styled from 'styled-components';
import { textAreaComponent } from './textArea.component';
import { COLORS, FONTS } from '../../../theme';

export const TextArea = styled(textAreaComponent)`
  display: flex;
  justify-content: left;
  flex-direction: column;
  .text-area-label {
    margin-top: 8px;
    color: ${COLORS.black};
    display: flex;
    font-weight: ${FONTS.WEIGHTS.semiBold};
    flex-direction: column;
    justify-content: start;
    width: fit-content;
    margin-bottom: 4px;
  }
  .text-area {
    border: 2px solid ${COLORS.black};
    font-weight: ${FONTS.WEIGHTS.normal};
    resize: none;
  }
`;
