import { Response, Request, NextFunction } from 'express';
import TodoService from '../services/todo.service';
import ApiError from '../helpers/error/ApiError';
import { User } from '../entities/User';
import { getQueries } from '../utils/getQueries/getQueries';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: Request, res: Response, next: NextFunction) {
    const searchQuery = getQueries(req.query);
    const { todos, count } = await this.todoService.findAll(req.user as User, searchQuery);
    if (todos.length === 0) {
      return next(ApiError.notFound('Todos not found'));
    }
    const pages = Math.ceil(count / 10);
    return res.send({ todos, pages });
  }

  async getOneTodo(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const todo = await this.todoService.findOne(id, req.user as User);
    if (!todo) {
      return next(ApiError.notFound('Todo not found'));
    }
    return res.send(todo);
  }

  async createTodo(req: Request, res: Response, next: NextFunction) {
    const todo = await this.todoService.create(req.body, req.user as User);
    if (!todo) {
      return next(ApiError.internal());
    }
    return res.send(todo);
  }

  async updateTodo(req: Request, res: Response) {
    const { id } = req.params;
    return res.send(await this.todoService.updateOne(id, req.body, req.user as User));
  }

  async deleteTodo(req: Request, res: Response) {
    const { id } = req.params;
    return res.send({ message: await this.todoService.deleteOne(id) });
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
