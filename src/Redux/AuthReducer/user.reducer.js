import {
  REGISTER_USER_LOADING,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_LOADING,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_LOADING,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_SUCCESS,
} from "./user.action.types";

let token =window.localStorage.getItem("token");
// const userData = JSON.parse(localStorage.getItem("user"))
const initialState = {
  register_loading: false,
  reg_msg:"",
  register_error: false,
  login_laoding: false,
  login_error: false,
  user:{},
  authToken:token,
  register_success:false,
  isAuth: token?true:false
};
export const userAuth = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER_LOADING: {
      return { ...state, register_loading:true,register_error:false, isAuth:false};
    }
    case REGISTER_USER_ERROR: {
      return { ...state, register_loading:false,register_error:true, isAuth:false,register_success:false };
    }
    case REGISTER_USER_SUCCESS: {
      return { ...state, register_loading:false,register_error:false,register_success:true};
    }
    case LOGIN_USER_LOADING: {
      return { ...state, login_laoding:true,login_error:false,isAuth:false };
    }
    case LOGIN_USER_ERROR: {
      return { ...state, login_laoding:false,login_error:true,isAuth:false };
    }
    case LOGIN_USER_SUCCESS: {
        window.localStorage.setItem("token",payload.token)
        window.localStorage.setItem("user",JSON.stringify(payload.data))
      return { ...state, login_laoding:false,login_error:false,isAuth:true,authToken:payload.token,user:payload.data };
    }
    case LOGOUT_USER_LOADING:{
        return{...state, }
    }
    case LOGOUT_USER_ERROR:{
        return{...state, }
    }
    case LOGOUT_USER_SUCCESS:{
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("user")
        return{...state,isAuth:false}
    }
    default: {
      return { ...state };
    }
  }
};
