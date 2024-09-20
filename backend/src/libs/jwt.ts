
import jwt from 'jsonwebtoken'
//import bcrypt from 'bcryptjs'
import { JWT_SECRET } from '../config/config';

// generate jwt token
function generateJwt(user: any) {
  const token = jwt.sign({
    email: user.email
  },
  JWT_SECRET,
  {expiresIn: '30d'},
  );
  return token;
}

// decode token
function decodeJwt(token: string) {
  try{
    return jwt.verify(token, JWT_SECRET);
  }catch(err:any) {
    return null;
  }
}

export {generateJwt, decodeJwt};