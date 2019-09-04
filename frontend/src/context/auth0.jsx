// src/react-auth0-wrapper.js
import React, { useState, useEffect, useContext } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import createAuth0Client from '@auth0/auth0-spa-js';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [tokenExists, setTokenExists] = useState(false);
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const { resetStore } = useApolloClient();

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const setToken = async () => {
    const token = await auth0Client.getTokenSilently();

    localStorage.setItem('access_token', token);
    setTokenExists(true);
    await resetStore();
  };

  useEffect(() => {
    if (isAuthenticated) {
      setToken();
    } else {
      localStorage.removeItem('access_token');
    }
  }, [isAuthenticated]);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }

    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();

    setLoading(false);
    setIsAuthenticated(true);
  };

  const onLogout = async () => {
    if (auth0Client) {
      localStorage.removeItem('access_token');
      setTokenExists(false);
      await resetStore();
      auth0Client.logout({ returnTo: process.env.REACT_APP_BASE_URL });
    }
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        tokenExists,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: onLogout
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
