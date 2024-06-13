import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {addTocart, feeType, fees, productList, updateCartItemQuantity} from './orderServices';
import {ProductListResponse, FeeResponse, CartItemResponsePayload, ServiceFeesResponse} from './types';

interface orderState {
  loading: boolean;
  error: boolean;
  errorCode?: number;
  message?: string;
  productListData?: ProductListResponse;
  productId?: string;
  productWeight?: number;
  productQuantity?: number;
  userCart?: Array<Record<string, any>>;
  feeTypeData?: FeeResponse;
  fee?: number;
  cartData?: CartItemResponsePayload
  cartItemId?: string;
  newCartItemQuantity?: Record<string, string>
  listFees?: ServiceFeesResponse
  serviceFee?: number
}

const initialState: orderState = {
  loading: false,
  error: false,
  message: '',
  errorCode: 0,
  productListData: {},
  productId: '',
  productWeight: 1,
  productQuantity: 1,
  userCart: [],
  feeTypeData: {},
  fee: 0,
  cartData:{},
  cartItemId:"",
  newCartItemQuantity:{},
  listFees:{},
  serviceFee:0
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setProductWeight: (state, action) => {
      state.productWeight = action.payload;
    },
    setProductQuantity: (state, action) => {
      state.productQuantity = action.payload;
    },
    setUserCart: (state, action) => {
      state.userCart?.push(action.payload);
    },
    // updateCart: (state, action) => {
    //   state.userCart = action.payload;
    // },
    updateCart: (state, action) => {
      state.cartData = action.payload;
    },
    setCartItemId: (state, action) => {
      state.cartItemId = action.payload;
    },
    setServiceFee: (state, action) => {
      state.serviceFee = action.payload;
    }
  },
  extraReducers: builder => {
    builder

      //PRODUCT LIST
      .addCase(productList.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(productList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.productListData = action.payload;
        if (action.payload.data) {
          state.productId = action.payload.data.data[0].id;
        }
      })
      .addCase(productList.rejected, state => {
        state.loading = false;
        state.error = true;
      })

      //FEE TYPE
      .addCase(feeType.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(feeType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.feeTypeData = action.payload as FeeResponse;
        if (action.payload.data) {
          state.fee = action.payload.data?.data[0].cost.cost_per_kg;
        }
      })
      .addCase(feeType.rejected, state => {
        state.loading = false;
        state.error = true;
      })

      //ADD TO CART
      .addCase(addTocart.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addTocart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.cartData = action.payload as CartItemResponsePayload;
        console.log("Cart data", state.cartData)
      }) 
      .addCase(addTocart.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.errorCode = action.payload?.data?.error_code || 1;
        state.message = action.payload.data.message;
        console.log("ERROR MSG",state.message);
      })

      //UPDATTE ITEM QUANTITY
      .addCase(updateCartItemQuantity.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.newCartItemQuantity = action.payload!.data as Record<string, string>;
        console.log("NEW QUANTITY",JSON.stringify(state.newCartItemQuantity,null,2));
      }) 
      .addCase(updateCartItemQuantity.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.errorCode = action.payload?.data?.error_code || 1;
        state.message = action.payload.data.message;
        console.log("ERROR MSG",state.message);
      })

      //FEES
      .addCase(fees.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        if(action.payload.data){
          state.listFees = action.payload as ServiceFeesResponse
          console.log("LIST FEES",JSON.stringify(state.listFees,null,2));
        }
        // state.listFees = action.payload!.data as Record<string, string>
        // console.log("LIST FEES",JSON.stringify(state.listFees,null,2));

       
      }) 
      .addCase(fees.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.errorCode = action.payload?.data?.error_code || 1;
        state.message = action.payload.data.message;
        console.log("ERROR MSG",state.message);
      })
    },
      
});

export const {setProductWeight, setProductQuantity, setUserCart, updateCart,setCartItemId, setServiceFee} =
  orderSlice.actions;

export default orderSlice.reducer;
