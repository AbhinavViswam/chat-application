import mongoose from 'mongoose'

const DB_Connect=()=>{
    mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch(()=>{
        console.log("Database connection Error...");
    })
}

export default DB_Connect