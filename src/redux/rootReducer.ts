import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './slices/auth/userSlice';
import orderReducer from './slices/order/orderSlice';


const rootReducer = combineReducers({
  user: userReducer,
  order:orderReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
