/* eslint-disable arrow-body-style */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import AuthPageContainer from '../pages/auth';
import ForgotPageContainer from '../pages/forgotPassword';
import ResetPageContainer from '../pages/ressetPassword';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={APP_KEYS.ROUTER_KEYS.AUTH} element={<AuthPageContainer />} />
      <Route path={APP_KEYS.ROUTER_KEYS.FORGOT_PASSWORD} element={<ForgotPageContainer />} />
      <Route path={APP_KEYS.ROUTER_KEYS.RESET_PASSWORD} element={<ResetPageContainer />} />
      <Route path="*" element={<Navigate to={APP_KEYS.ROUTER_KEYS.AUTH} replace />} />
    </Routes>
  );
};
