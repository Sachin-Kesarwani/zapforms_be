const { userModel } = require("../models/userModel");



function signup(req,res){
    const {email,username} = req.body;
    try {
        const newUser = new userModel({email,username})
        const userData = newUser.save()
        const token=jwtService.signToken(userData)
        res.status(200).send(token)
    } catch (error) {
        
    }
}

module.exports={signup}