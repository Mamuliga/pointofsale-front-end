import { SIMPLE_ACTION } from "../actions/actionTypes";

export default (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SIMPLE_ACTION:
      newState.result = action.payload;
      break;
    default:
      return state;
  }
  return newState;
};
