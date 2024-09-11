import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './slices/auth/userSlice';
import orderReducer from './slices/order/orderSlice';
import guestReducer from './slices/auth/guestSlice';


const rootReducer = combineReducers({
  user: userReducer,
  guest: guestReducer,
  order:orderReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
