import React from 'react';

import { ThemeProviders } from './context/ThemeProviders';
import { Auth0Provider } from './context/auth0';
import { Provider as ApolloProvider } from './helpers/apolloClient';
import { RouteMatcher } from './helpers/routes';
import { GlobalStyle } from './helpers/globalStyles';

function App() {
  return (
    <ApolloProvider>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirect_uri={window.location.origin}
        audience={`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`}
      >
        <ThemeProviders>
          <GlobalStyle />
          <RouteMatcher />
        </ThemeProviders>
      </Auth0Provider>
    </ApolloProvider>
  );
}

export default App;
