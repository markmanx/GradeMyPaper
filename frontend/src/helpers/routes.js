import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CustomRouter } from '../context/RouterContext';
import { Header } from '../components';
import { LogoutScreen, HomeScreen, Dashboard } from '../screens';
import { ProtectedRoute } from '../components';

export const RouteMatcher = () => {
  return (
    <>
      <CustomRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/logout" exact component={LogoutScreen} />
          <ProtectedRoute path="/dashboard" exact component={Dashboard} />
        </Switch>
        )}
      </CustomRouter>
    </>
  );
};
