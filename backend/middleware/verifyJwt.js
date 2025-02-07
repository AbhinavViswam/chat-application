import jwt from "jsonwebtoken"

import User from "../model/user.model.js"

async function verifyJwt(req,res,next){
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")
    if(!token){
        return res.status(401).json({e:"Token expired or not found"})
    }
    const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET);
    const phone = decodedToken.phone
    const user = await User.findOne({phone})
    if(!user){
        return res.status(404).json({e:"User doesnot exists"})
    }
    req.user = user
    next();
}

export default verifyJwt