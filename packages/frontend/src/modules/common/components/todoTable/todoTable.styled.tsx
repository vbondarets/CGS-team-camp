import styled from 'styled-components';
import { TodoTableComponent } from './todoTable.component';
import { COLORS } from '../../../theme';

export const TodoTable = styled(TodoTableComponent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .table {
    display: none;
    border-collapse: collapse;
    width: 100%;
    padding: 0px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    @media screen and (min-width: 768px) {
      display: table;
    }
    tr {
      height: 24px;
    }
    tr:nth-child(even) {
      background-color: #edeffa;
    }
    td,
    th {
      border: 2px solid ${COLORS.black};
      padding-inline: 4px;
      padding-block: 2px;
      height: 42px;
    }
    th {
      background-color: ${COLORS.cadetGrey};
    }
    .table-todo-title {
      width: 20%;
      overflow: hidden;
    }
    .table-todo-description {
      width: 55%;
      overflow: hidden;
    }
    .table-todo-actions {
      width: 25%;
      .table-todo-actions-container {
        display: flex;
        width: 80%;
        min-width: 190px;
        margin-inline: auto;
        justify-content: space-between;
      }
    }
    tr:hover {
      background-color: ${COLORS.primary};
    }
  }
`;
