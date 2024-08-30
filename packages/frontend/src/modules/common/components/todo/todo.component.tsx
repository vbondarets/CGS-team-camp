import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IBasicProps } from '../../types/props.types';
import { Slider } from '../slider';
import { Button } from '../button';
import { useAuth, useTodo } from '../../hooks';
import { Modal } from '../modal';
import { TodoForm } from '../todoForm';
import { Loader } from '../loader';
import { ErrorCont } from '../error';

interface IProps extends IBasicProps {}

export const TodoComponent = ({ className }: IProps) => {
  const navigate = useNavigate();
  const { setTodoId, todo, todoError, isGetTodoError, isTodoLoading } = useTodo();
  const { id } = useParams();
  const { handleUpdateTodo } = useTodo();
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    setTodoId(Number.isInteger(Number(id)) ? Number(id) : undefined);
    return () => {
      setTodoId();
    };
  }, [id]);
  return (
    <div className={className}>
      {isGetTodoError && (
        <ErrorCont message={todoError instanceof Error ? todoError.message : 'Unknown Error'} />
      )}
      {isTodoLoading && <Loader />}
      {!isGetTodoError && !isTodoLoading && todo && (
        <>
          <h1 className="todo-title">{todo.title}</h1>
          <h4 className="todo-heading">Description</h4>
          <p className="todo-description">{todo.description}</p>
          <div className="todo-options">
            <div className="todo-option">
              <h4 className="todo-option-name">Complited</h4>
              <div className="todo-option-slider">
                <Slider
                  status={!todo.active as boolean}
                  todo={todo}
                  disabled={user?.id !== todo.user?.id}
                  field="active"
                  callback={handleUpdateTodo}
                />
              </div>
            </div>
            <div className="todo-option">
              <h4 className="todo-option-name">Private</h4>
              <div className="todo-option-slider">
                <Slider
                  status={todo.private as boolean}
                  todo={todo}
                  disabled={user?.id !== todo.user?.id}
                  field="private"
                  callback={handleUpdateTodo}
                />
              </div>
            </div>
          </div>
          <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
            <TodoForm
              action="update"
              todo={todo}
              callback={handleUpdateTodo}
              setModalOpen={setModalOpen}
            />
          </Modal>
          {user?.id === todo.user?.id && (
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
            <Button width="20vw" callback={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
