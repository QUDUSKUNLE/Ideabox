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
    this.state = {
      // username: JSON.parse(localStorage.getItem('username')),
    };
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
  * @returns {object} UserIdeas component
  */
  render() {
    return (
      <div>
        <ul id="slide-out" className="side-nav fixed">
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
            <Link to="/dashboard">
              <i className="material-icons">home</i>Home
            </Link>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li>
            <div className="nav-wrapper">
              <form>
                <div className="input-field">
                  <input
                    id="search"
                    type="search"
                    required
                    placeholder="Search"
                  />
                  <label
                    className="label-icon"
                    htmlFor="search"
                  >
                    <i className="material-icons">search</i>
                  </label>
                </div>
              </form>
            </div>
          </li>
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion">
              <li>
                <a
                  href="#"
                  className="collapsible-header"
                >Categories
                <i className="material-icons right">
                  arrow_drop_down
                </i>
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li><a href="#">Public</a></li>
                    <li><a href="#">Private</a></li>
                  </ul>
                </div>
              </li>
            </ul>
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
