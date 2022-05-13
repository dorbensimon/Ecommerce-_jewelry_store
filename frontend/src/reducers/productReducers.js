import * as actionTypes from '../constants/productConstants';


export const productsReducer =(state = { products: [] }, action) => {
    switch (action.type) {
        case actionTypes.ALL_PRODUCTS_REQUEST:
        case actionTypes.ADMIN_PRODUCTS_REQUEST:
          return {
            loading: true,
            products: []
          };
        case actionTypes.ALL_PRODUCTS_SUCCESS:
          return {
            loading: false,
            products: action.payload.product,
            productscount :action.payload.productscount,
            resPerPage :action.payload.resPerPage,
          };
        case actionTypes.ADMIN_PRODUCTS_SUCCESS:
          return {
            loading:false,
            products: action.payload,
          }

        case actionTypes.ALL_PRODUCTS_FAIL:
        case actionTypes.ADMIN_PRODUCTS_FAIL:
          return {
            loading: false,
            error: action.payload,
          };
        case actionTypes.CLEAR_ERRORS:
          return {
            ...state,
            error:null
          };
        default:
          return state;
    }
};
export const productDetailsReducer =(state = { product: {} }, action) => {
    switch (action.type) {
      case actionTypes.PRODUCT_DETAILS_REQUEST:
        return {
          ...state,
          loading:true,
        };
      case actionTypes.PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload.product,
        };
      case actionTypes.PRODUCT_DETAILS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case actionTypes.CLEAR_ERRORS:
        return {
          ...state,
          error:null
        };
      default:
        return state;
    }
};
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case actionTypes.NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case actionTypes.NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case actionTypes.NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case actionTypes.NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
export const productReducer = (state = {}, action) => {
  switch (action.type) {

      case actionTypes.DELETE_PRODUCT_REQUEST:
      case actionTypes.UPDATE_PRODUCT_REQUEST:
          return {
              ...state,
              loading: true
          }
      case actionTypes.DELETE_PRODUCT_SUCCESS:
          return {
              ...state,
              loading: false,
              isDeleted: action.payload
          }
        case actionTypes.UPDATE_PRODUCT_SUCCESS:
          return {
                ...state,
              loading: false,
              isUpdated: action.payload
          }

      case actionTypes.DELETE_PRODUCT_FAIL:
      case actionTypes.UPDATE_PRODUCT_FAIL:
          return {
              ...state,
              error: action.payload
          }

      case actionTypes.DELETE_PRODUCT_RESET:
          return {
              ...state,
              isDeleted: false
          }
        case actionTypes.UPDATE_PRODUCT_RESET:
          return {
              ...state,
              isUpdated: false
          }

      case actionTypes.CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state
  }
}
export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {

      case actionTypes.NEW_PRODUCT_REQUEST:
          return {
              ...state,
              loading: true
          }

      case actionTypes.NEW_PRODUCT_SUCCESS:
          return {
              loading: false,
              success: action.payload.success,
              product: action.payload.product
          }

      case actionTypes.NEW_PRODUCT_FAIL:
          return {
              ...state,
              error: action.payload
          }

      case actionTypes.NEW_PRODUCT_RESET:
          return {
              ...state,
              success: false
          }

      case actionTypes.CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state
  }
}
export const productReviewsReducer = (state = { review: [] }, action) => {
  switch (action.type) {

      case actionTypes.GET_REVIEWS_REQUEST:
          return {
              ...state,
              loading: true
          }

      case actionTypes.GET_REVIEWS_SUCCESS:
          return {
              loading: false,
              reviews: action.payload
          }

      case actionTypes.GET_REVIEWS_FAIL:
          return {
              ...state,
              error: action.payload
          }

      case actionTypes.CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state
  }
}
export const reviewReducer = (state = {}, action) => {
  switch (action.type) {

      case actionTypes.DELETE_REVIEW_REQUEST:
          return {
              ...state,
              loading: true
          }

      case actionTypes.DELETE_REVIEW_SUCCESS:
          return {
              ...state,
              loading: false,
              isDeleted: action.payload
          }

      case actionTypes.DELETE_REVIEW_FAIL:
          return {
              ...state,
              error: action.payload
          }

      case actionTypes.DELETE_REVIEW_RESET:
          return {
              ...state,
              isDeleted: false
          }

      case actionTypes.CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state
  }
}