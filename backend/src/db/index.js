import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        const connection=await mongoose.connect(process.env.MONGO_URL);

    }
    catch(error){
        console.error("error in establishing db connection",error.message);
        process.exit(1);
    }
}
export default connectDb;