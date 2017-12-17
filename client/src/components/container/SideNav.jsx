import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UpdateProfileModal from './modal/UpdateProfileModal';
import AppActions from '../../actions/AppActions';

/**
 * @description - renders ForgotPasswordForm Component
 * @class SideNav
 * @extends {React.Component}
 */
export default class SideNav extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof SideNav
   */
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem('userDetails')),
      username: JSON.parse(localStorage.getItem('userDetails')).username,
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof SideNav
  */
  componentDidMount() {
    $('.modal').modal();
  }

  /**
  * @method handleChange
  * @description class method that sets user input to store
  * @return {void}
  * @param {event} event
  */
  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  /**
  * @method handleChange
  * @description class method that handles search for ideas
  * @return {void}
  * @param {event} event
  */
  handleSearch(event) {
    event.preventDefault();
    if (this.state.search.trim() === '') {
      Materialize.toast('Hey, nothing is search for', 2000, 'rounded red');
    } else {
      const { search } = this.state;
      AppActions.searchIdea(search);
    }
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} SideNav component
  */
  render() {
    return (
      <div>
        <UpdateProfileModal
          username={this.state.username}
          userDetails={this.state.userDetails}
        />
        <ul id="slide-out" className="side-nav fixed">
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion">
              <li>
                <a
                  href="#"
                  className="collapsible-header white-text"
                >{this.state.username}
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <a
                        href="#update_profile"
                        className="modal-trigger"
                      >Update profile
                      </a>
                    </li>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        className="collapsible-header"
                        onClick={this.props.logOut}
                      >Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/myideas" className="white-text">
              <i className="material-icons">folder</i>My Ideas
            </Link>
          </li>
          <li>
            <a
              href="#create_idea"
              className="modal-trigger white-text"
            ><i className="material-icons">create</i>Create new idea
            </a>
          </li>
          <li>
            <a
              role="button"
              tabIndex="0"
              className="collapsible-header allpublic white-text"
              onClick={this.props.handlePublicRevert}
            ><i className="material-icons">create</i>Public Ideas
            </a>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li>
            <div className="nav-wrapper">
              <form onSubmit={this.handleSearch}>
                <div className="input-field">
                  <input
                    value={this.state.search}
                    onChange={this.handleChange}
                    id="search"
                    type="search"
                    placeholder="Search"
                    required
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
                  className="collapsible-header white-text"
                >Filter By Category
                <i className="material-icons right">arrow_drop_down</i>
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        className="collapsible-header"
                        onClick={() => {
                          this.props.handleClickCategory('Agriculture');
                        }}
                      >Agriculture
                      </a>
                    </li>
                    <li>
                      <a
                        type="btn"
                        role="button"
                        tabIndex="0"
                        className="collapsible-header"
                        onClick={() => {
                          this.props.handleClickCategory('Business');
                        }}
                      >Business
                      </a>
                    </li>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        className="collapsible-header"
                        onClick={() => {
                          this.props.handleClickCategory('Education');
                        }}
                      >Education
                      </a>
                    </li>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        className="collapsible-header"
                        onClick={() => {
                          this.props.handleClickCategory('Politics');
                        }}
                      >Politics
                      </a>
                    </li>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        className="collapsible-header"
                        onClick={() => {
                          this.props.handleClickCategory('Religion');
                        }}
                      >Religion
                      </a>
                    </li>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        value="Technology"
                        className="collapsible-header"
                        onClick={() => {
                          this.props.handleClickCategory('Technology');
                          }}
                      >Technology
                      </a>
                    </li>
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
SideNav.propTypes = {
  logOut: PropTypes.func.isRequired,
  handleClickCategory: PropTypes.func.isRequired,
  handlePublicRevert: PropTypes.func.isRequired
};
