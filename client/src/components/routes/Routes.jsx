import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage';
import DashBoard from '../DashBoard';
import UserIdeas from '../UserIdeas';
import authenticateRoute from '../authentication/authenticateRoute';

/**
 * @function Routes
 * @description This Abstract all Routes into a single function
 * @returns {component} returns a component that matches a provided path
 */
export default () =>
  (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/dashboard" component={authenticateRoute(DashBoard)} />
        <Route path="/myideas" component={UserIdeas} />
      </Switch>
    </Router>
  );

