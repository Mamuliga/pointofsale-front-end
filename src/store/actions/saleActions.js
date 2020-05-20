import { SET_SALE_CART } from './actionTypes';

export const setCartItems = payload => dispatch =>
  dispatch({
    type: SET_SALE_CART,
    payload,
  });
