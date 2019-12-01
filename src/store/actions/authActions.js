import {
  LOAD_AUTH_DATA,
  AUTHENTICATION,
  LOGOUT,
  SET_ERROR_NOTIFICATION,
  SET_AUTH_LOADING
} from "./actionTypes";
import errorMessages from "../../utilities/errorMessages";
import { AUTH_LOCAL_STORAGE } from "../../utilities/constants";

export const setPersistentData = authData => dispatch => {
  if (authData && authData.token) {
    dispatch({ type: LOAD_AUTH_DATA, payload: authData });
  }
};

export const authenticate = ({ username, password }) => dispatch => {
  localStorage.removeItem(AUTH_LOCAL_STORAGE);
  dispatch({ type: SET_AUTH_LOADING, payload: true });
  setTimeout(() => {
    if (username && password) {
      dispatch([
        { type: AUTHENTICATION, payload: `${username}${password}` },
        { type: SET_AUTH_LOADING, payload: false }
      ]);
    } else {
      dispatch([
        {
          type: SET_ERROR_NOTIFICATION,
          payload: errorMessages.loginFail
        },
        { type: SET_AUTH_LOADING, payload: false }
      ]);
    }
  }, 600);
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
