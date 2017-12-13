import React from 'react';
import UpdatePasswordForm from './home/UpdatePasswordForm';

/**
 * @description - renders LogInForm Component
 * @class UpdatePasswordPage
 * @extends {React.Component}
 */
export default class UpdatePasswordPage extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof UpdatePasswordPage
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} UpdatePasswordPage component
  */
  render() {
    return (
      <div className="container">
        <div className="logo">
          <h4>IdeaBox</h4>
        </div>
        <div id="update_password" className="align-center">
          <UpdatePasswordForm
            hash={this.props}
          />
        </div>
      </div>
    );
  }
}

// UpdatePasswordPage.propTypes = {
//   history: PropTypes.object.isRequired
// };
// export default HomePage;
