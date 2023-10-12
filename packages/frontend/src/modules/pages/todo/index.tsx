import React from 'react';
import { Todo } from '../../common/components/todo';
import { Navigation } from '../../common/components/navigation';

const TodoPageContainer = () => (
  <div>
    <Navigation />
    <Todo />
  </div>
);

export default TodoPageContainer;
