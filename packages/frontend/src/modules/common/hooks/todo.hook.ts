import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../consts/app-keys.const';
import { useTodoStore } from '../store/todo.store';
import { todoService } from '../../services/todo.service';
import { ITodo } from '../types/todo.types';
import { EFilter } from '../types/filter.types';
import { setQueryUtil } from '../utils/setQueryUtil/setQueryUtil';

type TUseTodoReturn = {
  isTodosLoaging: boolean;
  todos: ITodo[];
  page: number;
  pagesCount: number;
  setPage: (value: number) => void;
  setCurrentFilter: (value: EFilter) => void;
  setSearchValue: (value: string) => void;
  currentFilter: EFilter;
  searchValue: string;
  handleCreateTodo: (data: ITodo) => void;
  handleUpdateTodo: (data: ITodo) => void;
  todo?: ITodo;
  isGetTodoError: boolean;
  isTodoLoading: boolean;
  todoError: unknown;
  setTodoId: (value?: number | undefined) => void;
  handleDeleteTodo: (id: number | string) => void;
};

export const useTodo = (): TUseTodoReturn => {
  const {
    setTodos,
    todos,
    page,
    pagesCount,
    setPage,
    setPagesCount,
    currentFilter,
    searchValue,
    setCurrentFilter,
    setSearchValue,
    todoId,
    setTodoId,
    setTodo,
    todo
  } = useTodoStore();

  const client = useQueryClient();

  const { isFetching: isTodosLoaging } = useQuery({
    queryKey: [QUERY_KEYS.TODOS, currentFilter, searchValue, page],
    queryFn: async () => todoService.getTodos(setQueryUtil(currentFilter, searchValue, page)),
    onSuccess: (data) => {
      setTodos(data.todos);
      setPagesCount(data.pages);
    },
    onError: () => {
      setTodos([]);
      setPagesCount(1);
    },
    refetchOnMount: true,
    retry: false
  });

  const {
    isError: isGetTodoError,
    isLoading: isTodoLoading,
    error: todoError
  } = useQuery({
    queryKey: [QUERY_KEYS.TODO, todoId],
    queryFn: async () => todoService.getTodoById(todoId || ''),
    onSuccess: (data) => {
      setTodo(data);
    },
    onError: () => {
      setTodo();
    },
    refetchOnMount: true
  });

  const { mutate: createMutation } = useMutation((data: ITodo) => todoService.createTodo(data), {
    onSuccess: () => {
      client.invalidateQueries([QUERY_KEYS.TODOS]);
    }
  });

  const { mutate: updateMutation } = useMutation(
    (data: ITodo) => todoService.updateTodo(data, data.id as string),
    {
      onSuccess: () => {
        client.invalidateQueries([QUERY_KEYS.TODO]);
        client.invalidateQueries([QUERY_KEYS.TODOS]);
      }
    }
  );
  const { mutate: deleteMutation } = useMutation(
    (id: number | string) => todoService.deleteTodoById(id),
    {
      onSuccess: () => {
        client.invalidateQueries([QUERY_KEYS.TODOS]);
      }
    }
  );

  const handleCreateTodo = (data: ITodo) => {
    createMutation(data);
  };
  const handleUpdateTodo = (data: ITodo) => {
    updateMutation(data);
  };
  const handleDeleteTodo = (id: number | string) => {
    deleteMutation(id);
  };

  return {
    isTodosLoaging,
    todos,
    page,
    pagesCount,
    setPage,
    setCurrentFilter,
    setSearchValue,
    currentFilter,
    searchValue,
    handleCreateTodo,
    handleUpdateTodo,
    todo,
    isGetTodoError,
    isTodoLoading,
    todoError,
    setTodoId,
    handleDeleteTodo
  };
};
