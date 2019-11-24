import * as ACTION_TYPES from './actionTypes'

export const authenticate = () => dispatch => {
  dispatch({ type: ACTION_TYPES.AUTHENTICATION, payload: true });
};
