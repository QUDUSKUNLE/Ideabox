import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppActions from '../../actions/AppActions';
import AppConstants from '../../contants/AppConstants';
import AppStore from '../../store/AppStore';

/**
 * @description - renders UpdatePasswordForm Component
 * @class UpdatePasswordForm
 * @extends {React.Component}
 */
export default class UpdatePasswordForm extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof UpdatePasswordForm
   */
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: ''
    };
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdateResponse = this.handleUpdateResponse.bind(this);
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof UpdatePasswordForm
  */
  componentDidMount() {
    AppStore.on(AppConstants.UPDATE_PASSWORD, this.handleUpdateResponse);
  }

  /**
  * @method componentWillUnmount
  * @description Removes listener from AppStore
  * @return {void}
  * @memberof UpdatePasswordForm
  */
  componentWillUnmount() {
    AppStore.removeListener(
      AppConstants.UPDATE_PASSWORD,
      this.handleUpdateResponse
    );
  }

  /**
  * @method handleChangeEvent
  * @description class method that binds input to form fields
  * @return {void}
  * @param {event} event
  */
  handleChangeEvent(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
  * @method handleUpdate
  * @description class method that makes an action call to sign up a user
  * @param {event} event
  * @return {void}
  */
  handleUpdate(event) {
    event.preventDefault();
    AppActions.updatePassword(
      this.state,
      this.props.hash.match.params.hash
    ).catch((error) => {
      if (error.response) {
        Materialize.toast(error.response.data.error, 2000, 'rounded red');
      }
    });
  }

  /**
   * @method handleUpdateResponse
   * @description class method that handles update password response
   * @return {void}
   */
  handleUpdateResponse() {
    Materialize.toast(AppStore.updatePassword().message, 2000, 'rounded green');
    this.setState({ newPassword: '', confirmPassword: '' });
    this.props.hash.history.push('/');
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} UpdatePasswordForm component
  */
  render() {
    return (
      <div className="container">
        <h5
          className="center-align header"
        >Update password
        </h5>
        <form
          className="col s12"
          onSubmit={this.handleUpdate}
        >
          <div className="row">
            <div className="input-field col s12">
              <input
                value={this.state.newPassword}
                onChange={this.handleChangeEvent}
                name="newPassword"
                type="password"
                className="validate header"
                required
              />
              <label
                htmlFor="newPassword"
              >New password
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                value={this.state.confirmPassword}
                onChange={this.handleChangeEvent}
                name="confirmPassword"
                type="password"
                className="validate header"
                required
              />
              <label
                htmlFor="email"
              >Confirm password
              </label>
            </div>
          </div>
          <div className="row">
            <button
              className="btn waves-effect deep-purple darken-4 col s12"
              type="submit"
            >UPDATE PASSWORD
            </button>
            <br />
            <br />
            <p
              className="center-align header"
            >
              <Link
                to="/"
                className="btn waves-effect deep-purple darken-4 col s12"
              >CANCEL
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

UpdatePasswordForm.propTypes = {
  hash: PropTypes.object.isRequired
};
