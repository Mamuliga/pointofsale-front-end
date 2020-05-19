import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import authReducer from './authReducer';
import { saleReducer } from './saleReducer';

export default combineReducers({
  global: globalReducer,
  auth: authReducer,
  sale: saleReducer,
});
