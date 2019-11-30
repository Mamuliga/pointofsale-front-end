import { combineReducers } from "redux";
import simpleReducer from "./simpleReducer";
import authReducer from "./authReducer";

export default combineReducers({
  simple: simpleReducer,
  auth: authReducer
});
