const { userModel } = require("../models/userModel");

async function signupMiddleware(req, res , next) {
    const {email=""} = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(409).send({
        error: "Conflict",
        message:
          `The email address ${email} is already registered. Please use a different email address.`,
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


async function loginMiddleware(req, res, next){
  const {email=""} = req.body;
  try {
    const user = await userModel.findOne({ email });
    if(!user){
      res.status(404).send({   message:
        `The email address ${email} is not registered. Please create account`,})
    }
    next()
  } catch (error) {
    res.status(400).send({
      message: "Someting went wrong",
    });
  }
}

module.exports={signupMiddleware , loginMiddleware}