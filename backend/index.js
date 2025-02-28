import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from "cors"
import path from "path"

import DB_Connect from './db/db.js';
import userRouter from "./routes/user.route.js"
import chatRouter from "./routes/chat.route.js"

dotenv.config();

const app=express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
    }
))
app.use("/upload", express.static(path.join(process.cwd(), "upload")));

app.use("/user",userRouter)
app.use("/chat",chatRouter)

DB_Connect()

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server running...")
})