const mongoose = require('mongoose');
const validator = require('validator');

const UserVerificationSchema= new mongoose.Schema({
    userID: String,
    uniquString:String,
    createdAt:Date,
    expiresAt:Date,
})

const UserVerification=mongoose.model("UserVerification",UserVerificationSchema);

module.exports=UserVerification;