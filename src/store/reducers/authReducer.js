import * as ACTION_TYPES from '../actions/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTHENTICATION:
      return {
        isAuthenticated: action.payload
      };
    default:
      return state;
  }
};
