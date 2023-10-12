import styled from 'styled-components';
import { ModalComponent } from './modal.component';
import { COLORS } from '../../../theme';

export const Modal = styled(ModalComponent)`
  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-inline: 24px;
    padding-block: 12px;
    background-color: ${COLORS.white};
    border: 3px solid ${COLORS.black};
  }
`;
