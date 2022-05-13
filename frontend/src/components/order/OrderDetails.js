import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { Watch } from 'react-loader-spinner';

import MetaData from '../layout/MetaData';

import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../actions/orderActions';

const OrderDetails = ({ match }) => {
  const dispatch = useDispatch();

  const {loading,error,order = {}} = useSelector((state) => state.orderDetails);
  const {shippingInfo,orderItems,paymentInfo,user,totalPrice,orderStatus} = order;

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));

  }, [dispatch, error, match.params.id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === 'succeeded' ? true : false;

  return (
    <Fragment>
      <MetaData title={'Order Details'} />

      {loading ? (
        <div id="watchicon">
          <Watch heigth="100" width="100" color="#0078d0" ariaLabel="loading" />
        </div>
      ) : (
        <Fragment>
          <div className="row p-5 d-flex justify-content-between ">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h3 className="my-2 ">Order # {order._id}</h3>
              <hr />

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {shippingDetails}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? 'greenColor' : 'redColor'}>
                <b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  order.orderStatus &&
                  String(order.orderStatus).includes('Delivered')
                    ? 'greenColor'
                    : 'redColor'
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div key={item.product} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <p>
                          {item.name}
                          </p>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
