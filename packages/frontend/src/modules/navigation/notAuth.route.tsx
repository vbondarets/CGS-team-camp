import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import { useGetUser } from '../common/hooks/getUser.query';

interface IProps extends RouteProps {}

export const NotAuthRoute = ({ ...rest }: IProps) => {
  const { data, isFetched } = useGetUser();
  if (data?.token && isFetched) {
    return <Redirect to={APP_KEYS.ROUTER_KEYS.ROOT} />;
  }
  return <Route {...rest} />;
};
