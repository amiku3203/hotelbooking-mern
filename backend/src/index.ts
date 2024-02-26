import express , { Request , Response}  from 'express';

import cors from 'cors' ;

import "dotenv/config" ;

import userRoute from "./routes/user"

import authRoute from "./routes/auth"

import mongoose from 'mongoose'

import cookieParser from "cookie-parser"
import path from 'path';

// it will try to connect if it successfuly connection no eror comes otherwise it will throw ans error and our server will crashed
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express();
app.use(cookieParser());
app.use(express.json());


app.use(express.urlencoded({extended:true}));


app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials :true

} ));


app.use(express.static(path.join(__dirname,"../../frontend/dist")))


// its prefix our request 
 app.use("/api/auth", authRoute)
 app.use("/api/users",userRoute )
 // for checking api we always use postman but here a alternative in vs code is thuunder client which is super easy to use 

app.listen(7000, ()=>{
     console.log("listening on 7000");
})