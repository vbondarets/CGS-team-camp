import styled from 'styled-components';
import { TodoFormComponent } from './todoForm.component';
import { COLORS, FONTS } from '../../../theme';

export const TodoForm = styled(TodoFormComponent)`
  .form-error {
    font-weight: ${FONTS.WEIGHTS.semiBold};
    font-size: ${FONTS.SIZES.m};
    color: ${COLORS.red};
  }
`;
