import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {triggerOrderList, triggerOrderDetails} from './orderServices';

interface orderState {
  orderList: {
    loading: boolean;
    error: boolean;
    message: string;
    data: Record<string, any>[];
  };
  orderDetails: {
    loading: boolean;
    error: boolean;
    message: string;
    data: Record<string, any>;
  };
  loading: boolean;
  error: boolean;
  errorCode?: number;
  message?: string;
  selectedOrderId: {id: number | null};
}

const initialState: orderState = {
  orderList: {
    loading: false,
    error: false,
    message: '',
    data: [],
  },
  orderDetails: {
    loading: false,
    error: false,
    message: '',
    data: {},
  },
  loading: false,
  error: false,
  errorCode: 0,
  message: '',
  selectedOrderId: {id: null},
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setSelectedOrderId: (state, action) => {
      state.selectedOrderId = action.payload;
    },
  },
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
        state.orderDetails.loading = true;
        state.orderDetails.error = false;
        state.orderDetails.data = {};
      })
      .addCase(triggerOrderDetails.fulfilled, (state, action) => {
        state.orderDetails.loading = false;
        state.orderDetails.error = false;
        state.orderDetails.data = action.payload;
      })
      .addCase(triggerOrderDetails.rejected, state => {
        state.orderDetails.loading = true;
        state.orderDetails.error = false;
        state.orderDetails.data = {};
      });
  },
});

export const {setSelectedOrderId} = orderSlice.actions;

export default orderSlice.reducer;
