import { ITodo } from '../common/types/todo.types';
import { HttpSerivce } from './http.service';

class TodoService extends HttpSerivce {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  async getTodos(queryParams: string) {
    const response = await this.get({
      url: `todos/${queryParams}`
    });
    return response.data;
  }

  async getTodoById(id: string) {
    const response = await this.get({
      url: `todos/${id}`
    });
    return response.data;
  }

  async createTodo(todo: ITodo) {
    const response = await this.post({
      url: 'todos',
      data: todo
    });
    return response.data;
  }

  async updateTodo(todo: ITodo, id: string) {
    const response = await this.patch({
      url: `todos/${id}`,
      data: todo
    });
    return response.data;
  }

  async deleteTodoById(id: string) {
    const response = await this.delete({
      url: `todos/${id}`
    });
    return response.data;
  }
}

export const todoService = new TodoService();
