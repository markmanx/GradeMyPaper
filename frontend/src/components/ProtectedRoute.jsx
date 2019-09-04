import React from 'react';
import { Route } from 'react-router-dom';

import { useAuth0 } from '../context/auth0';

export const ProtectedRoute = props => {
  const { isAuthenticated, tokenExists } = useAuth0();

  if (!isAuthenticated || !tokenExists) {
    return <div>You are not authorized to view this screen</div>;
  }

  return <Route {...props} />;
};
