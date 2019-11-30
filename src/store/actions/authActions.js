import * as ACTION_TYPES from "./actionTypes";

export const authenticate = () => dispatch => {
  dispatch({ type: ACTION_TYPES.AUTHENTICATION, payload: true });
};

export const logout = () => dispatch => {
  dispatch({ type: ACTION_TYPES.LOGOUT, payload: false });
};
