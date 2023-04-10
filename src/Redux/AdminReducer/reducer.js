import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  ALL_SLIDERS_REQUEST,
  ALL_SLIDERS_SUCCESS,
  ALL_SLIDERS_FAIL,
  CREATE_SLIDER_REQUEST,
  CREATE_SLIDER_SUCCESS,
  CREATE_SLIDER_FAIL,
  DELETE_SLIDER_REQUEST,
  DELETE_SLIDER_SUCCESS,
  DELETE_SLIDER_FAIL,
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  ALL_COUPAN_FAIL,
  ALL_COUPAN_REQUEST,
  ALL_COUPAN_SUCCESS,
  CREATE_COUPAN_FAIL,
  CREATE_COUPAN_REQUEST,
  CREATE_COUPAN_SUCCESS,
  DELETE_COUPAN_FAIL,
  DELETE_COUPAN_REQUEST,
  DELETE_COUPAN_SUCCESS
  } from "./actions-types";

  const initialState = {
    sliders:[],
    products:[],
    coupan:[],
    reviews:[],
    editsuccess:false,
    users:[],
    isLoading:false,
    isError:false,
    single:{},
    success:false,
    isdelete:false
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
    case UPDATE_PRODUCT_REQUEST: {
        return { ...state,isLoading: true,editsuccess:false}
    }
    case UPDATE_PRODUCT_SUCCESS: {
        return {...state,isLoading:false,editsuccess:true}
    }
    case UPDATE_PRODUCT_FAIL: {
        return {...state,isError: true,isLoading: false}
    }
    case DELETE_SLIDER_REQUEST: {
        return { ...state,isLoading: true,isdelete: false}
    }
    case DELETE_SLIDER_SUCCESS: {
        return {...state,isLoading:false,isdelete: true}
    }
    case DELETE_SLIDER_FAIL: {
        return {...state,isError: true,isLoading: false}
    }
    case DELETE_PRODUCT_REQUEST: {
        return { ...state,isLoading: true,isdelete: false}
    }
    case DELETE_PRODUCT_SUCCESS: {
        return {...state,isLoading:false,isdelete: true}
    }
    case DELETE_PRODUCT_FAIL: {
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
    case ALL_SLIDERS_REQUEST: {
      return { ...state,isLoading: true}
    }
    case ALL_SLIDERS_SUCCESS: {
      return {...state,isLoading:false,sliders: payload}
    }
    case ALL_SLIDERS_FAIL: {
      return {...state,isError: true,isLoading: false}
    }
    case ALL_COUPAN_REQUEST: {
      return { ...state,isLoading: true}
    }
    case ALL_COUPAN_SUCCESS: {
      return {...state,isLoading:false,coupan: payload}
    }
    case ALL_COUPAN_FAIL: {
      return {...state,isError: true,isLoading: false}
    }
    case ALL_REVIEW_REQUEST: {
      return { ...state,isLoading: true}
    }
    case ALL_REVIEW_SUCCESS: {
      return {...state,isLoading:false,reviews: payload}
    }
    case ALL_REVIEW_FAIL: {
      return {...state,isError: true,isLoading: false}
    }
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        success:false,
        isError: false,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        isLoading: false,
        success:true,
        isError: false,
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        isError: true,
      };
    case CREATE_SLIDER_REQUEST:
      return {
        ...state,
        loading: true,
        isError: false,
      };
    case CREATE_SLIDER_SUCCESS:
      return {
        isLoading: false,
        success:true,
        isError: false,
      };
    case CREATE_SLIDER_FAIL:
      return {
        ...state,
        loading: false,
        isError: true,
      };
      default: {
        return { ...state };
      }
    }
  };
  