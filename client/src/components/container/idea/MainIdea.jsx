import React from 'react';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import AppActions from '../../../actions/AppActions';
import AppConstants from '../../../contants/AppConstants';
import AppStore from '../../../store/AppStore';
import Comment from '../../container/comment/Comment';

/**
 * @description - renders MainIdea Component
 * @class MainIdea
 * @extends {React.Component}
 */
export default class MainIdea extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof MainIdea
   */
  constructor(props) {
    super(props);
    this.state = { comment: '', fetchComment: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof MainIdea
  */
  componentDidMount() {
    AppStore.on(AppConstants.CREATE_COMMENT, this.commentResponse);
  }

  /**
  * @method componentWillReceiveProps
  * @description This listening to event in the AppStore
  * @param {object} nextProps
  * @return {void}
  * @memberof MainIdea
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchComment[0] !== undefined) {
      this.setState({ fetchComment: nextProps.fetchComment });
    }
  }

  /**
  * @method componentWillUnmount
  * @description Removes listener from AppStore
  * @return {void}
  * @memberof MainIdea
  */
  componentWillUnmount() {
    AppStore.removeListener(AppConstants.CREATE_COMMENT, this.commentResponse);
  }

  /**
  * @method handleChange
  * @description class method that binds comment input to form field
  * @return {void}
  * @param {event} event
  */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
  * @method handleComment
  * @description class method that sends comments
  * @return {void}
  * @param {event} event
  */
  handleComment(event) {
    event.preventDefault();
    const commentDetails = {
      ideaId: this.props.idea._id,
      comment: this.state.comment
    };
    AppActions.sendComment(commentDetails);
    this.setState({ comment: '' });
  }

  /**
  * @method commentResponse
  * @description class method that comments response
  * @return {void}
  */
  commentResponse() {
    Materialize.toast(AppStore.createComment().message, 2000, 'rounded green');
    AppActions.fetchComment(AppStore.createComment().createdComment.idea.id);
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {Object} MainIdea component
  */
  render() {
    return (
      <div className="container">
        <ul className="collapsible popout" data-collapsible="accordion">
          <li>
            <div className="collapsible-header black-text">
              <i className="material-icons">
                subtitles
              </i>{this.props.idea.title}
            </div>
            <div className="collapsible-body white-text comment_header">
              {this.props.idea.description === undefined
                ? <span>{this.props.idea.description}</span>
                : <span>{compiler(this.props.idea.description)}</span>}
            </div>
          </li>
          <li>
            <div className="collapsible-header active black-text">
              <i className="material-icons">
                comment
              </i>
            </div>
            <div className="collapsible-body black-text comment">
              <div className="messageBody">
                <div className="row">
                  <Comment
                    fetchComment={this.state.fetchComment}
                  />
                </div>
              </div>
              <form
                className="col s12"
                onSubmit={this.handleComment}
              >
                <div className="row">
                  <div className="input-field commentForm">
                    <input
                      name="comment"
                      value={this.state.comment}
                      onChange={this.handleChange}
                      id="comment"
                      type="text"
                      required
                    />
                    <label
                      htmlFor="comment"
                    >Comment
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
MainIdea.propTypes = {
  idea: PropTypes.object.isRequired,
  fetchComment: PropTypes.array.isRequired
};
