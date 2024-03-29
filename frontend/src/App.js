import { BrowserRouter as Router, Route } from 'react-router-dom';

//Components
import Header from './components/layout/Headers';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails'
import Login from './components/user/Login'
import Register from './components/user/Register'

//Profile
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
//cart and orders
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'

import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'

//Admins 
import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList'
import NewProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import ProductReviews from './components/admin/ProductReviews'






 

import store from './store';
import {loadUser} from './actions/userActions';


function App() {

  store.dispatch(loadUser())




  return (
    <Router>
      <div className="App">
        <Header />
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home}  />
          <Route path="/product/:id" component={ProductDetails} exact />

          <Route path="/Cart" component={Cart} exact />
          <ProtectedRoute path="/Shipping" component={Shipping} exact />
          <ProtectedRoute path="/order/confirm" component={ConfirmOrder} exact />
          <ProtectedRoute path="/payment" component={Payment} />
          <ProtectedRoute path="/success" component={OrderSuccess} />

          <ProtectedRoute path="/orders/me" component={ListOrders} exact  />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />

        
          <Route path="/login" component={Login}  />
          <Route path="/register" component={Register}  />
          <Route path="/password/forgot" component={ForgotPassword} exact  />
          <Route path="/password/reset/:token" component={NewPassword}  exact />
          <ProtectedRoute path="/me" component={Profile} exact  />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact  />
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact  />

          <ProtectedRoute path="/Dashboard" isAdmin={true} component={Dashboard} exact />
          <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
          <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
          <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
          <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
          <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
          <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
          <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
          <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />








        <Footer />
      </div>
    </Router>
  );
}

export default App;
