import { POST_CART_FAILURE,POST_CART_REQUEST,POST_CART_SUCCESS ,GET_CART_FAILURE,GET_CART_SUCCESS,GET_CART_REQUEST} from "./actiontypes";
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
  
  