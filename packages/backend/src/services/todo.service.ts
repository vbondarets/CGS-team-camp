/* eslint-disable object-shorthand */
import { ITodo, ITodoQuery } from '../types/todos.type';
import { Todo } from '../entities/Todo';
import { User } from '../entities/User';
import ApiError from '../helpers/error/ApiError';
import { myDataSource } from '../config/database';

export default class TodoService {
  async findAll(user: User, query: ITodoQuery) {
    const skip = query.page ? (parseInt(query.page as string, 10) - 1) * 10 : 0;
    const take = 10;

    if (!query.active && !query.isPrivate && !query.title) {
      const todos = await Todo.find({
        relations: {
          user: true
        },
        where: [
          {
            private: false
          },
          {
            private: true,
            user: { id: user.id }
          }
        ],
        order: { id: 'DESC' },
        take: take,
        skip: skip
      });
      const count = await Todo.count({
        where: [
          {
            private: false
          },
          {
            private: true,
            user: { id: user.id }
          }
        ]
      });
      return { todos, count };
    }
    const todoRepo = myDataSource.getRepository(Todo);
    let todoQuery = todoRepo.createQueryBuilder('todo').leftJoinAndSelect('todo.user', 'users');
    if (query.title) {
      todoQuery = todoQuery.andWhere(
        'todo.title LIKE :title AND ((todo.private = :privateTrue AND todo.user.id = :id) OR (todo.private = :privateFalse))',
        { title: `%${query.title}%`, privateTrue: true, privateFalse: false, id: user.id }
      );
    }
    if (query.isPrivate && query.isPrivate === 'true') {
      todoQuery = todoQuery
        .andWhere('todo.private = :private', { private: true })
        .andWhere('todo.user.id = :id', { id: user.id });
    }
    if (query.isPrivate && query.isPrivate === 'false') {
      todoQuery = todoQuery.andWhere('todo.private = :private', { private: false });
    }
    if (query.active === 'false') {
      todoQuery = todoQuery.andWhere('todo.active = :active', { active: false });
    }
    const todos = await todoQuery.orderBy({ 'todo.id': 'DESC' }).take(take).skip(skip).getMany();
    const count = await todoQuery.getCount();
    return { todos, count };
  }

  async findOne(id: string, user: User) {
    const todo = Todo.findOne({
      where: [
        {
          id,
          private: false
        },
        {
          id,
          private: true,
          user: { id: user.id }
        }
      ],
      relations: {
        user: true
      }
    });
    return todo;
  }

  async create(params: ITodo, user: User) {
    const todo = new Todo();
    todo.title = params.title ? params.title : '';
    todo.description = params.description ? params.description : '';
    todo.active = params.active ? params.active : true;
    todo.private = params.private ? params.private : false;
    todo.user = user;
    await todo.save();
    return { todo };
  }

  async updateOne(id: string, params: ITodo, user: User) {
    const todo = await Todo.findOne({
      relations: {
        user: true
      },
      where: {
        id
      }
    });
    if (todo) {
      if (todo.user.id !== user.id) {
        throw ApiError.forbidden("It's not your todo");
      }
      todo.title = params.title ? params.title : todo.title;
      todo.description = params.description ? params.description : todo.description;
      todo.active = params.active === false || params.active === true ? params.active : todo.active;
      todo.private =
        params.private === false || params.private === true ? params.private : todo.private;
      await todo.save();
    }
    return todo;
  }

  async deleteOne(id: string) {
    const todo = await Todo.findOneBy({ id });
    await todo?.remove();
    return 'deleted';
  }
}
