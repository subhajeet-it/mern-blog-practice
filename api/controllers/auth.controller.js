import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup=async(req,res,next)=>{
    
    const {username,email,password}=req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
       next(errorHandler(400,"All fields are required"))
    }

    const hashPassword=await bcryptjs.hash(password,10);
    const user=new User({username,email,password:hashPassword});

    try{
        await user.save()
        res.json('Signup successfully')
    }catch(error){
       next(error)
    }

}

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password || email==='' || password===''){
      return   next(errorHandler(400,"All fields are required"))
     }

    try{
        const user=await User.findOne({email});
        if(!user){
           return  next(errorHandler(400,"User not found"))
        }

        const matchPassword=await bcryptjs.compare(password,user.password);
        if(!matchPassword){
           return  next(errorHandler(400,"Invalid credentials"))
        }
        
        const token=jwt.sign({id:user._id},process.env.ACCESS_SECRET)
        const {password:pass,...rest}=user._doc;
            res.status(200).cookie("accessToken",token,{httpOnly:true}).json(rest);
    }catch(error){
        next(error)
    }
}

export const google=async(req,res,next)=>{
    const {name,email,photoURL}=req.body;
    try{
        const user=await User.findOne({email});
        if(user){
            const token=jwt.sign({id:user._id},process.env.ACCESS_SECRET)
            const {password:pass,...rest}=user._doc;
            res.status(200).cookie("accessToken",token,{httpOnly:true}).json(rest);
        }else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: photoURL
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.ACCESS_SECRET);
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
        }
    }catch(error){
        next(error)
    }
}