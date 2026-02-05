//Create and send token and save in the cookie

const sendToken=(user,statusCode,res)=>{

    //Create jwt token 
    const token =user.getJwtToken();

    //Options for the cookie
    const options = {
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRES_TIME *24 *60 *60*1000
            ),
            httpOnly:true
    }


    //מקבל את השם של היוזר ושולח לדפדפן את הסטטוס 200 את הטוקן ואת הזמן שהוא תקף
    res.status(statusCode).cookie('token',token, options).json({
        success:true,
        token,
        user
    })
}

module.exports=sendToken;