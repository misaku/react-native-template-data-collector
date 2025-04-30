import React from 'react';
import {AuthRoutes} from './auth.routes';
import {PublicRoutes} from './public.routes';
import {useAppStore} from '../App/app.store';

export const Routes: React.FC = () => {
  const {isAuthenticad} = useAppStore();
  return isAuthenticad ? <AuthRoutes /> : <PublicRoutes />;
};
