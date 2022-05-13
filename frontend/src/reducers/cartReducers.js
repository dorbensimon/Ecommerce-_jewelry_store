import * as actionTypes from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {

        case actionTypes.ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(i => i.product === item.product)

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case actionTypes.REMOVE_ITEM_CART:
            return {
                ...state,
                //The filter() method creates a new array with all elements that pass the test implemented by the provided function.
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }


        case actionTypes.SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }


        default:
            return state
    }
}