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
} from "./actions-types";
  import axios from "axios";



  //get all product
  const getProductRequestAction = () => {
    return { type: ALL_PRODUCT_REQUEST };
  };
  
  const getProductSuccesAction = (payload) => {
    return { type: ALL_PRODUCT_SUCCESS, payload };
  };
  
  const getProductFailureAction = () => {
    return { type: ALL_PRODUCT_FAIL };
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




  //get all users
  const getUsersRequestAction = () => {
    return { type: ALL_USERS_REQUEST };
  };
  
  const getUsersSuccesAction = (payload) => {
    return { type: ALL_USERS_SUCCESS, payload };
  };
  
  const getUsersFailureAction = () => {
    return { type: ALL_USERS_FAIL };
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
  
 //get single product 
  const getsingleRequestAction = () => {
    return { type: PRODUCT_DETAILS_REQUEST};
  };
  
  const getsingleSuccesAction = (payload) => {
    return { type: PRODUCT_DETAILS_SUCCESS, payload };
  };
  
  const getsingleFailureAction = () => {
    return { type: PRODUCT_DETAILS_FAIL};
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
  

//create product

  const newProductRequestAction = () => {
    return { type: NEW_PRODUCT_REQUEST};
  };
  
  const newProductSuccesAction = (payload) => {
    return { type: NEW_PRODUCT_SUCCESS, payload };
  };
  
  const newProductFailureAction = () => {
    return { type: NEW_PRODUCT_FAIL};
  };
  
  
  export const createProduct = (product) => {
    return (dispatch) => {
      dispatch(newProductRequestAction());
  
      axios
        .post(`https://real-cyan-swallow-boot.cyclic.app/products/new`,product)
        .then((res) => {
          dispatch(newProductSuccesAction(res.data));
        })
        .catch((err) => {
          dispatch(newProductFailureAction(err));
          console.log(err)
        });
    };
  };
  
 
   //get all SLiders
   const getSLIDERSRequestAction = () => {
    return { type: ALL_SLIDERS_REQUEST };
  };
  
  const getSLIDERSSuccesAction = (payload) => {
    return { type: ALL_SLIDERS_SUCCESS, payload };
  };
  
  const getSLIDERSFailureAction = () => {
    return { type: ALL_SLIDERS_FAIL };
  };
  export const getSliders = () => {
    return (dispatch) => {
      dispatch(getSLIDERSRequestAction());
  
      axios
        .get(`https://real-cyan-swallow-boot.cyclic.app/slider`)
        .then((res) => {
          dispatch(getSLIDERSSuccesAction(res.data));
        })
        .catch((err) => {
          dispatch(getSLIDERSFailureAction());
        });
    };
  };
