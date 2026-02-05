const Product=require('../models/product')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

//Create new product => /api/v1/product/new
exports.newProduct=async(req,res)=>{
    try{
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
     let imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLinks
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
    }
    catch(error){
        res.status(400).json({
            success: false,error:error
        })
    }
}


//Get all products => /api/v1/products
exports.getProducts=async(req,res,next)=>{
    const resPerPage = 8;
    const productsCount = await Product.countDocuments();
    
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

        let product = await apiFeatures.query;
        
        let filteredProductsCount = product.length;

         apiFeatures.pagination(resPerPage);

        setTimeout(() => {
            res.status(200).json({
                success: true,
                product,
                resPerPage,
                productscount:productsCount,
                message: "this route will show all products in database"
            })
        },1000)
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
}



//Get single product details => /api/v1/product/:id
exports.getSingleproduct=async(req,res,next)=>{
    const product =await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    res.status(200).json({
        success: true,
        product
    })
}




//Update product  =>  /api/v1/admin/product/:id
exports.updateProduct=async(req,res,next)=>{
    const product =await Product.findById(req.params.id);
    try{
    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    if(images !==undefined){
        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
        let imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.images = imagesLinks
    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        })

    }
    catch(error){
        res.status(200).json({
            success: false,
            message:error,
        })
    }
}





//Delete a product   =>  /api/v1/admin/product/:id
exports.deleteProduct=async(req,res)=>{
    const product =await Product.findById(req.params.id);
    try{
        if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
        }

        await product.remove();
    }
    catch{
        res.status(200).json({
        success:true,
        product
        })

    }
}



// Create new review   =>   /api/v1/review
exports.createProductReview = async (req, res, next) => {

    const { comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }


    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

}





// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
}




// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
}




// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })

}


// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = async (req, res, next) => {

    const product = await Product.findById(req.query.productId);


    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());


    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
}
