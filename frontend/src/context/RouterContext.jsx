import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const RouterContext = React.createContext({});

export const CustomRouter = ({ children }) => (
  <BrowserRouter>
    <Route>
      {routeProps => (
        <RouterContext.Provider value={routeProps}>
          {children}
        </RouterContext.Provider>
      )}
    </Route>
  </BrowserRouter>
);
