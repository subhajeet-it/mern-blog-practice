import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const signup=async(req,res)=>{
    
    const {username,email,password}=req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
        res.status(400).json("All fields are required")
    }

    const hashPassword=await bcryptjs.hash(password,10);
    const user=new User({username,email,password:hashPassword});

    try{
        await user.save()
        res.json('Signup successfully')
    }catch(error){
        res.status(500).json({message:error.message})
    }

}