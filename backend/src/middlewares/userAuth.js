import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
 export const verifyJwt=async(req,res,next)=>{
    try{
        const token=req.cookies?.token || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(400).json({
                message:"token is missing"
            })
        }
        const decode=jwt.verify(token,process.env.TOKEN);
        if(!decode){
            return res.status(400).json({
                message:"invalid token"
            })
        }
        const user=await User.findById(decode._id);
        req.user=user.toObject();
        next();
    }
    catch(error){
        return res.status(500).json({
                message:"something went wrong in auth middleware",
                error:error.message,
            })
    }
}

