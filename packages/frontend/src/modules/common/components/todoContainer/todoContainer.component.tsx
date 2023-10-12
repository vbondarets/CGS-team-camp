import React, { useEffect, useState } from 'react';
import { IBasicProps } from '../../types/props.types';
import { Filters } from '../filters';
import { TodoTable } from '../todoTable';
import { TodoList } from '../todoList';
import { TodoSlider } from '../todoSlider';
import { useCreateTodo, useGetTodosQuery } from '../../hooks';
import { Button } from '../button';
import { Modal } from '../modal';
import { TodoForm } from '../todoForm';
import { ErrorCont } from '../error';
import { Loader } from '../loader';
import { Pagination } from '../pagination';

interface IProps extends IBasicProps {}

export const TodoContainerComponent = ({ className }: IProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [queryParams, setQueryParams] = useState('');
  const [page, setPage] = useState(1);
  const { data, isError, isLoading, error, refetch } = useGetTodosQuery(queryParams);
  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pagesCount, setPagesCount] = useState(1);
  const { mutate: createTodo } = useCreateTodo();

  useEffect(() => {
    refetch();
  }, [queryParams]);

  useEffect(() => {
    if (data) {
      setTodos(data.todos);
    }
    if (data) {
      setPagesCount(data.pages);
    }
  }, [data]);

  return (
    <div className={className}>
      <Filters setQueryParams={setQueryParams} page={page} />
      {isError && <ErrorCont message={error instanceof Error ? error.message : 'Unknown Error'} />}
      {isLoading && <Loader />}
      {!isError && !isLoading && (
        <>
          <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
            <TodoForm action="create" callback={createTodo} setModalOpen={setModalOpen} />
          </Modal>
          <Button
            className="Add-todo"
            callback={() => {
              setModalOpen(true);
            }}
          >
            Add new
          </Button>
          <div className="todo-table">
            <TodoTable todos={todos} />
          </div>
          <Pagination className="todo-pagination" pages={pagesCount} setPage={setPage} />
          <div className="todo-slider">
            <TodoSlider todos={todos} page={page} setPage={setPage} pagesCount={pagesCount} />
          </div>
          <div className="todo-list">
            <TodoList todos={todos} page={page} setPage={setPage} pagesCount={pagesCount} />
          </div>
        </>
      )}
    </div>
  );
};
