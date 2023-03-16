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
  import axios from "axios";
  
  const getProductRequestAction = () => {
    return { type: ALL_PRODUCT_REQUEST };
  };
  
  const getProductSuccesAction = (payload) => {
    return { type: ALL_PRODUCT_SUCCESS, payload };
  };
  
  const getProductFailureAction = () => {
    return { type: ALL_PRODUCT_FAIL };
  };

  const getUsersRequestAction = () => {
    return { type: ALL_USERS_REQUEST };
  };
  
  const getUsersSuccesAction = (payload) => {
    return { type: ALL_USERS_SUCCESS, payload };
  };
  
  const getUsersFailureAction = () => {
    return { type: ALL_USERS_FAIL };
  };
  
  
  
  const getsingleRequestAction = () => {
    return { type: PRODUCT_DETAILS_REQUEST};
  };
  
  const getsingleSuccesAction = (payload) => {
    return { type: PRODUCT_DETAILS_SUCCESS, payload };
  };
  
  const getsingleFailureAction = () => {
    return { type: PRODUCT_DETAILS_FAIL};
  };
  
  
  
  
  
  
  
  
  
  
  export const getProducts = () => {
    return (dispatch) => {
      dispatch(getProductRequestAction());
  
      axios
        .get(`https://real-cyan-swallow-boot.cyclic.app/products`)
        .then((res) => {
          dispatch(getProductSuccesAction(res.data));
        })
        .catch((err) => {
          dispatch(getProductFailureAction());
        });
    };
  };
  
  export const getAllUsers = () => {
    return (dispatch) => {
      dispatch(getUsersRequestAction());
  
      axios
        .get(`https://real-cyan-swallow-boot.cyclic.app/users`)
        .then((res) => {
          dispatch(getUsersSuccesAction(res.data));
        })
        .catch((err) => {
          dispatch(getUsersFailureAction());
        });
    };
  };
  export const getsingle = (id) => {
    return (dispatch) => {
      dispatch(getsingleRequestAction());
  
      axios
        .get(`https://real-cyan-swallow-boot.cyclic.app/products/${id}`)
        .then((res) => {
          dispatch(getsingleSuccesAction(res.data));
        })
        .catch((err) => {
          dispatch(getsingleFailureAction());
        });
    };
  };
  