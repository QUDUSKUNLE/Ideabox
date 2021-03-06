import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @description - renders UserIdeas Component
 * @class UserIdeasSideNav
 * @extends {React.Component}
 */
class UserIdeasSideNav extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof UserIdeasSideNav
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof UserIdeasSideNav
  */
  componentDidMount() {
    $('.modal').modal();
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} UserIdeasSideNav component
  */
  render() {
    return (
      <div>
        <ul id="slide-out" className="side-nav fixed">
          <li>
            <div className="user-view logo1">
              <div className="logo">
                <h4 className="center-align">IdeaBox</h4>
              </div>
            </div>
          </li>
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion">
              <li>
                <a
                  href="#"
                  className="collapsible-header white-text"
                >{this.props.username}
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        className="collapsible-header"
                        onClick={this.props.handleLogOut}
                      >Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/dashboard" className="white-text">
              <i className="material-icons">home</i>Home
            </Link>
          </li>
          <li>
            <div className="divider" />
          </li>
        </ul>
        <a
          href="#"
          data-activates="slide-out"
          className="button-collapse icon_menu"
        ><i className="medium material-icons black-text">menu</i>
        </a>
      </div>
    );
  }
}

UserIdeasSideNav.propTypes = {
  username: PropTypes.string.isRequired,
  handleLogOut: PropTypes.func.isRequired,
};
export default UserIdeasSideNav;
