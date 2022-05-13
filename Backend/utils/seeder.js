const Product = require('../models/product')
const dotenv=require('dotenv');
const connectDatabase = require('../config/database')

const products=require('../data/products.json')

//Setting dotenv file
dotenv.config({path:'backend/config/config.env'})

connectDatabase();

const seedProducts=async()=>{
    try{
        //Deletes all data (if any) in this mongoose
        await Product.deleteMany();
        console.log("products are deleted successfully")

        //Inserts all new data
        await Product.insertMany(products)
        console.log('All products are added successfully')
    }
    catch(error){
        console.log(error.message);
         // terminate the process using process.exit(1) to kill the program To exit with a 'failure' code:.
        process.exit();
    }
}

seedProducts()