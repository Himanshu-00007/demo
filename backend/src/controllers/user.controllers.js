import User from "../models/user.models.js";

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
export  {registerUser};