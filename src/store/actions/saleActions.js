import { SET_CART } from './actionTypes';

export const setCartItems = payload => dispatch =>
  dispatch({
    type: SET_CART,
    payload,
  });
