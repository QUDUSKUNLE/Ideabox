import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppActions from '../../actions/AppActions';
import AppStore from '../../store/AppStore';
import AppConstants from '../../contants/AppConstants';
import customAlert from '../customAlert';


/**
 * @description - renders LogInForm Component
 * @class LogInForm
 * @extends {React.Component}
 */
export default class LogInForm extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof LogInForm
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      logInError: '',
      show: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof LogInForm
  */
  componentDidMount() {
    AppStore.on(AppConstants.LOG_IN, this.handleResponse);
  }

  /**
  * @method componentWillUnmount
  * @description Removes listener from AppStore
  * @return {void}
  * @memberof LogInForm
  */
  componentWillUnmount() {
    AppStore.removeListener(AppConstants.LOG_IN, this.handleResponse);
  }

  /**
  * @method onChange
  * @description class method that sets user input to store
  * @return {void}
  * @param {event} event
  */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ show: false });
  }

  /**
   * @method handleResponse
   * @description class method that handles register Response
   * @return {void}
   */
  handleResponse() {
    Materialize.toast('Sign in successful', 2000, 'rounded green');
    $('#login').modal('close');
    this.props.history.push('/dashboard');
  }

  /**
  * @method handleLogIn
  * @description class method that makes an action call to sign up a user
  * @return {void}
  * @param {logInEvent} logInEvent
  */
  handleLogIn(logInEvent) {
    logInEvent.preventDefault();
    const userDetail = {
      email: this.state.email,
      password: this.state.password
    };
    AppActions.logInUser(userDetail)
      .catch(({ response }) => {
        if (response) {
          this.setState({
            logInError: response.data.error,
            show: true
          });
        }
      });
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {Object} LogInForm component
  */
  render() {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    if (isAuthenticated) {
      return (
        <Redirect to="/dashboard" />
      );
    }
    return (
      <div id="login" className="modal">
        <div className="modal-content">
          <div className="container">
            <h5
              className="center-align header"
            >Log in
            </h5>
            <form
              className="col s12"
              onSubmit={this.handleLogIn}
            >
              <div className="row">
                {this.state.show
                  ? customAlert.errorMessage(this.state.logInError)
                  : (<span />)
                }
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.email}
                    onChange={this.onChange}
                    name="email"
                    id="email"
                    type="email"
                    className="validate header"
                    required
                  />
                  <label
                    htmlFor="email"
                  >Email
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.password}
                    onChange={this.onChange}
                    name="password"
                    id="password"
                    type="password"
                    className="validate"
                    required
                  />
                  <label
                    htmlFor="password"
                  >Password
                  </label>
                </div>
              </div>
              <div className="row">
                <button
                  className="btn waves-effect deep-purple darken-4 col s12"
                  type="submit"
                >LOG IN
                </button>
                <br />
                <br />
                <br />
                <a
                  className="modal-trigger modal-close"
                  href="#register"
                >REGISTER
                </a>
                <a
                  className="modal-trigger modal-close link"
                  href="#forgotpassword"
                >Forgot password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
LogInForm.propTypes = {
  history: PropTypes.object.isRequired
};
