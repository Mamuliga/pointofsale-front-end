import { SET_RECEIVE_CART } from './actionTypes';

export const setCartItems = payload => dispatch =>
  dispatch({
    type: SET_RECEIVE_CART,
    payload,
  });
