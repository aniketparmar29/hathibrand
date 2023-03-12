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
import axios from "axios";

const getProductRequestAction = () => {
  return { type: GET_PRODUCT_REQUEST };
};

const getProductSuccesAction = (payload) => {
  return { type: GET_PRODUCT_SUCCESS, payload };
};

const getProductFailureAction = () => {
  return { type: GET_PRODUCT_FAILURE };
};



const getsingleRequestAction = () => {
  return { type: GET_SINGLE_REQUEST };
};

const getsingleSuccesAction = (payload) => {
  return { type: GET_SINGLE_SUCCESS, payload };
};

const getsingleFailureAction = () => {
  return { type: GET_SINGLE_FAILURE };
};




const getsearchRequestAction = () => {
  return { type: GET_SEARCH_REQUEST };
};

const getsearchSuccesAction = (payload) => {
  return { type: GET_SEARCH_SUCCESS, payload };
};

const getsearchFailureAction = () => {
  return { type: GET_SEARCH_FAILURE };
};



const getsuggRequestAction = () => {
  return { type: GET_SUGG_REQUEST };
};

const getsuggSuccesAction = (payload) => {
  return { type: GET_SUGG_SUCCESS, payload };
};

const getsuggFailureAction = () => {
  return { type: GET_SUGG_FAILURE };
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
export const getsearch = (query) => {
  return (dispatch) => {
    dispatch(getsearchRequestAction());

    axios
      .get(`https://real-cyan-swallow-boot.cyclic.app/search?query=${query}`)
      .then((res) => {
        dispatch(getsearchSuccesAction(res.data));
      })
      .catch((err) => {
        dispatch(getsearchFailureAction());
      });
  };
};
export const getsugg = (query) => {
  return (dispatch) => {
    dispatch(getsuggRequestAction());

    axios
      .get(`https://real-cyan-swallow-boot.cyclic.app/search?query=${query}`)
      .then((res) => {
        dispatch(getsuggSuccesAction(res.data));
      })
      .catch((err) => {
        dispatch(getsuggFailureAction());
      });
  };
};
