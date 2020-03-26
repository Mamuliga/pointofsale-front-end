import {
  AUTHENTICATION,
  LOGOUT,
  SET_AUTH_LOADING,
  LOAD_AUTH_DATA,
  SET_ERROR_NOTIFICATION,
  SET_LOGIN_ERROR_FALSE
} from "../actions/actionTypes";
import { AUTH_LOCAL_STORAGE } from "../../utilities/constants";

const INITIAL_STATE = {
  loading: false,
  isAuthenticated: null,
  token: null,
  loginError: null
};

export default (state = INITIAL_STATE, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_AUTH_DATA:
      newState.isAuthenticated = true;
      newState.token = action.payload.token;
      break;
    case SET_AUTH_LOADING:
      newState.loading = !!action.payload;
      break;
    case SET_ERROR_NOTIFICATION:
      newState.loginError = "Invalid Credentials";
      break;
    case SET_LOGIN_ERROR_FALSE:
      newState.loginError = false;
      break;
    case AUTHENTICATION:
      newState.isAuthenticated = true;
      newState.token = action.payload;
      break;
    case LOGOUT:
      newState.isAuthenticated = false;
      newState.token = null;
      break;
    default:
      return state;
  }
  localStorage.setItem(AUTH_LOCAL_STORAGE, JSON.stringify(newState));
  return newState;
};
