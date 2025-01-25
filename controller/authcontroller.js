const { userModel } = require("../models/userModel");
const jwtService = require("../utils/jwt");



async function signup(req,res){
    const {email,username} = req.body;
    try {
        const newUser = new userModel({email,username})
        const userData = await newUser.save()
        console.log(userData , 11)
        const token=await jwtService.signToken(userData.toObject())
        res.status(200).send(token)
    } catch (error) {
        console.log(error)
    }
}

module.exports={signup}