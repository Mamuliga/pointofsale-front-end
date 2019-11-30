import * as ACTION_TYPES from "../actions/actionTypes";

export default (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_TYPES.SIMPLE_ACTION:
      newState.result = action.payload;
      break;
    default:
      return state;
  }
  return newState;
};
