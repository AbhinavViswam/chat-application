import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import User from "../model/user.model.js"

function generateAccessToken(userData){
    const token = jwt.sign(userData,process.env.TOKEN_SECRET)
    return token;
}

export const userRegister = async(req,res)=>{

    const {fullname, email, phone ,password}=req.body
    if(!fullname || !email || !phone || !password){
        return res.status(400).json({e:"All fields are required"})
    }
    const userExistsWithEmail = await User.findOne({email})
    const userExistsWithPhone = await User.findOne({phone})

    if(userExistsWithEmail){
        return res.status(400).json({e:"Email already registered"})
    }
    if(userExistsWithPhone){
        return res.status(400).json({e:"Phone number already registered"})
    }

    const hashedPassword =await bcrypt.hash(password,10);
    const user = new User({
        fullname,
        email,
        phone,
        password:hashedPassword
    })
    await user.save();
    const token = generateAccessToken({fullname,email,phone})
    res.cookie('token',token);
    return res.status(200).json({m:"register Successfull",token})

}

export const userLogin = async(req,res)=>{
    const {emailOrPhone, password} = req.body
    if(!emailOrPhone || !password){
        return res.status(400).json({e:"All fields are required"});
    }
    const user = await User.findOne({
        $or:[
            {email:emailOrPhone},
            {phone:emailOrPhone}
        ]
    })
    if(!user){
        return res.status(404).json({e:"User doesnot exists"})
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        return res.status(401).json({e:"Incorrect Password"})
    }
    const token = generateAccessToken({fullname:user.fullname,email:user.email,phone:user.phone})
    res.cookie('token',token)
    return res.status(200).json({m:"User logged in successfully",token})
}

export const chats = async(req,res)=>{
    const fullname = req.user.fullname
    res.status(200).json({m:`Welcome To Main Page, ${fullname}`})
}