import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {gasRefill, productList} from './orderServices';

interface orderState {
  orderData: Record<string, string>;
  loading: boolean;
  error: boolean;
  errorCode?: number;
  message?: string;
  productListData?: Record<string, string>;
  productId? : string 
  productWeight?: number;
  
}

const initialState: orderState = {
  orderData: {},
  loading: false,
  error: false,
  message: '',
  errorCode: 0,
  productListData: {},
  productId: "",
  productWeight: 0
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setProductWeight: (state,action) => {
      state.productWeight = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      //gas refill
      .addCase(gasRefill.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(gasRefill.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.orderData = action.payload.data as Record<string, string>;
      })
      .addCase(gasRefill.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //PRODUCT LIST
      .addCase(productList.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(productList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.productListData = action.payload as unknown as Record<string, string>;
        state.productId=action.payload.data.data[0].id
      })
      .addCase(productList.rejected, (state) => {
        state.loading = false;
        state.error = true;
        console.log('err', state.error);
      });
  },
});

export const {setProductWeight} = orderSlice.actions;

export default orderSlice.reducer;
