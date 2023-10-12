import styled from 'styled-components';
import { TodoComponent } from './todo.component';

export const Todo = styled(TodoComponent)`
  display: flex;
  width: 80%;
  height: 80vh;
  margin: auto;
  margin-top: 50px;
  flex-direction: column;
  .todo-heading {
    margin-top: 50px;
  }
  .todo-description {
    margin-top: 24px;
  }
  .todo-options {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-inline: auto;
  }
  .todo-option {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-top: 24px;
  }
  .edit-button {
    margin-top: 200px;
  }
  .back-button {
    margin-top: 24px;
  }
`;
