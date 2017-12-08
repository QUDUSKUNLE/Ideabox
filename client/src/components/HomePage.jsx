import React from 'react';
import PropTypes from 'prop-types';
import LogInForm from '../components/home/LogInForm';
import RegisterForm from '../components/home/RegisterForm';
import ForgotPasswordForm from '../components/home/ForgotPasswordForm';


const HomePage = ({ history }) =>
  (
    <div>
      <RegisterForm history={history} />
      <LogInForm history={history} />
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
HomePage.propTypes = {
  history: PropTypes.object.isRequired
};

export default HomePage;
