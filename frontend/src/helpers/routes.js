import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Header } from '../components';
import { LogoutScreen, HomeScreen, Dashboard } from '../screens';
import { ProtectedRoute } from '../components';

const history = createBrowserHistory();

export const RouteMatcher = () => {
  return (
    <>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/logout" exact component={LogoutScreen} />
          <ProtectedRoute path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </>
  );
};
