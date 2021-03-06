import React from 'react';
import PropTypes from 'prop-types';
import LogInForm from '../components/home/LogInForm';
import RegisterForm from '../components/home/RegisterForm';
import ForgotPasswordForm from '../components/home/ForgotPasswordForm';

/**
 * @description - renders LogInForm Component
 * @class HomePage
 * @extends {React.Component}
 */
export default class HomePage extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof HomePage
   */
  constructor(props) {
    super(props);
    this.openRegister = this.openRegister.bind(this);
  }
  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof LogInForm
  */
  componentDidMount() {
    $('.modal').modal();
  }

  /**
  * @method openRegister
  * @description class method that makes an action call to sign up a user
  * @return {void}
  * @param {event} event
  */
  openRegister(event) {
    event.preventDefault();
    $('#register').modal('open');
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} LogInForm component
  */
  render() {
    return (
      <div>
        <RegisterForm history={this.props.history} />
        <LogInForm history={this.props.history} />
        <ForgotPasswordForm />
        <div className="container">
          <div className="logo">
            <h4>IdeaBox</h4>
          </div>
          <div className="col s12 flex-center">
            <div className="center-align">
              <h3>Let Your Ideas Rule The World</h3>
              <div className="container">
                <a
                  href="##"
                  id="open_reg"
                  onClick={this.openRegister}
                  className="btn deep-purple darken-4 margin-top s6"
                >Register
                </a>
                <button
                  data-target="login"
                  id="open_log"
                  className="btn modal-trigger deep-purple darken-4 margin-top s6"
                >LOG IN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired
};
