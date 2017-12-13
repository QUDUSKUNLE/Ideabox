
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Comment = ({ fetchComment }) => {
  if (fetchComment[0] !== undefined) {
    return fetchComment.map(comment =>
      (
        <div className="col s12 m12" key={comment._id}>
          <div className="card">
            <div className="card-action">
              <div><small>{comment.author.name}</small>
                <small className="right">
                  {moment(comment.createdAt).format('llll')}
                </small>
              </div>
              <p>{comment.comment}</p>
            </div>
          </div>
        </div>
      ));
  }
  return true;
};

Comment.propTypes = {
  fetchComment: PropTypes.array.isRequired
};
export default Comment;
