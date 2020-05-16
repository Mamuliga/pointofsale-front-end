import { SET_CART } from '../actions/actionTypes';

const INITIAL_STATE = {
  cartItems: [],
};
export const saleReducer = (state = INITIAL_STATE, action) => {
  const newState = state;
  switch (action.type) {
    case SET_CART:
      newState.cartItems = action.payload;
      break;
    default:
      return state;
  }
  return newState;
};
