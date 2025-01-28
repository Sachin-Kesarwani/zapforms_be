
const express= require("express");
const { signup, login, verifyOtp } = require("../controller/authcontroller");
const { signupMiddleware, loginMiddleware } = require("../middleware/authmiddleware");
const validateRequiredItems = require("../middleware/validateMiddleware");

let authRouter =  express.Router();
authRouter.post("/signup",validateRequiredItems(['username', 'email']) , signupMiddleware , signup)
authRouter.post("/login",validateRequiredItems(['email'])  , loginMiddleware  , login)
authRouter.post("/verify-otp" ,validateRequiredItems(["otp","email"])  , verifyOtp )
module.exports = authRouter