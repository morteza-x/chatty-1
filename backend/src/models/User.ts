import { Schema, model } from 'mongoose';
import { TUser } from '../types/users';

const userSchema = new Schema({
  username: {
    type: String,
    //required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {type: String,},
}, { timestamps: true });

// userSchema.pre('save', async function(next:any) {
//   if (!this.isModified(''))
// });

export default model<TUser>('User', userSchema);