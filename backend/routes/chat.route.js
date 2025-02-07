import express from "express"
import verifyJwt from "../middleware/verifyJwt.js";
import { addConversation, showConversations } from "../controller/chat.controller.js";

const router = express.Router()

router.route("/addconversation").post(verifyJwt,addConversation)

router.route("/showconversations").get(verifyJwt,showConversations)

export default router;