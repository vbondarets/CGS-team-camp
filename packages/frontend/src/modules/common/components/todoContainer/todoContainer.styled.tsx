import styled from 'styled-components';
import { TodoContainerComponent } from './todoContainer.component';
import { COLORS } from '../../../theme';

export const TodoContainer = styled(TodoContainerComponent)`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  .todo-table {
    max-height: 65vh;
    margin-top: 24px;
    overflow-y: scroll;
    border: 3px solid ${COLORS.black};
    width: 90%;
    padding: 0px;
    margin-inline: auto;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .todo-pagination {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .todo-list {
    width: 90%;
    margin-inline: auto;
    @media screen and (min-width: 426px) {
      display: none;
    }
  }
  .todo-slider {
    display: none;
    @media screen and (min-width: 426px) and (max-width: 768px) {
      display: flex;
      width: 100%;
      height: 70vh;
      margin-top: 24px;
    }
  }
  .Add-todo {
    margin-top: 24px;
    margin-left: 5%;
  }
`;
