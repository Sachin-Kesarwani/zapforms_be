
const express= require("express");
const { signup } = require("../controller/authcontroller");
const { signupMiddleware } = require("../middleware/authmiddleware");
const validateRequiredItems = require("../middleware/validateMiddleware");

const authRouter =  express.Router();

authRouter.post("signup",validateRequiredItems(['username', 'email',]) , signupMiddleware , signup)