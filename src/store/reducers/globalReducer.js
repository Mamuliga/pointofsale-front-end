import { SIMPLE_ACTION, DATA_FETCHING } from '../actions/actionTypes';

export default (state = { as: 'ad' }, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SIMPLE_ACTION:
      newState.result = action.payload;
      break;
    case DATA_FETCHING:
      newState.isFetching = action.payload;
      break;
    default:
      return state;
  }
  return newState;
};
