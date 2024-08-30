/* eslint-disable import/no-extraneous-dependencies */
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { ITodo } from '../types/todo.types';
import { EFilter } from '../types/filter.types';

interface ITodoState {
  todo?: ITodo;
  todos: ITodo[];
  setTodo: (value?: ITodo) => void;
  setTodos: (value: ITodo[]) => void;
  page: number;
  setPage: (value: number) => void;
  pagesCount: number;
  setPagesCount: (value: number) => void;
  currentFilter: EFilter;
  setCurrentFilter: (value: EFilter) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  todoId?: number;
  setTodoId: (value?: number) => void;
}

export const useTodoStore = createWithEqualityFn<ITodoState>(
  (set) => ({
    todos: [],
    page: 1,
    pagesCount: 1,
    currentFilter: EFilter.All,
    searchValue: '',
    setTodo: (value?: ITodo): void => {
      set(() => ({
        todo: value
      }));
    },
    setTodos: (value: ITodo[]): void => {
      set(() => ({
        todos: value
      }));
    },
    setPage: (value: number): void => {
      set(() => ({
        page: value
      }));
    },
    setPagesCount: (value: number): void => {
      set(() => ({
        pagesCount: value
      }));
    },
    setCurrentFilter: (value: EFilter): void => {
      set(() => ({
        currentFilter: value
      }));
    },
    setSearchValue: (value: string): void => {
      set(() => ({
        searchValue: value
      }));
    },
    setTodoId: (value?: number): void => {
      set(() => ({
        todoId: value
      }));
    }
  }),
  shallow
);
