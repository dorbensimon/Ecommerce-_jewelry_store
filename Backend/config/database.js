//I make sure to connect to Mongo
require('dotenv').config();

const mongoose=require('mongoose');
const connectDatabase=async()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con=>{
        console.log(`MongoDB Database Connect with HOST ${con.connection.host}`);
    })
}

module.exports = connectDatabase
