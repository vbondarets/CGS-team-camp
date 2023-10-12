import React from 'react';
import { Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import TodoPageContainer from '../pages/todo';
import AuthPageContainer from '../pages/auth';
import { PrivateRoute } from './private.route';
import { NotAuthRoute } from './notAuth.route';
import resetPageContainer from '../pages/ressetPassword';
import ForgotPageContainer from '../pages/forgotPassword';

export const MainRouter = () => (
  <Router>
    <Switch>
      <NotAuthRoute exact path={APP_KEYS.ROUTER_KEYS.AUTH} component={AuthPageContainer} />
      <NotAuthRoute
        exact
        path={APP_KEYS.ROUTER_KEYS.FORGOT_PASSWORD}
        component={ForgotPageContainer}
      />
      <NotAuthRoute
        exact
        path={APP_KEYS.ROUTER_KEYS.RESET_PASSWORD}
        component={resetPageContainer}
      />
      <PrivateRoute exact path={APP_KEYS.ROUTER_KEYS.ROOT} component={HomePageContainer} />
      <PrivateRoute exact path={APP_KEYS.ROUTER_KEYS.TODO} component={TodoPageContainer} />
      <Redirect to={APP_KEYS.ROUTER_KEYS.ROOT} />
    </Switch>
  </Router>
);
