const jwt = require('jsonwebtoken');
const User = require('../models/user');


//Chacks if user is authenticated or not 
exports.isAuthenticated = async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return res.status(401).json({
            success:false,
            message:'login first to access this resource'
        })
    }

    const decode=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decode.id)
 
    next()
}


//Hndling users roles
exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            //אני מקבל מהראוטים את התפקיד ואם התפקיד לא כולל את התפקיד שרשום ליוזר אז...
           return res.status(401).json({
                success:false,
                message:`Role ${req.user.role} is not allowed to access this resource`
            })
        }
        next()
    }
}