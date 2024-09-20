import dotenv from 'dotenv'
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const MONGO_URL = process.env.MONGO_URL || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const LIARA_ENDPOINT = process.env.LIARA_ENDPOINT || "";
export const LIARA_BUCKET_NAME = process.env.LIARA_BUCKET_NAME || '';
export const LIARA_ACCESS_KEY = process.env.LIARA_ACCESS_KEY || "";
export const LIARA_SECRET_KEY = process.env.LIARA_SECRET_KEY || '';

export const FRONT_URL = process.env.NODE_ENV === 'development' 
  ? process.env.FRONT_URL_DEV || '' : process.env.FRONT_URL_PRO || '';

export const MORALIS_API_KEY = process.env.MORALIS_API_KEY || '';

export const EMAIL_USER = process.env.EMAIL_USER || '';
export const APP_PASSWORD = process.env.APP_PASSWORD || '';