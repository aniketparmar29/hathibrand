import {
  POST_CART_FAILURE,
  POST_CART_REQUEST,
  POST_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_SUCCESS,
  GET_CART_REQUEST,
  REMOVE_CART_FAILURE,
 
  REMOVE_CART_SUCCESS,
  EDIT_CART_FAILURE,
  EDIT_CART_SUCCESS,
  EDIT_CART_REQUEST,
  REMOVE_CART_REQUEST
} from "./actiontypes";
import axios from "axios";

const postcartrequestAction = () => {
  return { type: POST_CART_REQUEST };
};

const postcartsuccessAction = (payload) => {
  return { type: POST_CART_SUCCESS, payload };
};

const postcartfailureAction = () => {
  return { type: POST_CART_FAILURE };
};

const getcartrequestAction = () => {
  return { type: GET_CART_REQUEST };
};

const getcartsuccessAction = (payload) => {
  return { type: GET_CART_SUCCESS, payload };
};

const getcartfailureAction = () => {
  return { type: GET_CART_FAILURE };
};

const removecartrequestAction = () => {
  return { type:REMOVE_CART_REQUEST };
};

const removecartsuccessAction = () => {
  return { type: REMOVE_CART_SUCCESS };
};

const removecartfailureAction = () => {
  return { type: REMOVE_CART_FAILURE };
};

const editcartrequestAction = () => {
  return { type: EDIT_CART_REQUEST };
};

const editcartsuccessAction = (payload) => {
  return { type: EDIT_CART_SUCCESS ,payload};
};

const editcartfailureAction = () => {
  return { type: EDIT_CART_FAILURE };
};

export const postcart = (product) => {
  return (dispatch) => {
    dispatch(postcartrequestAction());

    axios
      .post(`https://real-cyan-swallow-boot.cyclic.app/add-to-cart`, product)
      .then((res) => {
        console.log(res.data);
        dispatch(postcartsuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(postcartfailureAction());
      });
  };
};

export const removecart = (id,prId) => {
  return (dispatch) => {
    dispatch(removecartrequestAction());

    axios
      .delete(`https://real-cyan-swallow-boot.cyclic.app/cart/${id}/${prId}`)
      .then((res) => {
        dispatch(removecartsuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(removecartfailureAction());
      });
  };
};
export const editcart = (id,prId,quntitybody) => {
  return (dispatch) => {
    dispatch(editcartrequestAction());

    axios
      .put(`https://real-cyan-swallow-boot.cyclic.app/cart/${id}/${prId}`,quntitybody)
      .then((res) => {
        dispatch(editcartsuccessAction({quntitybody,prId}));
      })
      .catch((err) => {
        dispatch(editcartfailureAction());
      });
  };
};
export const getcart = (id) => {
  return (dispatch) => {
    dispatch(getcartrequestAction());

    axios
      .get(`https://real-cyan-swallow-boot.cyclic.app/cart/${id}`)
      .then((res) => {
        dispatch(getcartsuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(getcartfailureAction());
      });
  };
};
