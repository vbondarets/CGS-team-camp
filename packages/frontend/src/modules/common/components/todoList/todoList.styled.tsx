import styled from 'styled-components';
import { TodoListComponent } from './todoList.component';
import { COLORS, FONTS } from '../../../theme';

export const TodoList = styled(TodoListComponent)`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  overflow-y: hidden;
  height: 75vh;
  .todo-list-item {
    margin-top: 24px;
    border: 3px solid ${COLORS.black};
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .todo-list-description {
    margin-top: 8px;
    font-weight: ${FONTS.WEIGHTS.normal};
    font-size: ${FONTS.SIZES.m};
  }
  .todo-list-buttons {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    width: 60%;
    justify-content: space-between;
    min-width: 190px;
    margin-inline: auto;
    position: relative;
  }
  .load-more {
    margin-top: 24px;
    text-align: center;
  }
  .swiper {
    left: 0;
    width: 100%;
    height: 300px;
    overflow-y: visible;
  }
  .swiper-slide {
    max-height: 300px;
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
