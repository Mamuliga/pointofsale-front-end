import * as ACTION_TYPES from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.SIMPLE_ACTION:
      return {
        result: action.payload
      };
    case ACTION_TYPES.POST_REQUEST:
      return {
        postRequest: action.payload
      };
    case ACTION_TYPES.PUT_REQUEST:
      return {
        put: action.payload
      };
    case ACTION_TYPES.DELETE_REQUEST:
      return {
        deleteRequest: action.payload
      }
    default:
      return state;
  }
};
