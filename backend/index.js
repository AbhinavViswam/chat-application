import express from 'express'
import dotenv from 'dotenv'

import DB_Connect from './db/db.js';

dotenv.config();

const app=express();
DB_Connect()

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server running...")
})