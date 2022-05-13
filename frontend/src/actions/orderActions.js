import axios from 'axios'
import * as actionTypes from '../constants/orderConstants';


export const createOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({ type: actionTypes.CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/order/new', order, config)
        console.log(data);

        dispatch({
            type: actionTypes.CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get curretly logged in user orders
export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.MY_ORDERS_REQUEST });

        const { data } = await axios.get('/api/v1/orders/me')

        dispatch({
            type: actionTypes.MY_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: actionTypes.MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/order/${id}`)

        dispatch({
            type: actionTypes.ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: actionTypes.ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all orders - ADMIN
export const allOrders = () => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.ALL_ORDERS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/orders`)

        dispatch({
            type: actionTypes.ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// update order
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.UPDATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config)

        dispatch({
            type: actionTypes.UPDATE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete order
export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.DELETE_ORDER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)

        dispatch({
            type: actionTypes.DELETE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: actionTypes.CLEAR_ERRORS
    })
}