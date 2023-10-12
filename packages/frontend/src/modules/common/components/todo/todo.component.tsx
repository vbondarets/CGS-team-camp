import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IBasicProps } from '../../types/props.types';
import { Slider } from '../slider';
import { Button } from '../button';
import { useGetTodoByIdQuery, useUpdateTodo } from '../../hooks';
import { ITodo } from '../../types/todo.types';
import { Modal } from '../modal';
import { TodoForm } from '../todoForm';
import { Loader } from '../loader';
import { ErrorCont } from '../error';
import { useGetUser } from '../../hooks/getUser.query';

interface IProps extends IBasicProps {}

export const TodoComponent = ({ className }: IProps) => {
  const history = useHistory();
  const { mutate: updateTodo } = useUpdateTodo();
  const searchParams: { id: string } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isError, isLoading, error } = useGetTodoByIdQuery(searchParams.id);
  const userData = useGetUser();
  const [todos, setTodos] = useState<ITodo>({
    title: '',
    description: '',
    active: false,
    private: true,
    user: undefined
  });
  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);
  return (
    <div className={className}>
      {isError && <ErrorCont message={error instanceof Error ? error.message : 'Unknown Error'} />}
      {isLoading && <Loader />}
      {!isError && !isLoading && (
        <>
          <h1 className="todo-title">{todos.title}</h1>
          <h4 className="todo-heading">Description</h4>
          <p className="todo-description">{todos.description}</p>
          <div className="todo-options">
            <div className="todo-option">
              <h4 className="todo-option-name">Complited</h4>
              <div className="todo-option-slider">
                <Slider
                  status={!todos.active as boolean}
                  todo={{
                    id: todos.id as string,
                    title: todos.title,
                    description: todos.description,
                    active: todos.active,
                    private: todos.private
                  }}
                  disabled={userData.data?.user.id !== todos.user?.id}
                  field="active"
                  callback={updateTodo}
                />
              </div>
            </div>
            <div className="todo-option">
              <h4 className="todo-option-name">Private</h4>
              <div className="todo-option-slider">
                <Slider
                  status={todos.private as boolean}
                  todo={{
                    id: todos.id as string,
                    title: todos.title,
                    description: todos.description,
                    active: todos.active,
                    private: todos.private
                  }}
                  disabled={userData.data?.user.id !== todos.user?.id}
                  field="private"
                  callback={updateTodo}
                />
              </div>
            </div>
          </div>
          <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
            <TodoForm
              action="update"
              todo={todos}
              callback={updateTodo}
              setModalOpen={setModalOpen}
            />
          </Modal>
          {userData.data?.user.id === todos.user?.id && (
            <div className="edit-button">
              <Button
                width="100px"
                callback={() => {
                  setModalOpen(true);
                }}
              >
                Edit
              </Button>
            </div>
          )}
          <div className="back-button">
            <Button width="20vw" callback={() => history.goBack()}>
              Back
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
