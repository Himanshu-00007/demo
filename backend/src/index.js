import app from "./app.js";
import connectDb from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({path:"./.env"});

const port=process.env.PORT;

connectDb()
.then(()=>{
    app.listen(port,()=>{
        console.log("server is running");
    });
    
})
.catch((error)=>{
    console.error("server is not listening",error.message);
})