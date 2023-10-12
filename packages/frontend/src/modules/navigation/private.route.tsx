import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import { useGetUser } from '../common/hooks/getUser.query';

interface IProps extends RouteProps {}

export const PrivateRoute = ({ ...rest }: IProps) => {
  const { data } = useGetUser();
  if (!data?.token) {
    return <Redirect to={APP_KEYS.ROUTER_KEYS.AUTH} />;
  }
  return <Route {...rest} />;
};
