import React from 'react';
import { Route } from 'react-router-dom';
import { useRouter } from '../hooks/useRouter';

import { useAuth0 } from '../context/auth0';

export const ProtectedRoute = props => {
  const { history } = useRouter();
  const { isAuthenticated, tokenExists } = useAuth0();

  if (!isAuthenticated || !tokenExists) {
    history.push('/');
  }

  return <Route {...props} />;
};
