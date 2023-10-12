import styled from 'styled-components';
import { COLORS } from '../../../theme';
import { ButtonComponent } from './button.component';

export const Button = styled(ButtonComponent)`
  color: ${COLORS.black};
  background-color: ${COLORS.white};
  border: 2px solid ${COLORS.black};
  box-shadow: 4px 4px ${COLORS.black};
  /* border-width: 2px 4px 4px 2px; */
  border-radius: 0px;
  transition: all 0.2s;
  height: 30px;
  cursor: pointer;
  :hover {
    background-color: ${COLORS.primary};
  }
  background-color: ${(props) => (props.active ? COLORS.primary : COLORS.white)};
  width: ${(props) => (props.width ? props.width : 'fit-content')};
`;
export const PrimaryButton = styled(Button)`
  background-color: ${COLORS.primary};
  :hover {
    background-color: ${COLORS.white};
  }
`;
export const TodoListButton = styled(Button)`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
