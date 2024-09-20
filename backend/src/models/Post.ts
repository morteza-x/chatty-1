import { NextFunction } from 'express';
import mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';
import Vote from './Vote';

const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or path to the image
  },
  user: {
    type: Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  votes: [{
    type: Types.ObjectId,
    ref: 'Vote'
  }],

  // virtual field
  // numVotes: {
  //   type: Number,
  //   virtual: true,
  // },

  // numUpVotes: {
  //   type: Number,
  //   virtual: true,
  // },

  // Add timestamps for creation
}, { timestamps: true });

//@ts-ignore
// postSchema.pre('save', async function(next:NextFunction) {
//   //@ts-ignore
//   const post = this;

//   const voteCount = await Vote.countDocuments({post: post._id});
//   post.numVotes = voteCount;

//   const upVotesCount = await Vote.countDocuments({post: post._id, vote: '1'});
//   post.numUpVotes = upVotesCount;

//   next();
// });

export default mongoose.model('Post', postSchema);