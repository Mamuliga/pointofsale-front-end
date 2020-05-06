import {
  SIMPLE_ACTION,
  DATA_FETCHING,
  DATA_FETCHING_ERR
} from '../actions/actionTypes';

export default (state = { as: 'ad' }, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SIMPLE_ACTION:
      newState.result = action.payload;
      break;
    case DATA_FETCHING:
      newState.isFetching = action.payload;
      break;
    case DATA_FETCHING_ERR:
      newState.isFetchingErr = action.payload;
      break;
    default:
      return state;
  }
  return newState;
};
