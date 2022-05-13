import axios from 'axios'
import * as actionTypes from '../constants/productConstants';


export const getProducts=(keyword='', currentPage=1,price,category)=>async(dispatch)=>{
    try {
        dispatch({
            type: actionTypes.ALL_PRODUCTS_REQUEST,
        })

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`

        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
        }

        const {data} =await axios.get(link)

        dispatch({
            type: actionTypes.ALL_PRODUCTS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:actionTypes.ALL_PRODUCTS_FAIL,
            payload:error.response.data.message
        });
    }
}
export const getProductDetails = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type: actionTypes.PRODUCT_DETAILS_REQUEST,
        })

        const {data} =await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: actionTypes.PRODUCT_DETAILS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:actionTypes.PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        });
    }
}
export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type:  actionTypes.NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/review`, reviewData, config)

        dispatch({
            type:  actionTypes.NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type:  actionTypes.NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getAdminProducts = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type: actionTypes.ADMIN_PRODUCTS_REQUEST,
        })

        const {data} =await axios.get(`/api/v1/admin/products`)

        dispatch({
            type: actionTypes.ADMIN_PRODUCTS_SUCCESS,
            payload:data.products
        })

    } catch (error) {
        dispatch({
            type:actionTypes.ADMIN_PRODUCTS_FAIL,
            payload:error.response.data.message
        });
    }
}
export const newProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config)

        dispatch({
            type: actionTypes.NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`)

        dispatch({
            type: actionTypes.DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
// Update Product (ADMIN)
export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config)

        dispatch({
            type: actionTypes.UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
// Get product reviews
export const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`)

        dispatch({
            type: actionTypes.GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: actionTypes.GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`)

        dispatch({
            type: actionTypes.DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        console.log(error.response);

        dispatch({
            type: actionTypes.DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}
//clear Errors
export const clearErrors = async (dispatch) => {
    dispatch({
        type: actionTypes.CLEAR_ERRORS,
    })
}