import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const user=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
    },
    cards:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Card",
        }
        
    ]
},{timestamps:true});
user.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    try{
        this.password=await bcrypt.hash(this.password,10);
        next();
    }
    catch(error){
        return next(error);
    }
    
})
user.methods.checkPassword=async function(password){
    return bcrypt.compare(password,this.password);
}
user.methods.generateToken=async function(){
    return jwt.sign(
        {
        _id:this._id,
        email:this.email,
    },
    process.env.TOKEN,
    {
        expiresIn:process.env.TOKEN_EXPIRY_DATE
    }
  )
}
user.methods.generateRefreshToken=async function(){
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESHTOKEN,
    {
        expiresIn:process.env.REFRESHTOKEN_EXPIRY_DATE
    }
  )
}
const User=mongoose.model("User",user);
export default User;

