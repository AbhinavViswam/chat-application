import Conversation from "../model/conversation.model.js";
import User from "../model/user.model.js"
import Message from "../model/message.model.js";

import mongoose from "mongoose";

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

export const sendMessage = async(req,res)=>{
  const {text} = req.body
  const {conversationId} = req.params
  const userid = req.user._id
  if(!text){
    return res.status(400).json({e:"Message cannot be empty"})
  }
  if(!conversationId){
    return res.status(400).json({e:"Cannot find conversationID"})
  }
  const conversation = await Conversation.findById(conversationId)
  if(!conversation){
    return res.status(404).json({e:"Conversation does not exists"})
  }
  const message = new Message({
    conversationid:conversation._id,
    sender:userid,
    text:text
  })
  await message.save();
  return res.status(200).json({m:"Message Sent Successfully",message})
}

export const sendDoc = async(req,res)=>{
  const doc = req.file.path.replace(/\\/g, "/");
  const {conversationId} = req.params;
  if(!conversationId){
    return res.status(400).json({e:"Cannot find conversationID"})
  }
  const conversation = await Conversation.findById(conversationId)
  if(!conversation){
    return res.status(404).json({e:"Conversation does not exists"})
  }
  const message = new Message({
    conversationid:conversation._id,
    sender:req.user._id,
    doc
  })
  await message.save();
  return res.status(200).json({m:"Sent successfull",message})
}

export const showMessages = async(req,res)=>{
  const {conversationId} = req.params
  if(!conversationId){
    return res.status(400).json({e:"All fields are required"})
  }
  const conversation = await Conversation.findById(conversationId)
  if(!conversation){
    return res.status(404).json({e:"Conversation not found"})
  }
  const messages = await Message.aggregate([
    {
      $match:{
        conversationid:new mongoose.Types.ObjectId(conversationId)
      }
    },
    {
      $lookup:{
        from:"users",
        localField:"sender",
        foreignField:"_id",
        as:"senderDetails"
      }
    },
    {$unwind:"$senderDetails"},
    {
      $project:{
        fullname:"$senderDetails.fullname",
        doc:1,
        text:1
      }
    }
  ])
  return res.status(200).json({m:"fetched",messages})
}