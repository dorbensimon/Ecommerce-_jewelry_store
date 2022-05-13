import { React, Fragment } from 'react';
import {Link} from 'react-router-dom';
import { IoDiamondSharp} from "react-icons/io5";
import { BsBag} from "react-icons/bs";
import {Route} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../actions/userActions'

import Search from '../layout/Search'



import '../../App.css'

const Headers = () => {
  const dispatch = useDispatch();

  const{user,loading} = useSelector((state) => state.auth)
  const { cartItems } = useSelector(state => state.cart)


  const logoutHandler = ()=>{
    dispatch(logout())
  }

  return (
    <Fragment>
      <nav className='navbar fixed-top navbar-expand-sm navbar-dark '>
        <div className="col-xl-5 col-lg-5 col-md-3 col-sm-3 col-3">
          <Link className="Link" to='/'>
          <div className="navbar-brand">
            <IoDiamondSharp style={{color:'#D8D8D8'}}/>
           <p>generation jewelry</p>
          </div>
          </Link>
        </div>

        <div className="col-xl-5 col-lg-5 col-md-7 col-sm-7 col-8 mt-2 mt-md-0">
          <Route render={({history})=><Search history={history}/>}/>
        </div>

        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-0 mt-0  text-center">
          {
            cartItems.length > 0 ?(
              <Link to="/cart" style={{ textDecoration: 'none' }} >
              <span id="cart" className=""><BsBag/></span>
              <span className="" id="cart_count">{cartItems.length}</span>
              </Link>
            )
            :(
              <Link to="/cart" style={{ textDecoration: 'none' }} >
              <span id="cart" className=""><BsBag/></span>
              </Link>

            )
          }
            </div>
            
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-0 mt-0  text-center">
              {
                user ? (
                  <div className="ml-4 dropdown d-inline">
                    <Link to="#!" type="button" 
                    className="nameHeader btn dropdown-toggle text-white "
                    id="dropDownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">{user.name}</Link>

                    <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                      <Link to="/me" className="dropdown-item text-muted">
                          Profile
                      </Link>
                      {
                        user && user.role ==='admin' && (
                          <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                          )}
                      <Link className="dropdown-item" to="/orders/me">Orders</Link>
                      <Link to="/" className="dropdown-item text-danger" onClick={logoutHandler}>
                          Logout
                      </Link>

                    </div>
                </div>
                ) 
                : !loading && <Link  to="/login" className="btn" id="login_btn">Sign in</Link>
              }
            </div>

      </nav>

      </Fragment>
  );
};

export default Headers;
