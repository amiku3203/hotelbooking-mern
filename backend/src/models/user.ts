//types of user
import mongoose from 'mongoose'

import bcrypt from 'bcryptjs'
//for make sure all the  filed exist
//now its does not make sense 
export type UserType = {
  _id:string;
  email:string;
  password:string;
  firstname: string;
  lastname:string;
};

//creating Schema for register user
const userSchema=new mongoose.Schema({
    email:{type:String , required:true, unique:true},
    password:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true}
}) 
//befor saving 

userSchema.pre("save" , async function (next)  {
     if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,8)
     }
     next() // run by mongodb
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;