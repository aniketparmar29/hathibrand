import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL
  } from "./actions-types";

  const initialState = {
    products:[],
    users:[],
    isLoading:false,
    isError:false,
    single:{}
  };

  export const AdminReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ALL_PRODUCT_REQUEST: {
        return { ...state,isLoading: true}
    }
    case ALL_PRODUCT_SUCCESS: {
        return {...state,isLoading:false,products: payload}
    }
    case ALL_PRODUCT_FAIL: {
        return {...state,isError: true,isLoading: false}
    }
      case ALL_USERS_REQUEST: {
        return { ...state,isLoading: true}
    }
    case ALL_USERS_SUCCESS: {
        return {...state,isLoading:false,users: payload}
    }
    case ALL_USERS_FAIL: {
        return {...state,isError: true,isLoading: false}
    }
    case PRODUCT_DETAILS_REQUEST: {
        return { ...state,isLoading: true}
    }
    case PRODUCT_DETAILS_SUCCESS: {
        return {...state,single: payload,isLoading: false}
    }
    case PRODUCT_DETAILS_FAIL: {
        return {...state,isError: true,isLoading: false}
    }
      default: {
        return { ...state };
      }
    }
  };
  