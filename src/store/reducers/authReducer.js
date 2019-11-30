import { AUTHENTICATION, LOGOUT } from "../actions/actionTypes";

const INITIAL_STATE = {
  isAuthenticated: null,
  token: null
};

export default (state = INITIAL_STATE, action) => {
  const newState = { ...state };
  switch (action.type) {
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
  localStorage.setItem("auth", JSON.stringify(newState));
  return newState;
};
