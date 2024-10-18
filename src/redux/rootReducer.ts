import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './slices/auth/userSlice';
import cartReducer from './slices/cart/cartSlice';
import guestReducer from './slices/auth/guestSlice';
import orderReducer from './slices/order/orderSlice';

const rootReducer = combineReducers({
  user: userReducer,
  guest: guestReducer,
  cart: cartReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
