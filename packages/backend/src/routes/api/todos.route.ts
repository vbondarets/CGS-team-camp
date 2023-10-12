import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { wrapper } from '../../middlewares/ctrlWrapper';
import validation from '../../middlewares/validation';
import TodoSchema from '../../helpers/joiSchemas/todo.schema';
import isExist from '../../middlewares/isExist';
import { Todo } from '../../entities/Todo';
import { isAuth } from '../../middlewares/isAuth';

const todosRouter: Router = Router();

todosRouter.get('/', isAuth(), wrapper(todoController.getAllTodo.bind(todoController)));
todosRouter.get(
  '/:id',
  isAuth(),
  isExist(Todo),
  wrapper(todoController.getOneTodo.bind(todoController))
);
todosRouter.post(
  '/',
  isAuth(),
  validation(TodoSchema),
  wrapper(todoController.createTodo.bind(todoController))
);
todosRouter.patch(
  '/:id',
  isAuth(),
  validation(TodoSchema),
  isExist(Todo),
  wrapper(todoController.updateTodo.bind(todoController))
);
todosRouter.delete(
  '/:id',
  isAuth(),
  isExist(Todo),
  wrapper(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
