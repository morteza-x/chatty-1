import mongoose from "mongoose";
import { MONGO_URL } from "./config";

let connection: mongoose.Connection | any = null;

const connectDB = async (): Promise<mongoose.Connection> => {
  if (connection) return connection;

  const uri = MONGO_URL;

  try {
    connection = await mongoose.connect(uri);
    
    return connection;

  }catch(err:any) {
    console.log('mongodb connection error!', err?.message || err);
    process.exit(1);
  }
}

export default connectDB;