import axios from 'axios'
import * as actionTypes from '../constants/userConstants';


//Login
export const login = (email,password) => async (dispatch) => {
    try {
        dispatch({type: actionTypes.LOGIN_REQUEST})

        const config = {headers: {'Content-type': 'application/json'}};

        const {data} =await axios.post('/api/v1/login',{email,password},config)

        dispatch({type: actionTypes.LOGIN_SUCCESS,payload: data.user})
    } catch (error) {
        dispatch({type:actionTypes.LOGIN_FAIL,payload:error.response.data.message});
    }
}

//Register
export const Register = (userData) => async (dispatch) => {
    try {
        dispatch({type: actionTypes.REGISTER_USER_REQUEST})

        const config = {headers: {'Content-Type': 'multipart/form-data'}}
        const { data } = await axios.post('/api/v1/register', userData, config)
        
        dispatch({type: actionTypes.REGISTER_USER_SUCCESS,payload: data.user})

    } catch (error) {
        dispatch({type:actionTypes.REGISTER_USER_FAIL,payload: error.response.data.message})
    }
}

// Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/v1/me')

        dispatch({type: actionTypes.LOAD_USER_SUCCESS,payload: data.user})
    } catch (error) {
        dispatch({type: actionTypes.LOAD_USER_FAIL,payload: error.response.data.message})
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {

        await axios.get('/api/v1/logout')

        dispatch({
            type: actionTypes.LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: actionTypes.LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}


// Update profile
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put('/api/v1/me/update', userData, config)

        dispatch({
            type: actionTypes.UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/v1/password/update', passwords, config)

        dispatch({
            type: actionTypes.UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type:actionTypes.FORGOT_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/password/forgot', email, config)

        dispatch({
            type: actionTypes.FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: actionTypes.FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Reset password
export const resetPassword = (token,password) =>async (dispatch) => {
    try {

        dispatch({ type:actionTypes.NEW_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, password, config)

        dispatch({
            type: actionTypes.NEW_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: actionTypes.NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all users
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/users')

        dispatch({
            type: actionTypes.ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: actionTypes.ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}




// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.USER_DETAILS_REQUEST })


        const { data } = await axios.get(`/api/v1/admin/user/${id}`)

        dispatch({
            type: actionTypes.USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: actionTypes.USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update user - ADMIN
export const updateUser = (id,userData) => async (dispatch) => {
    try {

        dispatch({ type:actionTypes.UPDATE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/user/${id}`,userData, config)

        console.log(data.success)

        dispatch({
            type: actionTypes.UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch({
            type: actionTypes.DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_USER_FAIL,
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