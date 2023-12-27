import dotenv from "dotenv"; //this syntax is not good for code consistency.
import mongoose from "mongoose";
import { dbName } from "./constant.js";
import connectDb from  "./db/index.js"
import { app } from "./app.js";


dotenv.config({
    path: "./env"
})

connectDb()
.then(()=>{
     app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at ${process.env.PORT}`);
     })
}).catch((err)=>{
  console.error("MONGODB connection Failed!",err);
})





















// first approach to connect mongdb
/*
import {express} from "express";
const app = express();

;(async()=>{
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
    app.on("error",()=>{
        console.log(error);
        throw error;
    });

    app.listen(process.env.port,()=>{
        console.log(`Server is running on port ${process.env.port}`);
    })
  } catch (error) {
    console.error("ERROR",error);
  } 
})()
*/