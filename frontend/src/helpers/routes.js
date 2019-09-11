import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  LogoutScreen,
  HomeScreen,
  Dashboard,
  RequestFeedbackScreen
} from '../screens';
import { ProtectedRoute } from '../components';

export const RouteMatcher = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomeScreen} />
      <Route path="/logout" exact component={LogoutScreen} />
      <Route
        path="/request-feedback/:paperId"
        exact
        component={RequestFeedbackScreen}
      />
      <ProtectedRoute path="/dashboard" exact component={Dashboard} />
    </Switch>
  );
};
