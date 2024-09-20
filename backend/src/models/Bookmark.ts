import mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';

const bookmarkSchema = new Schema({
  // user who notification is going to
  jsonData: {
    type: String,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
  }
  
}, {timestamps: true});

export default mongoose.model('Bookmark', bookmarkSchema);