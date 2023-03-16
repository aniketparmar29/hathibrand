import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as ProductReducer } from "./ProductReducer/reducer";
import {userAuth} from './AuthReducer/user.reducer';
import {AdminReducer} from './AdminReducer/reducer';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  ProductReducer,
  AdminReducer,
  userAuth,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
