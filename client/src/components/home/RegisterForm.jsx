import React from 'react';
import AppActions from '../../actions/AppActions';
import AppStore from '../../store/AppStore';
import AppConstants from '../../contants/AppConstants';
import catchError from '../catchError';

/**
 * @description - renders RegisterForm Component
 * @class RegisterForm
 * @extends {React.Component}
 */
class RegisterForm extends React.Component {
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
      [event.target.name]: event.target.value
    });
    this.setState({
      show: false
    });
  }
  /**
   * @method handleResponse
   * @description class method that handles register Response
   * @return {void}
   */
  handleResponse() {
    console.log(AppStore.registerUserPayload);
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
      <div className="container">
        <h5
          className="center-align"
        >Register
        </h5>
        <hr />
        <form
          className="col s12"
          onSubmit={this.handleRegister}
        >
          <div className="row">
            <div className="input-field col s12">
              <input
                value={this.state.username}
                onChange={this.onChange}
                name="username"
                type="text"
                id="username"
                className="validate"
                required
              />
              <label
                htmlFor="username"
              >Username
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                value={this.state.email}
                onChange={this.onChange}
                name="email"
                id="email"
                type="email"
                className="validate"
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
            <div>
              {this.state.show ?
                catchError(this.state.signUpError) : (<span />)}
            </div>
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
              className="center-align"
            >Already have an account? <a href="#!">LOG IN</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
export default RegisterForm;
