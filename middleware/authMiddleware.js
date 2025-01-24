function signupMiddleware(res, res) {
    const {email=""} = req.body;
  try {
    const user = userModel.findOne({ email });
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

module.exports={signupMiddleware}