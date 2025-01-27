const { mongoose } = require("mongoose");



let otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:String,
        required:true,
        unique:true
    },
    createdAt: {
        type: Number,
        required:true,
        // default: () => Math.floor(Date.now() / 1000), // Set default to current time in seconds
      },
})

let otpModel = mongoose.model("otp",otpSchema)

module.exports ={otpModel}