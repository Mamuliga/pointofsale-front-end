import { SET_CART } from '../actions/actionTypes';

const INITIAL_STATE = {
  cartItems: [],
};
export const receiveReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};
