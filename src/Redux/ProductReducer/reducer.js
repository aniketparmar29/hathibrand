import {
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
  
    GET_SINGLE_FAILURE,
    GET_SINGLE_SUCCESS,
    GET_SINGLE_REQUEST,
    
    POST_CART_REQUEST,
    POST_CART_SUCCESS,
    POST_CART_FAILURE,
  
    
  } from "./actionTypes";

const initialState = {
    product: [],
    isLoading:false,
    isError:false,
    single:{},
    
    
    

}


const reducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCT_REQUEST: {
            return { ...state,isLoading: true}
        }
        case GET_PRODUCT_SUCCESS: {
            return {...state,product: payload,isLoading: false}
        }
        case GET_PRODUCT_FAILURE: {
            return {...state,isError: true,isLoading: false}
        }
        case GET_SINGLE_REQUEST: {
            return { ...state,isLoading: true}
        }
        case GET_SINGLE_SUCCESS: {
            return {...state,single: payload,isLoading: false}
        }
        case GET_SINGLE_FAILURE: {
            return {...state,isError: true,isLoading: false}
        }
        case  POST_CART_REQUEST: {
            return { ...state,isLoading: true}
        }
        case POST_CART_SUCCESS: {
            return {...state,isLoading: false}
        }
        case POST_CART_FAILURE: {
            return {...state,isError: true,isLoading: false}
        }
        
        default: return state;
    }

}

export { reducer }