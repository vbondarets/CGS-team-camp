import React, { useState } from 'react';
import { IBasicProps } from '../../types/props.types';
import { Filters } from '../filters';
import { TodoTable } from '../todoTable';
import { TodoList } from '../todoList';
import { TodoSlider } from '../todoSlider';
import { useTodo } from '../../hooks';
import { Button } from '../button';
import { Modal } from '../modal';
import { TodoForm } from '../todoForm';
import { Loader } from '../loader';
import { Pagination } from '../pagination';

interface IProps extends IBasicProps {}

export const TodoContainerComponent = ({ className }: IProps) => {
  const {
    todos,
    isTodosLoaging,
    page,
    pagesCount,
    setPage,
    setCurrentFilter,
    currentFilter,
    setSearchValue,
    searchValue,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo
  } = useTodo();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className={className}>
      <Filters
        setCurrentFilter={setCurrentFilter}
        currentFilter={currentFilter}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      {/* {isError && <ErrorCont message={error instanceof Error ? error.message : 'Unknown Error'} />} */}
      {isTodosLoaging && <Loader />}
      {!isTodosLoaging && (
        <>
          <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
            <TodoForm action="create" callback={handleCreateTodo} setModalOpen={setModalOpen} />
          </Modal>
          <Button
            className="Add-todo"
            callback={() => {
              setModalOpen(true);
            }}
          >
            Add new
          </Button>
          {todos.length > 0 && (
            <>
              <div className="todo-table">
                <TodoTable
                  todos={todos}
                  handleUpdateTodo={handleUpdateTodo}
                  handleDeleteTodo={handleDeleteTodo}
                />
              </div>
              <Pagination
                className="todo-pagination"
                pages={pagesCount}
                setPage={setPage}
                currPage={page}
              />
              <div className="todo-slider">
                <TodoSlider
                  todos={todos}
                  page={page}
                  setPage={setPage}
                  pagesCount={pagesCount}
                  handleUpdateTodo={handleUpdateTodo}
                  handleDeleteTodo={handleDeleteTodo}
                />
              </div>
              <div className="todo-list">
                <TodoList
                  todos={todos}
                  page={page}
                  setPage={setPage}
                  pagesCount={pagesCount}
                  handleUpdateTodo={handleUpdateTodo}
                  handleDeleteTodo={handleDeleteTodo}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
