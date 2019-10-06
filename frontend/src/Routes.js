import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

import {
  LogoutScreen,
  HomeScreen,
  DashboardScreen,
  RequestFeedbackScreen
} from './screens';
import { ProtectedRoute } from './components';

ReactGA.initialize(process.env.REACT_APP_GA_ID);

const GlobalRoute = ({ history }) => {
  React.useEffect(() => {
    const unlisten = history.listen(location => {
      ReactGA.pageview(location.pathname);
    });

    return unlisten;
  }, [history]);
  return null;
};

export const Routes = () => {
  return (
    <>
      <Route component={GlobalRoute} />
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/logout" exact component={LogoutScreen} />
        <ProtectedRoute
          path="/request-feedback/:requestId"
          exact
          component={RequestFeedbackScreen}
        />
        <ProtectedRoute path="/dashboard/:tab?" exact component={DashboardScreen} />
      </Switch>
    </>
  );
};
