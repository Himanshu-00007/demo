import mongoose from "mongoose";

const card=new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    type:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

},{timestamps:true});

const Card=mongoose.model("Card",card);
export default Card;