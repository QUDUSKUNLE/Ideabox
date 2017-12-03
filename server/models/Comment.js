import mongoose from 'mongoose';

/**
 * @description This is Comment model
 */
const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    name: String
  },
  idea: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      refs: 'ideas'
    }
  }
});

const Comment = mongoose.model('comment', commentSchema);

export default Comment;
