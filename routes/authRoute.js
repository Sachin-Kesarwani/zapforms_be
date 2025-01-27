
const express= require("express");
const { signup, login } = require("../controller/authcontroller");
const { signupMiddleware, loginMiddleware } = require("../middleware/authmiddleware");
const validateRequiredItems = require("../middleware/validateMiddleware");

let authRouter =  express.Router();
authRouter.get(("/"),(req,res)=>{
res.send("users")
})

authRouter.post("/signup",validateRequiredItems(['username', 'email']) , signupMiddleware , signup)
authRouter.post("/login",validateRequiredItems(['email'])  , loginMiddleware  , login)

module.exports = authRouter