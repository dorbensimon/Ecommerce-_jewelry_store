const app = require('./app')
const dotenv=require('dotenv')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')


//Setting up config file
dotenv.config({path:'backend/config/config.env'})


//Connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})
