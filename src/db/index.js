import {mongoose} from "mongoose";
import { dbName } from "../constant.js";

const connectDb = async()=>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
    console.log(`\n MongoDB connected !! DB Host`);
    }
      catch (error) {
    console.error("MongoDB connection FAILED",error);
    process.exit(1);
  }
}

export default connectDb;