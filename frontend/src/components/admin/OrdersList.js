import React, { Fragment, useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { Watch } from  'react-loader-spinner'
import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@mui/material'


import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { allOrders,clearErrors,deleteOrder } from '../../actions/orderActions'
import {DELETE_ORDER_RESET} from '../../constants/orderConstants'

const OrdersList = ({history}) => {
    
    const dispatch = useDispatch();

    const [open,setopen]= useState(false)


    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            dispatch(clearErrors())
        }

        if(isDeleted){
            history.push('/admin/orders');
            dispatch({type : DELETE_ORDER_RESET})
        }


    }, [dispatch, error,isDeleted,history])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    } 

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numberofitems',
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
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numberofitems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status:
                order.orderStatus &&
                String(order.orderStatus).includes('Delivered') ? (
                  <p style={{ color: 'green' }}>{order.orderStatus}</p>
                ) : (
                  <p style={{ color: 'red' }}>{order.orderStatus}</p>
                ),
                actions: <Fragment>
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <Button className="btn btn-danger py-1 px-2 ml-2" onClick={() =>setopen(true)}>
                        <i className="fa fa-trash"></i>
                    </Button>

                    <Dialog aria-labelledby="dialog-title" aria-describedby="dialog-discription" open={open} 
                    onClose={()=>setopen(false)}>
                        <DialogTitle id="dialog-title">Delete Order ?</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="dialog-discription">Are you sure you want to delete the order from the repository ? </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>setopen(false)}>Cancel</Button>
                            <Button onClick={() =>{setopen(false) ; deleteOrderHandler(order._id)}} autoFocus>Submit</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>
            })
        })

        return data;
    }

  return (
    <Fragment>
    <MetaData title={'All Orders'} />
    <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>

        <div className="col-12 col-md-10 mt-5">
            <Fragment>
                <h4 className="my-5">All Orders</h4>
                
                {loading ? 
                      <div id="watchicon">
                      <Watch
                      heigth="100"
                      width="100"
                      color='#0078d0'
                      ariaLabel='loading'
                    />
                    </div>: (
                    <MDBDataTable
                        data={setOrders()}
                        className="MDBDataTable"
                        bordered
                        striped
                        hover
                    />
                )}

            </Fragment>
        </div>
    </div>

</Fragment>
  )
}

export default OrdersList