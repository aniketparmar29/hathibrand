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

const initialState = {
    cart:[],
    isLoading:false,
    isError:false,

}

const reducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case  POST_CART_REQUEST: {
            return { ...state,isLoading: true}
        }
        case POST_CART_SUCCESS: {
            return {...state,isLoading: false}
        }
        case POST_CART_FAILURE: {
            return {...state,isError: true,isLoading: false}
        }



        case  GET_CART_REQUEST: {
            return { ...state,isLoading: true}
        }
        case GET_CART_SUCCESS: {
            return {...state,isLoading: false,cart:payload}
        }
        case GET_CART_FAILURE: {
            return {...state,isError: true,isLoading: false}
        }
       
       
       
       
       
       
       
       
        case  REMOVE_CART_REQUEST: {
            return { ...state,isLoading: true}
        }
        case REMOVE_CART_SUCCESS: {
            return {...state,isLoading: false}
        }
        case REMOVE_CART_FAILURE: {
            return {...state,isError: true,isLoading: false}
        }


        case  EDIT_CART_REQUEST: {
            return { ...state,isLoading: true}
        }
        case EDIT_CART_SUCCESS: {
            let {pr_que} = payload.quntitybody
            let update = state.cart.map((el)=>{
                if(el.pr_id===payload.prId){
                    return {...el,pr_que}
                }else{
                    return el;
                }
            })
            return {...state,isLoading: false,cart:update}
        }
        case EDIT_CART_FAILURE: {
            return {...state,isError: true,isLoading: false}
        }
        
        default: return state;
    }

}

export { reducer }