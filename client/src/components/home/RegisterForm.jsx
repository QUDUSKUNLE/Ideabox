import React from 'react';
import PropTypes from 'prop-types';
import AppActions from '../../actions/AppActions';
import AppStore from '../../store/AppStore';
import AppConstants from '../../contants/AppConstants';
import customAlert from '../customAlert';

/**
 * @description - renders RegisterForm Component
 * @class RegisterForm
 * @extends {React.Component}
 */
export default class RegisterForm extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof RegisterForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      signUpError: '',
      show: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof RegisterForm
  */
  componentDidMount() {
    AppStore.on(AppConstants.SIGN_UP, this.handleResponse);
  }

  /**
  * @method componentWillUnmount
  * @description Removes listener from AppStore
  * @return {void}
  * @memberof RegisterForm
  */
  componentWillUnmount() {
    AppStore.removeListener(AppConstants.SIGN_UP, this.handleResponse);
  }

  /**
  * @method onChange
  * @description class method that sets user input to store
  * @return {void}
  * @param {event} event
  */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      show: false
    });
  }

  /**
   * @method handleResponse
   * @description class method that handles register Response
   * @return {void}
   */
  handleResponse() {
    Materialize.toast('Sign up successful', 2000, 'rounded green');
    $('#register').modal('close');
    this.props.history.push('/dashboard');
  }

  /**
  * @method handleRegister
  * @description class method that makes an action call to sign up a user
  * @return {void}
  * @param {signUpEvent} signUpEvent
  */
  handleRegister(signUpEvent) {
    signUpEvent.preventDefault();
    const userDetails = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    AppActions.signUpUser(userDetails)
      .catch(({ response }) => {
        if (response) {
          this.setState({
            signUpError: response.data.error,
            show: true
          });
        }
      });
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {Object} RegisterForm component
  */
  render() {
    return (
      <div id="register" className="modal" >
        <div className="modal-content">
          <div className="container">
            <h5
              className="center-align header"
            >Register
            </h5>
            <form
              id="register_form"
              className="col s12"
              onSubmit={this.handleRegister}
            >
              <div className="row">
                <div>
                  {this.state.show
                    ? customAlert.errorMessage(this.state.signUpError)
                    : (<span />)}
                </div>
              </div>
              <div className="input-field col s12">
                <input
                  value={this.state.username}
                  onChange={this.onChange}
                  name="username"
                  type="text"
                  id="reg_username"
                  className="validate header username"
                  required
                />
                <label
                  htmlFor="username"
                >Username
                </label>
              </div>
              <div className="input-field col s12">
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                  type="email"
                  id="reg_email"
                  className="validate header"
                  required
                />
                <label
                  htmlFor="email"
                >Email
                </label>
              </div>
              <div className="input-field col s12">
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                  type="password"
                  id="reg_password"
                  className="validate header"
                  required
                />
                <label
                  htmlFor="password"
                >Password
                </label>
              </div>
              <div className="row">
                <button
                  className="btn waves-effect deep-purple darken-4 col s12"
                  type="submit"
                >REGISTER
                </button>
                <br />
                <br />
                <p
                  className="center-align header"
                >Already have an account?{' '}
                  <a
                    className="modal-trigger modal-close"
                    href="#login"
                  >LOG IN
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  history: PropTypes.object.isRequired
};
