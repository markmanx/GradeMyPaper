import React from 'react';
import styled, { css } from 'styled-components/macro';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';

import { useRouter } from '../../hooks/useRouter';
import { ThemeProviders } from '../../context/ThemeProviders';
import logo from './assets/logo.png';
import { useAuth0 } from '../../context/auth0';
import { meQuery } from '../../gql';
import { Section, Padder, Button, Text, ContactForm } from '../../components';

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

const NavWrapper = styled.div`
  display: flex;

  ${({ theme }) => css`
    & > *:not(:first-child) {
      padding-left: ${theme.baseUnit * 0.5}px;
    }
  `}
`;

const StyledText = styled(Text)`
  display: flex;
  align-items: center;
  padding-left: 0;
`;

export const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { data, loading, error } = useQuery(meQuery);
  const { history } = useRouter();
  const [contactModalOpen, setContactModalOpen] = React.useState(false);

  const ready = !loading && !error && data && data.me;

  const onSignIn = () => {
    loginWithRedirect({});
  };

  const onContactModalClose = () => {
    setContactModalOpen(false);
  };

  const onContactModalOpen = () => {
    setContactModalOpen(true);
  };

  const ContactButton = () => (
    <Button variant="text" size="small" onClick={onContactModalOpen}>
      Contact
    </Button>
  );

  return (
    <>
      <ThemeProviders type="dark">
        <Wrapper>
          <Section>
            <Padder paddingVertical={1.5}>
              <WrapperInner>
                <Link to="/">
                  <Logo src={logo} />
                </Link>
                <NavWrapper>
                  {isAuthenticated ? (
                    <>
                      <Button
                        size="small"
                        onClick={() => {
                          history.push('/dashboard');
                        }}
                      >
                        Dashboard
                      </Button>
                      <ContactButton />
                      <Button variant="text" size="small" onClick={logout}>
                        Sign out
                      </Button>
                      {ready && (
                        <StyledText bold variant="body2" textColor="hint">
                          |&nbsp;&nbsp;{data.me.email}
                        </StyledText>
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={onSignIn}
                      >
                        Sign in
                      </Button>
                      <ContactButton />
                    </>
                  )}
                </NavWrapper>
              </WrapperInner>
            </Padder>
          </Section>
        </Wrapper>
      </ThemeProviders>
      <ContactForm
        isOpen={contactModalOpen}
        handleClose={onContactModalClose}
      />
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};
