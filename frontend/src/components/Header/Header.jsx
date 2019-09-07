import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import logo from './assets/logo.png';
import { useAuth0 } from '../../context/auth0';
import { meQuery } from '../../gql';

const Wrapper = styled.div`
  background-color: blue;
`;

const Logo = styled.img`
  width: 250px;
`;

export const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { data, loading, error } = useQuery(meQuery);

  const ready = !loading && !error && data && data.me;

  return (
    <Wrapper>
      <Logo src={logo} />
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
    </Wrapper>
  );
};
