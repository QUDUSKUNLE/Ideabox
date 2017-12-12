import React from 'react';
import PropTypes from 'prop-types';
import AppActions from '../../actions/AppActions';
import AppConstants from '../../contants/AppConstants';
import AppStore from '../../store/AppStore';

/**
 * @description the UpdateProfileForm component
 * @function UpdateProfileForm
 * @returns {object} UpdateProfileForm component
 */
export default class UpdateProfileForm extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof UpdateProfileForm
   */
  constructor(props) {
    super(props);
    this.state = { username: '', email: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof UpdateProfileForm
  */
  componentDidMount() {
    $('.modal').modal();
    AppStore.on(AppConstants.UPDATE_PROFILE, this.handleUpdateResponse);
  }
  /**
  * @method componentWillReceiveProps
  * @description This listening to event in the AppStore
  * @param {object} nextProps
  * @return {void}
  * @memberof UpdateProfileForm
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.userDetails.username,
      email: nextProps.userDetails.email
    });
  }

  /**
  * @method handleChange
  * @description class method that sets user input to store
  * @return {void}
  * @param {event} event
  */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
  * @method handleUpdateProfile
  * @description class method handles Update Profile
  * @param {event} event
  * @returns {void}
  */
  handleUpdateProfile(event) {
    event.preventDefault();
    AppActions.updateProfile(this.state);
  }

  /**
  * @method handleUpdateResponse
  * @description class method handles Update Profile Response
  * @returns {void}
  */
  handleUpdateResponse() {
    Materialize.toast(
      AppStore.updateProfile().message,
      2000,
      'rounded green'
    );
    $('#update_profile').modal('close');
  }
  /**
  * @description - render method, React lifecycle method
  * @returns {object} UpdateProfileForm component
  */
  render() {
    return (
      <div className="modal-content">
        <div className="container">
          <h5
            className="center-align header"
          >Update Profile
          </h5>
          <form
            className="col s12"
            onSubmit={this.handleUpdateProfile}
          >
            <div className="input-field col s12">
              <input
                value={this.state.username}
                onChange={this.handleChange}
                name="username"
                type="text"
                id="username"
                className="validate header"
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
                onChange={this.handleChange}
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
            <div className="row">
              <button
                className="btn waves-effect deep-purple darken-4 col s12"
                type="submit"
              >UPDATE PROFILE
              </button>
              <br />
              <br />
              <p
                className="center-align header"
              >
                <a
                  className="modal-close"
                  href="#!"
                >CANCEL
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

UpdateProfileForm.propTypes = {
  userDetails: PropTypes.object.isRequired
};

