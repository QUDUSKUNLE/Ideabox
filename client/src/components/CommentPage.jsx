import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppActions from '../actions/AppActions';
import AppConstants from '../contants/AppConstants';
import AppStore from '../store/AppStore';
import MainIdea from './container/idea/MainIdea';

/**
 * @description - renders CommentPage Component
 * @class CommentPage
 * @extends {React.Component}
 */
export default class CommentPage extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof CommentPage
   */
  constructor(props) {
    super(props);
    this.state = {
      username: JSON.parse(localStorage.getItem('username')),
      idea: {},
      comment: []
    };
    this.handleFetchComment = this.handleFetchComment.bind(this);
    this.handleFetchIdea = this.handleFetchIdea.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof CommentPage
  */
  componentDidMount() {
    AppActions.fetchIdea(this.props.match.params.ideaId);
    AppActions.fetchComment(this.props.match.params.ideaId);
    AppStore.on(AppConstants.FETCH_IDEA, this.handleFetchIdea);
    AppStore.on(AppConstants.FETCH_COMMENT, this.handleFetchComment);
    $('.collapsible').collapsible({
      accordion: false
    });
    $('.button-collapse').sideNav({
      closeOnClick: false,
      draggable: true
    });
    $('.modal').modal();
  }

  /**
  * @method componentWillUnmount
  * @description Removes listener from AppStore
  * @return {void}
  * @memberof CommentPage
  */
  componentWillUnmount() {
    AppStore.removeListener(AppConstants.FETCH_IDEA, this.handleFetchIdea);
    AppStore.removeListener(
      AppConstants.FETCH_COMMENT,
      this.handleFetchComment
    );
  }

  /**
   * @method handleFetchIdea
   * @description class method that handles fetch Idea response
   * @return {void}
   */
  handleFetchIdea() {
    this.setState({
      idea: AppStore.fetchIdea().idea
    });
  }

  /**
   * @method handleFetchComment
   * @description class method that handles fetch Idea response
   * @return {void}
   */
  handleFetchComment() {
    this.setState({
      comment: AppStore.fetchComment().comments
    });
  }

  /**
  * @method handleLogOut
  * @description class method that handles log out event
  * @return {void}
  */
  handleLogOut() {
    localStorage.clear();
    this.props.history.push('/');
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} CommentPage component
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
                >{this.state.username}
                  <i className="material-icons right">
                    arrow_drop_down
                  </i>
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        className="collapsible-header"
                        onClick={this.handleLogOut}
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
              <i className="material-icons">
                home
              </i>Home
            </Link>
          </li>
          <li>
            <Link to="/myideas">
              <i className="material-icons">
                folder
              </i>My Ideas
            </Link>
          </li>
        </ul>
        <a
          href="#"
          data-activates="slide-out"
          className="button-collapse icon_menu"
        ><i className="medium material-icons black-text">
          menu
         </i>
        </a>
        <main>
          <MainIdea
            idea={this.state.idea}
            fetchComment={this.state.comment}
          />
        </main>
      </div>
    );
  }
}

CommentPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

