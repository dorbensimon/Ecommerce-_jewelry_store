import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { Watch } from 'react-loader-spinner';

import MetaData from '../layout/MetaData';

import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../../actions/orderActions';

const ListOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',//this is like the id we i have to connect colum and roll base 
          sort: 'asc'
        },
        {
          label: 'Num of Items',
          field: 'numOfItems',
          sort: 'asc'
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc'
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc'
        }
      ],
      rows: []//is the data i want to display
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes('Delivered') ? (
            <p style={{ color: 'green' }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: 'red' }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link> 
        )
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={'My Orders'} />

      <h3 className="MDBDh3">My Orders</h3>

      {loading ? (
        <div id="watchicon">
          <Watch heigth="100" width="100" color="#0078d0" ariaLabel="loading" />
        </div>
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="MDBDataTable"
          bordered
          striped
          hover
        />
      )}
    </Fragment>
  );
};

export default ListOrders;
