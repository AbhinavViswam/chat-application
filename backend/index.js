import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import DB_Connect from './db/db.js';
import userRouter from "./routes/user.route.js"

dotenv.config();

const app=express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use("/user",userRouter)

DB_Connect()

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server running...")
})