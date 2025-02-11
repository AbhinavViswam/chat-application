import express from "express"
import verifyJwt from "../middleware/verifyJwt.js";
import { addConversation, sendDoc, sendMessage, showConversations, showMessages } from "../controller/chat.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router()

router.route("/addconversation").post(verifyJwt,addConversation)

router.route("/showconversations").get(verifyJwt,showConversations)

router.route("/sendmessage/:conversationId").post(verifyJwt,sendMessage)

router.route("/senddoc/:conversationId").post(verifyJwt,upload.single('doc'),sendDoc)

router.route("/messages/:conversationId").get(verifyJwt,showMessages)

export default router;