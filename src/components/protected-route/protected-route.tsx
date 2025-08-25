import React, { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUserLoading, selectUserAuth } from '@/services/selectors/user';
import { useAppSelector } from '@/services/store';
import { Preloader } from '../ui';

type ProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean; // true — если маршрут доступен только неавторизованным
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth
}) => {
  const location = useLocation();

  const isLoading = useAppSelector(selectUserLoading);
  const isAuth = useAppSelector(selectUserAuth);

  // если пользователь НЕ авторизован, а маршрут требует авторизации → редирект на /login
  if (!isAuth && !onlyUnAuth) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  // если пользователь авторизован, а маршрут доступен только гостям → редирект на главную
  if (isAuth && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  // иначе рендерим то, что передали
  return children;
};
