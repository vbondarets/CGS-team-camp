import React, { useState, useEffect } from 'react';
import { PrivateRoutes } from './private.route';
import { PublicRoutes } from './public.route';
import { useAuth, useGetSelf } from '../common/hooks';

export const MainRouter = () => {
  const { isSelfLoading } = useGetSelf();
  const { isAuth } = useAuth();
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setIsLoadingPage(isSelfLoading);
  }, [isSelfLoading]);

  if (isLoadingPage) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }
  return isAuth ? <PrivateRoutes /> : <PublicRoutes />;
};
