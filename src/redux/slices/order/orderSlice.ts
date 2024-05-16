import {createSlice} from '@reduxjs/toolkit';
import {feeType, gasRefill, productList} from './orderServices';

interface orderState {
  orderData: Record<string, string>;
  loading: boolean;
  error: boolean;
  errorCode?: number;
  message?: string;
  productListData?: Record<string, string>;
  productId? : string 
  productWeight?: number;
  productQuantity?: number;
  userCart?:Array<Record<string,any>>;
  feeTypeData? : Record<string, string>
  fee?: number;
  cartSummary? : number;

}

const initialState: orderState = {
  orderData: {},
  loading: false,
  error: false,
  message: '',
  errorCode: 0,
  productListData: {},
  productId: "",
  productWeight: 1,
  productQuantity : 1,
  userCart:[],
  feeTypeData:{},
  fee: 0,
  cartSummary:0
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setProductWeight: (state,action) => {
      state.productWeight = action.payload;
    },
    setProductQuantity: (state,action) => {
      state.productQuantity = action.payload;
    },
    setUserCart: (state,action) => {
      state.userCart?.push(action.payload);
    },
    updateCart: (state,action) => {
      state.userCart=action.payload;
    },
    sumCartFee: (state,action) => {
      state.cartSummary=action.payload;

    }
  
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
        state.productListData = action.payload as Record<string, string>;
        state.productId=action.payload.data.data[0].id
        console.log("Product id",state.productId,state.productListData)
      })
      .addCase(productList.rejected, (state) => {
        state.loading = false;
        state.error = true;
        console.log('err', state.error);
      })

      //FEE TYPE
    .addCase(feeType.pending, state => {
      state.loading = true;
      state.error = false;
    })
    .addCase(feeType.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.feeTypeData = action.payload as Record<string, string>;
      console.log("feeTypeData", JSON.stringify(state.feeTypeData, null, 2));
      state.fee = action.payload.data.data[0].cost.cost_per_kg;
      console.log("fee",state.fee)
    })
    .addCase(feeType.rejected, (state) => {
      state.loading = false;
      state.error = true;
      console.log('err', state.error);
    })
  },
});

export const {setProductWeight,setProductQuantity,setUserCart,updateCart,sumCartFee} = orderSlice.actions;

export default orderSlice.reducer;
