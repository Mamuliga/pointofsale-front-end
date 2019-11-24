import { combineReducers } from "redux";
import simpleReducer from "./simpleReducer";
import authReducer from "./authReducer";

export default combineReducers({
  simpleReducer,
  authReducer
});
