const { response } = require("express");
const { userModel } = require("../models/userModel");
const jwtService = require("../utils/jwt");

async function signupMiddleware(req, res, next) {
  const { email = "" } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(409).send({
        error: "Conflict",
        message: `The email address ${email} is already registered. Please use a different email address.`,
        field: "email",
      });
    }
    next();
  } catch (error) {
    res.status(400).send({
      message: "Someting went wrong",
    });
  }
}

async function loginMiddleware(req, res, next) {
  const { email = "" } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res
        .status(404)
        .send({
          message: `The email address ${email} is not registered. Please create account`,
        });
    }
    next();
  } catch (error) {
    res.status(400).send({
      message: "Someting went wrong",
    });
  }
}

async function isAuthorizedUser(req, res, next) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const info =await  jwtService.verifyToken(token);
    const { email =""} = info;
    if(email){
      const isUserExist = await userModel.findOne({email})
      if(isUserExist){
        const {_id} = isUserExist
        req.body._id= _id
        next()
      }else{
        res.status(401).send({meassge:"User not authorized 53"})
      }
    }else{
      res.status(401).send({meassge:"User not authorized 56"})
    }
  } catch (error) {
    res.status(400).send({meassge:"Someting went wrong"})
  }
}

module.exports = { signupMiddleware, loginMiddleware, isAuthorizedUser };
