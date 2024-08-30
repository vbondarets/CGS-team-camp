import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IBasicProps } from '../../types/props.types';
import { Button } from '../button';
import { Slider } from '../slider/slider.styled';
import { useAuth } from '../../hooks';
import { ROUTER_KEYS } from '../../consts/app-keys.const';
import { ITodo } from '../../types/todo.types';

interface IProps extends IBasicProps {
  todos: Array<ITodo>;
  handleUpdateTodo: (data: ITodo) => void;
  handleDeleteTodo: (id: number | string) => void;
}

export const TodoTableComponent = ({
  className,
  todos,
  handleUpdateTodo,
  handleDeleteTodo
}: IProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
                      navigate(`${ROUTER_KEYS.TODO_PAGE}${todo.id}`);
                    }}
                  >
                    View
                  </Button>
                  {user?.id === todo.user?.id && (
                    <>
                      <Button
                        callback={() => {
                          handleDeleteTodo(todo.id as string);
                        }}
                      >
                        Delete
                      </Button>
                      <Slider
                        status={!todo.active}
                        todo={todo}
                        field="active"
                        callback={handleUpdateTodo}
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
