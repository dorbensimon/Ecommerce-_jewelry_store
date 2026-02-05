
//Here we write down the Schema on how our products will be built
//When a field is mandatory to fill then in that case we mention it as required.
// So here "name" is not required or mandatory field.

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [100, 'Product name cannot exceed 100 characters'],
    required: [true, 'Please enter product name'],
  },
  price:{
    type: Number,
    required: [true, 'Please enter product price'],
    min: 0,
    default: 0.0,
    
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  ratings:{
      type:Number,
      default: 0
  },
  images:[
      {
          public_id:{
              type: String,
              required:true
          },
          url:{
            type: String,
            required:true
        }
      }
  ],
  category:{
    type: String,
    required: [true,'Please select your category'],
    enum:{
        values:[
            'Rings',
            'Necklaces',
            'Watches',
            'Bracelets'
        ],
        message:'Please select correct category from product'
    }
  },
  stock:{
      type: String,
      required:[true,'Please enter product stock'],
      default:0,
      min: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0
},
reviews: [
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }
],
createdAt: {
    type: Date,
    default: Date.now
}
});

const Product=mongoose.model("product",productSchema);

module.exports=Product;