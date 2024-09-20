import { NextFunction } from 'express';
import mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';
import { io } from '..';

const notificationSchema = new Schema({
  // user who notification is going to
  receiver: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // user who made the notification
  sender: {
    type: Types.ObjectId,
    ref: 'User',
  },

  message: {
    type: String,
  },
  // post: {
  //   type: Types.ObjectId,
  //   ref: 'Post', // Optional reference to the post (if applicable)
  // },
  isRead: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

//@ts-ignore
notificationSchema.pre('save', async function(next:NextFunction) {
  //@ts-ignore
  const notification = this;

  const noti = await notification.populate('receiver sender');
  
  // send socket message
  //@ts-ignore
  io.to(noti.receiver._id.toString()).emit('newNotification', { message: 'You have a new message!', 
    results: noti,

  });

  next();
});

export default mongoose.model('Notification', notificationSchema);
