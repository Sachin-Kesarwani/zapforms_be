const { userModel } = require("../models/userModel");

async function signupMiddleware(req, res , next) {
    const {email=""} = req.body;
    console.log("inside signup signupMiddleware ")
  try {
    const user = await userModel.findOne({ email });
    console.log(user)
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
    console.log(error)
    res.status(400).send({
      message: "Someting went wrong",
    });
  }
}

module.exports={signupMiddleware}