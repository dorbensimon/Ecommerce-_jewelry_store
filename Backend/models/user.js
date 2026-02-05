const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        require:[true,'please enter your name'],
        maxlength:[30,'your name cannot exceed 30 characters']
    },
    email:{
        type: String,
        require:[true,'please enter your email'],
        unique: true,
        validate:[validator.isEmail,'please enter a valid email']
    },
    password:{
        type: String,
        require:[true,'please enter your password'],
        minlength:[6,'your password must be at least 6 characters'],
        select:false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    verified : Boolean,
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,


})

//Encrypring password before saving user
userSchema.pre('save',async function(next){//pre will mining do somnthing before you save the schema
    if(!this.isModified('password')){//ill be true whenever 'password' gets modified שונה
        next();
    }

    this.password=await bcrypt.hash(this.password,10)
})

//Compare user password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)

}

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {//Stores the user ID Stores the id in the payload in the token
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}



// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex'); //הטוקן הוא בשביל לאמת את הזהות אחרי שהתחברת למשתמש והוא נמצא בעוגיות 

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    console.log(resetToken);
    return resetToken

}
const User=mongoose.model("User",userSchema);

module.exports=User;