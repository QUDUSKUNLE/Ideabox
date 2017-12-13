import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import authenticateRoute from '../authentication/authenticateRoute';
import CommentPage from '../CommentPage';
import DashBoard from '../DashBoard';
import LandingPage from '../LandingPage';
import MyIdeas from '../MyIdeas';
import UpdatePasswordPage from '../UpdatePasswordPage';

/**
 * @function Routes
 * @description This Abstract all Routes into a single function
 * @returns {component} returns a component that matches a provided path
 */
export default () =>
  (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={LandingPage}
        />
        <Route
          path="/passwords/:hash"
          component={UpdatePasswordPage}
        />
        <Route
          exact
          path="/dashboard"
          component={authenticateRoute(DashBoard)}
        />
        <Route
          path="/myideas"
          component={authenticateRoute(MyIdeas)}
        />
        <Route
          path="/dashboard/:ideaId"
          component={authenticateRoute(CommentPage)}
        />
      </Switch>
    </Router>
  );

