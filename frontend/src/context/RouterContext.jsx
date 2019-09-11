import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

export const RouterContext = React.createContext({});

export const CustomRouter = ({ children, history }) => (
  <Router history={history}>
    <Route>
      {routeProps => (
        <RouterContext.Provider value={routeProps}>
          {children}
        </RouterContext.Provider>
      )}
    </Route>
  </Router>
);
