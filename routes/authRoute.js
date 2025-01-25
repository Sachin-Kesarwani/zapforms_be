
const express= require("express");
const { signup } = require("../controller/authcontroller");
const { signupMiddleware } = require("../middleware/authmiddleware");
const validateRequiredItems = require("../middleware/validateMiddleware");

let authRouter =  express.Router();
authRouter.get(("/"),(req,res)=>{
res.send("users")
})

authRouter.post("/signup",validateRequiredItems(['username', 'email']) , signupMiddleware , signup)
// authRouter.post("/signup",(req, res)=>{
//     console.log(res)
//     res.status(200).send("sucees")
// })

module.exports = authRouter