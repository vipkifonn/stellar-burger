import React, { useReducer } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from '../services/store';
import { Preloader } from '@ui';
import { getIsAuthChecked, getUser, getUserRequest } from '@selectors';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.ReactElement;
};

const ProtectedRoute = ({
  onlyUnAuth = false,
  component
}: TProtectedRouteProps): React.ReactElement => {
  const location = useLocation();
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const userRequest = useSelector(getUserRequest);

  if (!isAuthChecked || userRequest) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};

export const AuthRoute = ProtectedRoute;

export const UnAuthRoute = ({
  component
}: {
  component: React.ReactElement;
}) => <ProtectedRoute onlyUnAuth component={component} />;
