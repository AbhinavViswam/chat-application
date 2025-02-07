import { chats, userLogin, userRegister } from "../controller/user.controller.js";
import verifyJwt from "../middleware/verifyJwt.js";

import express from "express"

const router = express.Router()

router.route("/login").post(userLogin)

router.route("/register").post(userRegister)

router.route("/chats").get(verifyJwt,chats)

export default router