const express=require('express')
const router=express.Router();

const {getProducts,getSingleproduct,updateProduct,deleteProduct,createProductReview,getProductReviews,deleteReview,getAdminProducts,newProduct} =require('../controllers/productController')

const {isAuthenticated,authorizeRoles}=require('../middlewares/auth')

router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);


router.route('/product/:id').get(getSingleproduct); 

router.route('/admin/product/new').post(isAuthenticated, authorizeRoles('admin'), newProduct);

router.route('/admin/product/:id')
                                .put(isAuthenticated,authorizeRoles('admin'),updateProduct)
                                .delete(isAuthenticated,authorizeRoles('admin'),deleteProduct)


router.route('/review').put(isAuthenticated,createProductReview);
router.route('/reviews').get(isAuthenticated,getProductReviews);
router.route('/reviews').delete(isAuthenticated,deleteReview);




module.exports = router;