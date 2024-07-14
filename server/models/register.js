const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
        
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:""
    }

})

const RegisterModel = mongoose.model("Users", RegisterSchema);


module.exports = RegisterModel;