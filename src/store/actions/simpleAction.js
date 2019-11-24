import * as ACTION_TYPES from './actionTypes'

export const simpleAction = () => dispatch => {
  dispatch({ type: ACTION_TYPES.SIMPLE_ACTION, payload: "simpleAction" });
};
