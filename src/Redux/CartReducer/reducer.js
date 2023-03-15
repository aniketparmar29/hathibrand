import { POST_CART_FAILURE,POST_CART_REQUEST,POST_CART_SUCCESS } from "./actiontypes";

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
        
        default: return state;
    }

}

export { reducer }