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

    
  } from "./actionTypes";

const initialState = {
    product: [],
    isLoading:false,
    isError:false,
    single:{},
    reviw:[],
}


const reducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCT_REQUEST: {
            return { ...state,isLoading: true}
        }
        case GET_PRODUCT_SUCCESS: {
            return {...state,isLoading:false,product: payload}
        }
        case GET_PRODUCT_FAILURE: {
            return {...state,isError: true,isLoading: false}
        }
        case GET_SINGLE_REQUEST: {
            return { ...state,isLoading: true}
        }
        case GET_SINGLE_SUCCESS: {
            return {...state,single: payload,isLoading: false}
        }
        case GET_SINGLE_FAILURE: {
            return {...state,isError: true,isLoading: false}
        }
        
// reviw get
        case GET_REVIEW_REQUEST: {
            return { ...state,isLoading: true}
        }
        case GET_REVIEW_SUCCESS: {
            return {...state,isLoading:false,reviw: payload}
        }
        case GET_REVIEW_FAIL: {
            return {...state,isError: true,isLoading: false}
        }

// reviw edit

            case EDIT_REVIEW_REQUEST: {
                return { ...state,isLoading: true}
            }
            case EDIT_REVIEW_SUCCESS: {
                return {...state,isLoading:false,reviw: payload}
            }
            case EDIT_REVIEW_FAIL: {
                return {...state,isError: true,isLoading: false}
            }

// reviw create
                case CREATE_REVIEW_REQUEST: {
                    return { ...state,isLoading: true}
                }
                case CREATE_REVIEW_SUCCESS: {
                    return {...state,isLoading:false,reviw: payload}
                }
                case CREATE_REVIEW_FAIL: {
                    return {...state,isError: true,isLoading: false}
                }

// delete

                case DELETE_REVIEW_REQUEST: {
                    return { ...state,isLoading: true}
                }
                case DELETE_REVIEW_SUCCESS: {
                    return {...state,isLoading:false,reviw: payload}
                }
                case DELETE_REVIEW_FAIL: {
                    return {...state,isError: true,isLoading: false}
                }
        default: return state;
    }

}







export { reducer }