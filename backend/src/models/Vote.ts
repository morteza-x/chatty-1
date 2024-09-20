import mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';

const voteSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  vote: {
    type: Number,
    required: true,
    enum: [1, -1], // Upvote (1) or Downvote (-1)
  },
}, { timestamps: true });

export default mongoose.model('Vote', voteSchema);