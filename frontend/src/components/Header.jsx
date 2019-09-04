import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { useAuth0 } from '../context/auth0';
import { meQuery } from '../gql';

export const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { data, loading, error } = useQuery(meQuery);

  const ready = !loading && !error && data && data.me;

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && (
        <>
          {ready && (
            <div>
              Logged in as {data.me.email} Credits: {data.me.credits}
            </div>
          )}
          <button onClick={() => logout()}>Log out</button>
        </>
      )}
    </div>
  );
};
