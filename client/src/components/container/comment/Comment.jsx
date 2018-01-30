import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/**
 * @function Comment
 * @description the Comment component.
 * @returns {string} The HTML markup for the Comment component
 */
const Comment = ({ fetchComment }) => {
  if (fetchComment[0] !== undefined) {
    return fetchComment.map(comment =>
      (
        <div className="col s12 m12" key={comment._id}>
          <div className="card">
            <div className="card-action">
              <div><small>{comment.author.name}</small>
                <small className="right">
                  {moment(comment.createdAt).startOf().fromNow()}
                </small>
              </div>
              <p>{comment.comment}</p>
            </div>
          </div>
        </div>
      ));
  }
  return <span />;
};

Comment.propTypes = {
  fetchComment: PropTypes.array.isRequired
};
export default Comment;
