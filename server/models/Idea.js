import mongoose from 'mongoose';

/**
 * @description This is Idea model
 */
const ideaSchema = new mongoose.Schema({
  title: { type: String, require: true, unique: true },
  description: { type: String, require: true },
  categories: { type: Array, required: true },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    username: String
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const Idea = mongoose.model('idea', ideaSchema);

export default Idea;
