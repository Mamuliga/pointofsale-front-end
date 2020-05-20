import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import authReducer from './authReducer';
import { saleReducer } from './saleReducer';
import { receiveReducer } from './receiveReducer';

export default combineReducers({
  global: globalReducer,
  auth: authReducer,
  sale: saleReducer,
  receive: receiveReducer,
});
