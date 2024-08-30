/* eslint-disable arrow-body-style */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import TodoPageContainer from '../pages/todo';
import HomePageContainer from '../home';

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path={APP_KEYS.ROUTER_KEYS.ROOT} element={<HomePageContainer />} />
      <Route path={APP_KEYS.ROUTER_KEYS.TODO} element={<TodoPageContainer />} />
      <Route path="*" element={<Navigate to={APP_KEYS.ROUTER_KEYS.ROOT} replace />} />
    </Routes>
  );
};
