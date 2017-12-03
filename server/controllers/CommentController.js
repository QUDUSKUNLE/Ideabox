import capitalize from 'capitalize';
import dotenv from 'dotenv';
import Comment from '../models/Comment';

dotenv.config();

/**
 * @class CommentController
 */
class CommentController {
  /**
   * create comment
   * Routes: POST: /api/v1/users/comments
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void} json server response
   * @memberOf CommentController
   */
  static writeComment(req, res) {
    if (req.body.comment === undefined) {
      return res.status(400).send({
        error: 'Comment is not provided',
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
        return res.status(500).send({
          success: false,
          error: 'Internal server error'
        });
      }
      // return new comment
      return res.status(201).send({
        success: true,
        message: 'Success',
        createdComment
      });
    });
  }

  /**
   * Routes: PUT: /api/v1/users/comments/:commentId
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void} json server response
   * @memberOf CommentController
   */
  static editComment(req, res) {
    if ((req.body.comment === undefined)) {
      return res.status(400).send({
        error: 'Comment is undefined',
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
          return res.status(200).send({
            message: 'Success',
            success: true
          });
        }
        return res.status(404).send({
          success: false,
          error: 'Comment not Found'
        });
      })
      .catch(() => res.status(500).send({ error: 'Internal server error' }));
  }

  /**
   * Routes: DELETE: /api/v1/users/comments/:commentId
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberOf CommentController
   */
  static deleteComment(req, res) {
    const { commentId } = req.params;
    // Find byId and delete
    Comment.findByIdAndRemove(commentId, (err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Success', success: true });
    });
  }
}

export default CommentController;
