import mongoose from 'mongoose';

/**
 * @description This is Idea model
 */
const ideaSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: Array, required: true },
  access: { type: Array, required: true },
  status: { type: String },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    name: { type: String }
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const Idea = mongoose.model('idea', ideaSchema);

export default Idea;
