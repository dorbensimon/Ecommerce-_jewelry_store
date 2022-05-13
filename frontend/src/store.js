/*where all the data keeps place ,
 where all the things gonna be stores.
 @basically a store is actully a combination of reducers*/
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";


 //import All reducers 
import {productsReducer,productDetailsReducer,newReviewReducer,newProductReducer,productReducer,productReviewsReducer,reviewReducer} from './reducers/productReducers'
import {authReducer,userReducer,forgotPasswordReducer,allUsersReducer,userDetailsReducer} from './reducers/userReducers'
import {cartReducer} from './reducers/cartReducers'
import { newOrderReducer,myOrdersReducer,orderDetailsReducer,allOrdersReducer,orderReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    products:productsReducer,
    ProductDetails:productDetailsReducer,
    newProduct:newProductReducer,
    product: productReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer,
    auth:authReducer,
    user:userReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders:allOrdersReducer,
    orderDetails:orderDetailsReducer,
    order:orderReducer, 
    newReview:newReviewReducer,


})


//the initial state
// contains all the data that we want to put in the state
//and just before loading the application 
let initialState ={
    cart:{
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    shippingInfo: localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {},
        orderInfo: sessionStorage.getItem('orderInfo')
        ? JSON.parse(sessionStorage.getItem('orderInfo'))
        : {}
    }
}

const middleware =[thunk];
//create our store
const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;