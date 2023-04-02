import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
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
  ALL_REVIEW_SUCCESS
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

  const newSlidersRequestAction = () => {
    return { type: CREATE_SLIDER_REQUEST};
  };
  
  const newSlidersSuccesAction = (payload) => {
    return { type: CREATE_SLIDER_SUCCESS, payload };
  };
  
  const newSlidersFailureAction = () => {
    return { type: CREATE_SLIDER_FAIL};
  };
  
  
  export const createSlider = (product) => {
    return (dispatch) => {
      dispatch(newSlidersRequestAction());
  
      axios
        .post(`https://real-cyan-swallow-boot.cyclic.app/slider`,product)
        .then((res) => {
          dispatch(newSlidersSuccesAction(res.data));
        })
        .catch((err) => {
          dispatch(newSlidersFailureAction(err));
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


  
 // Delete Slider 
 const delRequestAction = () => {
  return { type: DELETE_SLIDER_REQUEST};
};

const delSuccesAction = (payload) => {
  return { type: DELETE_SLIDER_SUCCESS, payload };
};

const delFailureAction = () => {
  return { type: DELETE_SLIDER_FAIL};
};

export const deleteslider = (id) => {
  return (dispatch) => {
    dispatch(delRequestAction());
    axios
      .delete(`https://real-cyan-swallow-boot.cyclic.app/slider/${id}`)
      .then((res) => {
        dispatch(delSuccesAction(res.data));
      })
      .catch((err) => {
        dispatch(delFailureAction());
      });
  };
};

//get all reviews
const getREviewsRequestAction = () => {
  return { type: ALL_REVIEW_REQUEST };
};

const getREviewsSuccesAction = (payload) => {
  return { type: ALL_REVIEW_SUCCESS, payload };
};

const getREviewsFailureAction = () => {
  return { type: ALL_REVIEW_FAIL };
};

export const getAllReviews = () => {
  return (dispatch) => {
    dispatch(getREviewsRequestAction());

    axios
      .get(`https://real-cyan-swallow-boot.cyclic.app/reviews`)
      .then((res) => {
        dispatch(getREviewsSuccesAction(res.data));
      })
      .catch((err) => {
        dispatch(getREviewsFailureAction());
      });
  };
};


// Delete Slider 
const delproductRequestAction = () => {
  return { type: DELETE_PRODUCT_REQUEST};
};

const delproductSuccesAction = (payload) => {
  return { type: DELETE_PRODUCT_SUCCESS, payload };
};

const delproductFailureAction = () => {
  return { type: DELETE_PRODUCT_FAIL};
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    dispatch(delproductRequestAction());
    axios
      .delete(`https://real-cyan-swallow-boot.cyclic.app/products/${id}`)
      .then((res) => {
        dispatch(delproductSuccesAction(res.data));
      })
      .catch((err) => {
        dispatch(delproductFailureAction());
      });
  };
};

//Edit Product

const UpdateProductRequestAction = () => {
  return { type: UPDATE_PRODUCT_REQUEST};
};

const UpdateProductSuccesAction = (payload) => {
  return { type: UPDATE_PRODUCT_SUCCESS, payload };
};

const UpdateProductFailureAction = () => {
  return { type: UPDATE_PRODUCT_FAIL};
};


export const EditProduct = (id,product) => {
  console.log(product)
  return (dispatch) => {
    dispatch(UpdateProductRequestAction());

    axios
      .put(`https://real-cyan-swallow-boot.cyclic.app/products/${id}`,product)
      .then((res) => {
        console.log(res)
        dispatch(UpdateProductSuccesAction(res.data));
      })
      .catch((err) => {
        dispatch(UpdateProductFailureAction(err));
        console.log(err)
      });
  };
};