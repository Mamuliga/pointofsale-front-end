import { LOAD_AUTH_DATA, AUTHENTICATION, LOGOUT } from "./actionTypes";

export const setPersistentData = authData => dispatch => {
  if (authData && authData.token) {
    dispatch({ type: LOAD_AUTH_DATA, payload: authData });
  }
};

export const authenticate = () => dispatch => {
  dispatch({ type: AUTHENTICATION, payload: true });
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT, payload: false });
};
