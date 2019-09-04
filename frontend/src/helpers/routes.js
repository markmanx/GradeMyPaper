import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { LogoutScreen, HomeScreen, ProtectedScreen } from '../screens';
import { ProtectedRoute } from '../components/ProtectedRoute';

const history = createBrowserHistory();

export const RouteMatcher = () => {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/logout" exact component={LogoutScreen} />
          <ProtectedRoute path="/protected" exact component={ProtectedScreen} />
        </Switch>
      </Router>
    </>
  );
};
