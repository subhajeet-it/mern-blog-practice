import {errorHandler} from "./error.js"
import jwt from "jsonwebtoken";
export const verifyToken=(req,res,next)=>{
    const token=req.cookies.accessToken;
    if(!token){
        return next(errorHandler(401,"Unauthorized"))
    }

    jwt.verify(token,process.env.ACCESS_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(403,"Unauthorized"))
        }
        req.user=user;
        next();
    })
}