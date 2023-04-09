import {
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,

  GET_SINGLE_FAILURE,
  GET_SINGLE_SUCCESS,
  GET_SINGLE_REQUEST,

 CREATE_REVIEW_FAIL,
 CREATE_REVIEW_SUCCESS,
 CREATE_REVIEW_REQUEST,

DELETE_REVIEW_FAIL,
DELETE_REVIEW_SUCCESS,
DELETE_REVIEW_REQUEST,


EDIT_REVIEW_FAIL,
EDIT_REVIEW_SUCCESS,
EDIT_REVIEW_REQUEST,

GET_REVIEW_SUCCESS,
GET_REVIEW_FAIL,
GET_REVIEW_REQUEST,

  

// catagary product
 
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

// single product

const getsingleRequestAction = () => {
  return { type: GET_SINGLE_REQUEST};
};

const getsingleSuccesAction = (payload) => {
  return { type: GET_SINGLE_SUCCESS, payload };
};

const getsingleFailureAction = () => {
  return { type: GET_SINGLE_FAILURE};
};



// review get

const getreviewrequestAction=()=>{
  return{ type:GET_REVIEW_REQUEST}
}

const getreviewsuccessAction=()=>{
  return{ type:GET_REVIEW_SUCCESS}
}

const getreviewfailureAction=()=>{
  return{ type:GET_REVIEW_FAIL}
}


// review Edite
const editreviewrequestAction=()=>{
  return{ type:EDIT_REVIEW_REQUEST}
}

const editreviewsuccessAction=()=>{
  return{ type:EDIT_REVIEW_SUCCESS}
}

const editreviewfailureAction=()=>{
  return{ type:EDIT_REVIEW_FAIL}
}

// review Delete

const deletereviewrequestAction=()=>{
  return{ type:DELETE_REVIEW_REQUEST}
}

const deletereviewsuccessAction=()=>{
  return{ type:DELETE_REVIEW_SUCCESS}
}

const deletereviewfailureAction=()=>{
  return{ type:DELETE_REVIEW_FAIL}
}

// review  Create 




const createreviewrequestAction=()=>{
  return{ type:CREATE_REVIEW_REQUEST}
}

const createreviewsuccessAction=()=>{
  return{ type:CREATE_REVIEW_SUCCESS}
}

const createreviewfailureAction=()=>{
  return{ type:CREATE_REVIEW_FAIL}
}







// get product function
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


// get single product function
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



// get review

export const getreview=(pr_id)=>{
  return(dispatch)=>{
    dispatch(getsingleRequestAction())

    axios
    .get(`https://real-cyan-swallow-boot.cyclic.app/reviews/${pr_id}`)
    .then((res)=>{
      dispatch(getreviewsuccessAction(res.data))
    })
    .catch((err)=>{
      dispatch(getreviewfailureAction())
    })
  }
}

// Edit

export const editreview=(user_id,pr_id,review)=>{
  return(dispatch)=>{
    dispatch(editreviewrequestAction())

    axios
    .put(`https://real-cyan-swallow-boot.cyclic.app/reviews/${user_id}/${pr_id}`,review)
    .then((res)=>{
      dispatch(getreviewsuccessAction(res.data))
    })
    .catch((err)=>{
      dispatch(getreviewfailureAction())
    })
  }
}


// delete

export const deletereview=(user_id,pr_id)=>{
  return(dispatch)=>{
    dispatch(deletereviewrequestAction())

    axios
    .delete(`https://real-cyan-swallow-boot.cyclic.app/reviews/${user_id}/${pr_id}`)
    .then((res)=>{
      dispatch(deletereviewsuccessAction(res.data))
    })
    .catch((err)=>{
      dispatch(deletereviewfailureAction())
    })
  }

}


// create
export const createreviw=(reviw)=>{
  return(dispatch)=>{
    dispatch(createreviewrequestAction())

    axios
    .post(`https://real-cyan-swallow-boot.cyclic.app/reviews/new`,reviw)
    .then((res)=>{
      dispatch(createreviewsuccessAction(res.data))
    })
    .catch((err)=>{
      dispatch(createreviewfailureAction())
    })
  }

}