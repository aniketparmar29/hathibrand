import { POST_CART_FAILURE,POST_CART_REQUEST,POST_CART_SUCCESS } from "./actiontypes";
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

  export const postcart = (product) => {
    return (dispatch) => {
      dispatch(postcartrequestAction());
  
      axios
        .post(`https://real-cyan-swallow-boot.cyclic.app/add-to-cart`,product)
        .then((res) => {
          dispatch(postcartsuccessAction(res.data));
        })
        .catch((err) => {
          dispatch(postcartfailureAction());
        });
    };
  };
  
  