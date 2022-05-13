import React, { Fragment, useEffect, useState } from 'react';

import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';


import { useDispatch, useSelector } from 'react-redux';
import { createOrder, clearErrors } from '../../actions/orderActions';

const options = {
  style: {
    base: {
      fontSize: '16px'
    },
    invalid: {
      color: '#9e2146'
    }
  }
};

const Payment = ({ history }) => {

  const [cardname, setcardname] = useState('');
  const [cardnumber, setcardnumber] = useState('');
  const [cardexpires, setcardexpires] = useState('');
  const [cvv, setcvv] = useState('');

  const dispatch = useDispatch();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const paymentInfo = {
    cardname,
    cardnumber,
    cardexpires,
    cvv
  }

  const order = {
    orderItems: cartItems,//מוצרים
    shippingInfo,
    paymentInfo//כתובת מדינה וזה
  };
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (orderInfo) {
      order.itemsPrice = orderInfo.itemsPrice
      order.shippingPrice = orderInfo.shippingPrice
      order.taxPrice = orderInfo.taxPrice
      order.totalPrice = orderInfo.totalPrice
  }


  const submitHandler=(e)=>{
    if(paymentInfo){
        e.preventDefault();

        dispatch(createOrder(order))
        history.push('/success')    
    }
  }


  return (
    <Fragment>
      <MetaData title={'Payment'} />

      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-3">
          <form className="shadow-lg justify-content-center align-items-center" onSubmit={submitHandler}>
            <h3 className="mb-3">Card Info</h3>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Name</label>
              <input
                onChange={(event) => setcardname(event.target.value)}
                type="text"
                id="card_name_field"
                className="form-control"
                options={options}
              />
            </div>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <input
                onChange={(event) => setcardnumber(event.target.value)}
                maxLength="16"
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <input
                onChange={(event) => setcardexpires(event.target.value)}
                type="text"
                maxLength="4"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <input
                onChange={(event) => setcvv(event.target.value)}
                maxLength="3"
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>
            <div className="mt-2">
              <Cards
                cvc={cvv}
                expiry={cardexpires}
                name={cardname}
                number={cardnumber}
              />
            </div>

            <button
              id="pay_btn"
              type="submit"
              className="btn update-btn btn-block mt-2 mb-1"
            >
              Pay
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
