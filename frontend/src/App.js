import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';

import { Auth0Provider } from './context/auth0';
import { Provider as ApolloProvider } from './helpers/apolloClient';
import { RouteMatcher } from './helpers/routes';
import { theme } from './helpers/themeHelpers';
import { Header } from './components';

function App() {
  return (
    <ApolloProvider>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirect_uri={window.location.origin}
        audience={`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`}
      >
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>
            <Header />
            <RouteMatcher />
          </MuiThemeProvider>
        </ThemeProvider>
      </Auth0Provider>
    </ApolloProvider>
  );
}

export default App;
