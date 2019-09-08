import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';

import logo from './assets/logo.png';
import { useAuth0 } from '../../context/auth0';
import { meQuery } from '../../gql';
import { Section } from '../../components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: blue;
  align-items: center;
`;

const Logo = styled.img`
  width: 250px;
`;

export const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { data, loading, error } = useQuery(meQuery);

  const ready = !loading && !error && data && data.me;

  const onSignIn = () => {
    loginWithRedirect({});
  };

  const onSignOut = () => {};

  return (
    <Section>
      <Wrapper>
        <Logo src={logo} />
        {ready && (
          <div>
            Logged in as {data.me.email} Credits: {data.me.credits}
          </div>
        )}
        <Button
          color="primary"
          variant={isAuthenticated ? 'default' : 'contained'}
          size="small"
          onClick={isAuthenticated ? onSignOut : onSignIn}
        >
          {isAuthenticated ? 'Sign out' : 'Sign in'}
        </Button>
      </Wrapper>
    </Section>
  );
};
