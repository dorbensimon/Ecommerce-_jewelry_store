const express=require('express')
const router=express.Router();
const {neworder,myOrders,getSingleOrder,allOrders,updateOrder,deleteOrder} = require('../controllers/orderControllers')

const {isAuthenticated,authorizeRoles} = require('../middlewares/auth')


router.route('/order/new').post(isAuthenticated,neworder);

router.route('/order/:id').get(isAuthenticated,getSingleOrder);

router.route('/orders/me').get(isAuthenticated,myOrders);

router.route('/admin/orders').get(isAuthenticated,authorizeRoles('admin'),allOrders);

router.route('/admin/order/:id').put(isAuthenticated,authorizeRoles('admin'),updateOrder)
                                .delete(isAuthenticated,authorizeRoles('admin'),deleteOrder)




module.exports= router;


