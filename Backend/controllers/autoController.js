const User=require('../models/user')
const UserVerification=require('../models/UserVerification')
const nodemailer = require('nodemailer')
const {v4 : uuidv4} = require('uuid')
const dotenv=require('dotenv')
const crypto=require('crypto')
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sandemail');
const cloudinary = require('cloudinary');


//Register user
exports.register =async(req,res)=>{

    const {name,email,password}=req.body;

    const userExists = await User.findOne({ email });

    try{
        const user=await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:"products/eahhtj1bkn1k9gjgd3hn",
                url:"https://res.cloudinary.com/bookit/image/upload/v1606233125/products/eahhtj1bkn1k9gjgd3hn.jpg"
            }
        })

        sendToken(user,200,res)
        //מקבל את זה מה jwtoken 
    }
    catch(error){
        if(userExists){
            res.status(201).json({
                success:false,
                message:"this email is already registered"
            })
        }

        else{
            return res.status(500).json({message:error})
        }
    }
}



//User login   =>  /a[i/v1/login
exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;

    //chack if email and password is entered by user
    if(!email||!password){
        return res.status(400).json({
            success:false,
            message:"The whole field must be required"
        })
    }

    //Finding user in database
    const user=await User.findOne({email:email}).select('+password')

    if(!user){
        return res.status(401).json({//401 unauthenticated user
            success:false,
            message:"Invalid Email or Password"
        }) 
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return res.status(401).json({//401 unauthenticated user
            success:false,
            message:"Invalid Email or Password"
        }) 
    }

    sendToken(user,200,res)

}



//Forgot Password  =>   /api/v1/password/Forgot
exports.forgotPassword = async(req,res,next)=>{

    const user = await User.findOne({ email: req.body.email });

    if(!user){
        return res.status(401).json({//401 unauthenticated user
            success:false,
            message:"User not found with this email"
        }) 
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    //  Create reset password url
    const resetUrl =`${req.protocol}/password/reset/${resetToken}`;

    const message=`your password reset token is as follow:\n\n${resetUrl}\n\n if you have not
    requested this email then ignore it`

    try {
        await sendEmail({
            email: user.email,
            subject:'Shopit password recovery',
            message
        })

        res.status(200).json({
            success: true,
            message:`Email sand to ${user.email}`
            
        })
        
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({ validateBeforeSave: false})

        return res.status(500).json({message:error})
    }
}



//Reset Password  =>   /api/v1/password/reset/:token
exports.resetPassword = async(req,res,next)=>{

    //Hash URL token
    const resetpasswordtoken=crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user=await User.findOne({
        resetpasswordtoken,
        resetPasswordExpire:{$gt:Date.now()}//The date should be greater then the current time 
    })

    if(!user){
        return res.status(400).json({
            message:"Password reset token is invalid or has been expired"
        })
    }

    if(req.body.password !== req.body.confirmPassword){

        return res.status(400).json({
            message:"Password does not match"
        })
    }

    //Setup new password
    user.password = req.body.password;

    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    sendToken(user, 200, res)
}






// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
}







// Update / Change password   =>  /api/v1/password/update
exports.updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if (!isMatched) {
        return res.status(400).json({
            message:"Old password is incorrect"
        })
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

}






// Update user profile   =>   /api/v1/me/update
exports.updateProfile = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    //update avatar : TODO

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        user,
        success: true
    })
}





//logout user   =>   /api/v1/logout
exports.logout=async(req,res)=>{

    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logged out"
    })
}









// Admin Controller

// Get all users   =>   /api/v1/admin/users
exports.allUsers = async (req, res, next) => {
    try{
        const users = await User.find();
    
        res.status(200).json({
            success: true,
            users
        })
    }
    catch(error){
        return res.status(401).json({//401 unauthenticated user
            success:false,
            message: error
        }) 
    }
}






// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        if(user){
            res.status(200).json({
                success: true,
                user
            })
        }
        else{
            return res.status(401).json({//401 unauthenticated user
                success:false,
                message: `User does not found with id: ${req.params.id}`
            }) 
        }
    }
    catch(error){
        return res.status(401).json({//401 unauthenticated user
            success:false,
            message: `User does not found with id: ${req.params.id}`
        }) 
    }

}





// Update user profile   =>   /api/v1/admin/user/:id
exports.updateUser = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
    
        res.status(200).json({
            success: true
        })
    }
    catch{
        return res.status(401).json({//401 unauthenticated user
            success:false,
            message: `THis email is already in use`
        }) 
    }

}



// Delete user   =>   /api/v1/admin/user/:id
exports.deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(401).json({//401 unauthenticated user
            success:false,
            message: `User does not found with id: ${req.params.id}`
        }) 
    }



    await user.remove();

    res.status(200).json({
        success: true,
    })
}