import React from 'react';
import { useHistory } from 'react-router-dom';
import { IBasicProps } from '../../types/props.types';
import { Button } from '../button';
import { Slider } from '../slider/slider.styled';
import { useDeleteTodoQuery } from '../../hooks/deleteTodoById.query';
import { useUpdateTodo } from '../../hooks';
import { ROUTER_KEYS } from '../../consts/app-keys.const';
import { useGetUser } from '../../hooks/getUser.query';
import { ITodo } from '../../types/todo.types';

interface IProps extends IBasicProps {
  todos: Array<ITodo>;
}

export const TodoTableComponent = ({ className, todos }: IProps) => {
  const history = useHistory();
  const { mutate: deleteTodo } = useDeleteTodoQuery();
  const { mutate: updateTodo } = useUpdateTodo();
  const { data } = useGetUser();

  return (
    <div className={className}>
      <table className="table">
        <tbody>
          <tr>
            <th>Todo Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="table-todo-title">{todo.title}</td>
              <td className="table-todo-description">
                {todo.description.length > 300
                  ? `${todo.description.slice(0, 110)}...`
                  : todo.description}
              </td>
              <td className="table-todo-actions">
                <div className="table-todo-actions-container">
                  <Button
                    callback={() => {
                      history.push(`${ROUTER_KEYS.TODO_PAGE}${todo.id}`);
                    }}
                  >
                    View
                  </Button>
                  {data?.user.id === todo.user?.id && (
                    <>
                      <Button
                        callback={() => {
                          deleteTodo(todo.id as string);
                        }}
                      >
                        Delete
                      </Button>
                      <Slider
                        status={!todo.active}
                        todo={todo}
                        field="active"
                        callback={updateTodo}
                      />
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
