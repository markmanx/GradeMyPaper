import React from 'react';

import { useAuth0 } from '../context/auth0';

export const LogoutScreen = () => {
  const { logout } = useAuth0();

  logout();

  return <div>Logging out</div>;
};
