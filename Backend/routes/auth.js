const express=require('express')
const router=express.Router();

const {register,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser}=require('../controllers/autoController');

const {isAuthenticated,authorizeRoles} = require('../middlewares/auth')

router.route('/register').post(register);

router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticated,getUserProfile);

router.route('/password/update').put(isAuthenticated,updatePassword);

router.route('/me/update').put(isAuthenticated,updateProfile);

router.route('/logout').get(logout);

//Admin routes

router.route('/admin/users').get(isAuthenticated,authorizeRoles('admin'),allUsers);
router.route('/admin/user/:id')
                            .get(isAuthenticated,authorizeRoles('admin'),getUserDetails)
                            .put(isAuthenticated,authorizeRoles('admin'),updateUser)
                            .delete(isAuthenticated,authorizeRoles('admin'),deleteUser)


module.exports=router;