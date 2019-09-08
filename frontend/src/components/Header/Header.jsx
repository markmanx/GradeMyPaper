import React from 'react';
import styled from 'styled-components/macro';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { ThemeProviders } from '../../context/ThemeProviders';
import logo from './assets/logo.png';
import { useAuth0 } from '../../context/auth0';
import { meQuery } from '../../gql';
import { Section, Padder, Button } from '../../components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
`;

const WrapperInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
    <ThemeProviders type="dark">
      <Wrapper>
        <Section>
          <Padder paddingVertical={1.5}>
            <WrapperInner>
              <Link to="/">
                <Logo src={logo} />
              </Link>
              {ready && (
                <div>
                  Logged in as {data.me.email} Credits: {data.me.credits}
                </div>
              )}

              <Button
                variant={isAuthenticated ? 'default' : 'contained'}
                size="small"
                onClick={isAuthenticated ? onSignOut : onSignIn}
              >
                {isAuthenticated ? 'Sign out' : 'Sign in'}
              </Button>
            </WrapperInner>
          </Padder>
        </Section>
      </Wrapper>
    </ThemeProviders>
  );
};
