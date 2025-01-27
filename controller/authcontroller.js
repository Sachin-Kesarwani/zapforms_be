const { otpModel } = require("../models/otpModel");
const { userModel } = require("../models/userModel");
const { sendOtpEmail } = require("../services/mail.service");
const { currentTimeInSeconds } = require("../utils");
const jwtService = require("../utils/jwt");



async function signup(req,res){
    const {email,username} = req.body;
    try {
        const newUser = new userModel({email,username})
        await newUser.save()
        const otp = await saveOtpandsendOtp({email , username})
        res.status(200).send({message:"Verification sent" , otp})
    } catch (error) {
        res.status(400).send({message:"Smething wen wrong"})    }
}

async function login(req,res){
    const {email} = req.body;
    try {
        const user = await userModel.findOne({email})
        const {username}  = user;
        const otp = await saveOtpandsendOtp({email , username})
        res.status(200).send({message:"Verification sent" , otp})
    } catch (error) {
        res.status(400).send({message:"Smething wen wrong"})
    }
}
async function saveOtpandsendOtp({email, username}){
    const isExistOtp = await otpModel.findOne({email})
    if(!isExistOtp){
        const otp = await sendOtpEmail(username, email);
        let newotp= new otpModel({email,otp , createdAt:currentTimeInSeconds})
        await  newotp.save()
        return otp
    }else{
        const {otp} = await otpModel.findOne({email});
        await sendOtpEmail(username, email , otp);
        return otp
    }
}
module.exports={signup , login}