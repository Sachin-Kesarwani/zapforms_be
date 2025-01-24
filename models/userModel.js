

const mongoose = require('mongoose');

const userSchema=new mongoose.schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    userImage:{
        type:String,
        required:false,
    }
})
const userModel = mongoose.model("users",userSchema)

module.exports={userModel}