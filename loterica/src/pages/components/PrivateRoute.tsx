import React from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../functions/auth';

interface Props {
  children: ReactNode;
}

function PrivateRoute({ children }: Props) {
  return isAuthenticated() ? children : <Navigate to="/" />;
}

export default PrivateRoute;
