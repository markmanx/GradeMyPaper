import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProviders } from './context/ThemeProviders';
import { Auth0Provider } from './context/auth0';
import { Provider as ApolloProvider } from './helpers/apolloClient';
import { GlobalStyle } from './helpers/globalStyles';
import { Header, Footer } from './components';
import { Routes } from './Routes';

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
          <Router>
            <Header />
            <Routes />
            <Footer />
          </Router>
        </ThemeProviders>
      </Auth0Provider>
    </ApolloProvider>
  );
}

export default App;
