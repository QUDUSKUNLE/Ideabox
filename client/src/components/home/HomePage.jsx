import React from 'react';
import LogInForm from './LogInForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

export default () => (
  <div>
    <RegisterForm />
    <LogInForm />
    <ForgotPasswordForm />
    <div className="container">
      <div className="logo">
        <h4>IdeaBox</h4>
      </div>
      <div className="col s12 flex-center">
        <div className="center-align">
          <h3>Let Your Ideas Rule The World</h3>
          <div className="container">
            <button
              data-target="register"
              className="btn modal-trigger deep-purple darken-4 margin-top s6"
              type="submit"
              name="action"
            >Register
            </button>
            <button
              data-target="login"
              className="btn modal-trigger deep-purple darken-4 margin-top s6"
              type="submit"
              name="action"
            >LOG IN
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

