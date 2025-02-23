const { otpModel } = require("../models/otpModel");
const { userModel } = require("../models/userModel");
const { sendOtpEmail } = require("../services/mail.service");
const { currentTimeInSeconds } = require("../utils");
const jwtService = require("../utils/jwt");

async function signup(req, res) {
  const { email, username } = req.body;
  try {
    const newUser = new userModel({ email, username });
    await newUser.save();
    const otp = await saveOtpandsendOtp({ email, username });
    res.status(200).send({ message: "Verification sent", otp });
  } catch (error) {
    res.status(500).send({ message: "Smething wen wrong" });
  }
}

async function login(req, res) {
  const { email  , redirectTo} = req.body;
  try {
    const user = await userModel.findOne({ email });
    const { username } = user;
    const otp = await saveOtpandsendOtp({ email, username , redirectTo });
    res.status(200).send({ message: "Verification sent", otp });
  } catch (error) {
    console.log(error)

    res.status(500).send({ message: "Smething wen wrong" });
  }
}

async function verifyOtp(req, res) {
  const { email, otp } = req.body;
  try {
    const isExist = await otpModel.findOne({ email, otp });
    if (isExist) {
      await otpModel.deleteOne({ email });
      let userData = await userModel
        .findOne(
          { email },
          { username: 1, email: 1, _id: 1 } // Include only username, email, and _id
        )
        .lean(); // Use lean() to get a plain object
      const token = await jwtService.signToken(userData);  
      res.status(200).send({ token, message: "Succesfully otp verified" });
    } else {
      res.status(404).send({ message: "Invalid OTP. Please try again." });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Smething wen wrong" });
  }
}

async function saveOtpandsendOtp({ email, username  , redirectTo}) {
  const isExistOtp = await otpModel.findOne({ email });
  if (!isExistOtp) {
    const otp = await sendOtpEmail({username, email  , redirectTo});
    let newotp = new otpModel({ email, otp, createdAt: currentTimeInSeconds });
    await newotp.save();
    return otp;
  } else {
    const { otp } = await otpModel.findOne({ email });
    await sendOtpEmail({username, email, otp , redirectTo});
    return otp;
  }
}
module.exports = { signup, login, verifyOtp };
