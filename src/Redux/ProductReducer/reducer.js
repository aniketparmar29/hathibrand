import {
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
  
    GET_SINGLE_FAILURE,
    GET_SINGLE_SUCCESS,
    GET_SINGLE_REQUEST,
  
    GET_SEARCH_REQUEST,
    GET_SEARCH_FAILURE,
    GET_SEARCH_SUCCESS,
    
    
    
    GET_SUGG_FAILURE,
    GET_SUGG_SUCCESS,
    GET_SUGG_REQUEST,
  } from "./actionTypes";

const initialState = {
    product: [],
    isLoading:false,
    isError:false,
    single:{},
    searchproducts:[],
    

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
        case GET_SEARCH_REQUEST: {
            return { ...state,isLoading: true}
        }
        case GET_SEARCH_SUCCESS: {
            return {...state,single: payload,isLoading: false}
        }
        case GET_SEARCH_FAILURE: {
            return {...state,isError: true,isLoading: false}
        }
        default: return state;
    }

}

export { reducer }