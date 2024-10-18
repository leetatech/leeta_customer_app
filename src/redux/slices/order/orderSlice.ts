import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {triggerOrderList, triggerOrderDetails} from './orderServices';

interface orderState {
  orderList: {
    loading: boolean;
    error: boolean;
    message: string;
    data: Record<string, any>[];
  };
  loading: boolean;
  error: boolean;
  errorCode?: number;
  message?: string;
}

const initialState: orderState = {
  orderList: {
    loading: false,
    error: false,
    message: '',
    data: [],
  },
  loading: false,
  error: false,
  errorCode: 0,
  message: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      //ORDERS LIST
      .addCase(triggerOrderList.pending, state => {
        state.orderList.loading = true;
        state.orderList.error = false;
        state.orderList.data = [];
      })
      .addCase(triggerOrderList.fulfilled, (state, action) => {
        state.orderList.loading = false;
        state.orderList.error = false;
        state.orderList.data = action.payload.data;
      })
      .addCase(triggerOrderList.rejected, state => {
        state.orderList.loading = false;
        state.orderList.error = true;
        state.orderList.data = [];
      })

      //ORDER DETAILS
      .addCase(triggerOrderDetails.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(triggerOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(triggerOrderDetails.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
