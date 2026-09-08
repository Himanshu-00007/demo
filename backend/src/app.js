import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import cardRouter from "./routes/card.routes.js"
const app=express();

app.use(cors({ origin: "http://localhost:3000", credentials: true ,methods:["GET","POST","PUT","PATCH","DELETE"]}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/v1/users",userRouter);
app.use("/api/v1/cards",cardRouter);   
export default app;
