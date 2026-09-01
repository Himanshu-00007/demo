import User from "../models/user.models.js";


const generateTokenAndRefreshToken=async(id)=>{
    try{
        const user=await User.findById(id);
        if(!user){
            return res.status(400).json({
            message:"user does not exist"
            })
        }
        const token=await user.generateToken();
        const refreshToken=await user.generateRefreshToken();
        await user.save({validateBeforeSave:true});
        return {token,refreshToken};
        
    }
    catch(error){
        console.error(error.message);
        throw new Error("something went wrong while generating tokens and refresh tokens",error);
    }
}
const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name?.trim()){
            return res.status(400).json({
            message:"name is required"
            })
        }
        if(!email?.trim()){
            return res.status(400).json({
            message:"email is required"
            })
        }
        if(!password?.trim()){
            return res.status(400).json({
            message:"password is required"
            })
        }
        const checkUser=await User.findOne({email});
        if(checkUser){
            return res.status(400).json({
            message:"user already exists"
            })
        }
        const user=new User({
            name:name,
            email:email,
            password:password
        });
        await user.save();
        return res.status(200).json({
            user,
            message:"user registered successfully"
            })
    
    }
    catch(error){
        return res.status(501).json({
            message:"something went wrong in registerUser",
            error:error.message,
        })
    }
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const checkUser=await User.findOne({email});
        if(!checkUser){
            return res.status(400).json({
            message:"no user found",
          })
        }
        if(!checkUser.checkPassword(password)){
            return res.status(400).json({
            message:"invalid password",
          })
        }
        const user=await User.findById(checkUser._id).select("-password");
        const {token,refreshToken}=await generateTokenAndRefreshToken(user._id);
        const options={httpOnly:true,secure:true};
        return res.status(200)
        .cookie("token",token,options)
        .cookie("refreshToken",refreshToken,options)
        .json({
            user,
            message:"user login successfully"
        });

    }
    catch(error){
        return res.status(501).json({
            message:"something went wrong while LOGIN",
            error:error.message,
        })
    }
}
const logoutUser=async(req,res)=>{
    try{
        await User.findByIdAndUpdate(req.user._id,{
            $unset:{
                refreshToken:1,
            }
        },
        {new:true},
       );
       const options={httpOnly:true,secure:true};
       return res.status(200)
       .clearCookie("token",options)
       .clearCookie("refreshToken",options)
       .json({
        message:"user logout successfully"
       })
    }
    catch(error){
        return res.status(501).json({
            message:"something went wrong while LOGOUT",
            error:error.message,
        })
    }
}
export  {registerUser,loginUser,logoutUser};