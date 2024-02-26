import express, {Request, Response} from 'express'

import User from '../models/user';

import jwt from "jsonwebtoken";

import {check, validationResult}  from "express-validator"
const router= express.Router();



// add some validator usong express-validator
router.post("/register" , [ 
     check("firstName", "First Name is required").isString(),
  check("lastName", "Last Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({min:6})

] , async(req:Request , res:Response)=>{
      const errors= validationResult(req);
       if(!errors.isEmpty()){
         return res.status(400).json({message:errors.array()})
       }
       
      try {
        let user= await User.findOne({
            email:req.body.email,
        })
         
        //if user alredy exists
        if(user){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        // if user not exists
         user= new User(req.body);
         await user.save();
    //  now we need to encrypt the password before saving in database 
    const token =jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string , {
         expiresIn:"1d" // use can change your comfort
    })
     
    res.cookie("auth_token", token, {
         httpOnly:true,
         // if we  in production secure will be true if not secure is false which we want 
         secure:process.env.NODE_ENV==="production",
         maxAge:86400000,
    })
     return res.sendStatus(200).send({message:"User Registered OK"});
      } catch (error) {
        console.log(error); 
        res.status(500).send({message:"Something went wrongng"})
      }
})

export default router;

 