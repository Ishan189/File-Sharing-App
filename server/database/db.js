import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log("Database Connected");
  }
  catch (err) {
    console.log(err)
  }
}

export default connectDB;