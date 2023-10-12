import React from 'react';
import { TodoContainer } from '../common/components/todoContainer';
import { Navigation } from '../common/components/navigation';

const HomePageContainer = () => (
  <div>
    <Navigation />
    <TodoContainer />
  </div>
);

export default HomePageContainer;
