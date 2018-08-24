import capitalize from 'capitalize';
import Comment from '../models/Comment';


/**
 * @class CommentController
 */
class CommentController {
  /**
   * create comment
   * Routes: POST: /api/v1/users/comments
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void} json server response
   * @memberOf CommentController
   */
  static writeComment(req, res) {
    if (!req.body.comment) {
      return res.status(400).json({
        error: 'Comment must not be empty',
        success: false
      });
    }
    const { ideaId } = req.params;
    const comment = new Comment({
      comment: capitalize(capitalize(req.body.comment.trim())),
      author: {
        id: req.decoded.token.user._id,
        name: req.decoded.token.user.username
      },
      idea: {
        id: ideaId
      }
    });
    comment.save((err, createdComment) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Internal server error'
        });
      }
      // return new comment
      return res.status(201).json({
        success: true,
        message: 'Success',
        createdComment
      });
    });
  }

  /**
   * Routes: PUT: /api/v1/users/comments/:commentId
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void} json server response
   * @memberOf CommentController
   */
  static editComment(req, res) {
    if ((!req.body.comment)) {
      return res.status(400).json({
        error: 'Comment must not be empty',
        success: false
      });
    }
    Comment.findByIdAndUpdate(
      { _id: req.params.commentId },
      {
        $set: {
          comment: capitalize(capitalize(req.body.comment.trim()))
        },
      },
      { new: true }
    )
      .exec((error, comment) => {
        if (comment) {
          return res.status(200).json({
            message: 'Success',
            success: true
          });
        }
        return res.status(404).json({
          success: false,
          error: 'Comment not Found'
        });
      })
      .catch(() => res.status(500).json({ error: 'Internal server error' }));
  }

  /**
   * Routes: GET: /api/v1/users/comments/:ideaId
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf CommentController
   */
  static fetchComment(req, res) {
    const { ideaId } = req.params;
    Comment.find({})
      .where({ 'idea.id': ideaId })
      .exec()
      .then(comments => res.status(200).json({
        comments
      }))
      .catch(error => res.status(500).json({
        error: error.message
      }));
  }

  /**
   * Routes: DELETE: /api/v1/users/comments/:commentId
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void}
   * @memberOf CommentController
   */
  static deleteComment(req, res) {
    const { commentId } = req.params;
    // Find byId and delete
    Comment.findByIdAndRemove(commentId, (err) => {
      if (err) {
        res.json(err);
      }
      res.json({ message: 'Success', success: true });
    });
  }
}

export default CommentController;
