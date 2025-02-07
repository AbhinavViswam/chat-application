import Conversation from "../model/conversation.model.js";
import User from "../model/user.model.js"

export const addConversation = async(req,res)=>{
    const {phone} = req.body
    if(!phone){
        return res.status(400).json({e:"All fields are required"})
    }
    const user_r = await User.findOne({phone})
    if(!user_r){
        return res.status(404).json({e:"User not found"})
    }
    if(phone==req.user.phone){
        return res.status(400).json({e:"Cannot add your own number"})
    }
    const converstaionExists = await Conversation.findOne({
        users:{$all:[req.user._id ,user_r._id]}
    })
    if(converstaionExists){
        return res.status(400).json({e:"conversation already exists"})
    }
    const conversation = new Conversation({users:[req.user._id,user_r._id]})
    await conversation.save();
    return res.status(200).json({m:"added new contact"})
}

export const showConversations = async(req,res)=>{
    const conversations = await Conversation.aggregate([
        {
            $match:{
                users:req.user._id
            }
        },
        {
            $addFields: {
              partner: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$users",
                      cond: { $ne: ["$$this", req.user._id] },
                    },
                  },
                  0,
                ],
              },
            },
          },
       
          {
            $lookup: {
              from: "users",         
              localField: "partner", 
              foreignField: "_id",
              as: "chatDetails",
            },
          },
        {
            $unwind:"$chatDetails"
        },
        {
            $project:{
                fullname:"$chatDetails.fullname",
                userid:"$chatDetails._id",
                _id:1
            }
        }
    ])
    return res.status(200).json({m:"showing result",conversations})
}