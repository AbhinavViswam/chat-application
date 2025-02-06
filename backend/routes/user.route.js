import { userLogin, userRegister } from "../controller/user.controller.js";

import express from "express"

const router = express.Router()

router.route("/login").post(userLogin)

router.route("/register").post(userRegister)

export default router