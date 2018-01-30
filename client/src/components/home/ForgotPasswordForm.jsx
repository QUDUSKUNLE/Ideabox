import React from 'react';
import AppActions from '../../actions/AppActions';
import AppStore from '../../store/AppStore';
import AppConstants from '../../contants/AppConstants';
import customAlert from '../customAlert';

/**
 * @description - renders ForgotPasswordForm Component
 * @class ForgotPasswordForm
 * @extends {React.Component}
 */
export default class ForgotPasswordForm extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof ForgotPasswordForm
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      forgotPasswordError: '',
      forgotPasswordSuccess: '',
      show: false,
      success: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handleResetResponse = this.handleResetResponse.bind(this);
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof ForgotPasswordForm
  */
  componentDidMount() {
    AppStore.on(AppConstants.RESET_PASSWORD, this.handleResetResponse);
  }

  /**
  * @method componentWillUnmount
  * @description Removes listener from AppStore
  * @return {void}
  * @memberof ForgotPasswordForm
  */
  componentWillUnmount() {
    AppStore.removeListener(
      AppConstants.RESET_PASSWORD,
      this.handleResetResponse
    );
  }

  /**
  * @method onChange
  * @description class method that sets user input to store
  * @return {void}
  * @param {event} event
  */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ show: false, success: false });
  }

  /**
   * @method handleResponse
   * @description class method that handles register Response
   * @return {void}
   */
  handleResetResponse() {
    this.setState({
      success: (AppStore.resetPassword()).success,
      forgotPasswordSuccess: (AppStore.resetPassword()).message
    });
  }

  /**
  * @method handleResetPassword
  * @description class method that makes an action call to sign up a user
  * @return {void}
  * @param {resetPassword} resetPassword
  */
  handleResetPassword(resetPassword) {
    resetPassword.preventDefault();
    const userEmail = { email: this.state.email };
    AppActions.resetPassword(userEmail)
      .catch(({ response }) => {
        if (response) {
          this.setState({
            forgotPasswordError: response.data.error,
            show: true
          });
        }
      });
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {Object} ForgotPasswordForm component
  */
  render() {
    return (
      <div id="forgotpassword" className="modal">
        <div className="modal-content">
          <div className="container">
            <h5
              className="center-align header"
            >Reset password
            </h5>
            <p className="center-align header">
              Reset password using your account email
            </p>
            <form
              className="col s12"
              onSubmit={this.handleResetPassword}
            >
              <span className="row">
                {this.state.show
                  ? customAlert.errorMessage(this.state.forgotPasswordError)
                  : (<span />)
                }
              </span>
              <span className="row">
                {this.state.success
                  ? customAlert.successMessage(this.state.forgotPasswordSuccess)
                  : (<span />)
                }
              </span>
              <div className="input-field col s12">
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                  type="email"
                  className="validate header"
                  required
                />
                <label
                  htmlFor="email"
                >Email
                </label>
              </div>
              <div className="row">
                <button
                  className="btn waves-effect deep-purple darken-4 col s12"
                  type="submit"
                >Reset password
                </button>
                <br />
                <br />
                <br />
                <a
                  className="modal-trigger modal-close"
                  href="#login"
                >LOG IN
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
