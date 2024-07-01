import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { addTocart, triggerCartList, productFee, serviceFee, productList, updateCartItemQuantity, CartData, getState } from './orderServices';
import {ProductListResponse, ProductFeeResponse, CartItemResponsePayload, FeesResponse, StateResponse } from './types';

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
  feeTypeData?: ProductFeeResponse;
  fee?: number;
  cartData?: CartItemResponsePayload
  cartItemId?: string;
  newCartItemQuantity?: Record<string, string>
  listFees?: FeesResponse
  serviceFee: number
  cartList:CartItemResponsePayload
  states:StateResponse
  userState?:string
  userLga?: string
  userMobile?: string
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
  serviceFee:0,
  cartList:{},
  states:{},
  userState:'',
  userLga: '',
  userMobile: ''
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
    updateCart: (state, action) => {
      state.cartData = action.payload;
    },
    setCartItemId: (state, action) => {
      state.cartItemId = action.payload;
    },
    setServiceFee: (state, action) => {
      state.serviceFee = action.payload;
    },
    updateUserState: (state, action) => {
      state.userState = action.payload;
      console.log("STATE", state.userState);
    },
    updateUserLga: (state, action) => {
      state.userLga = action.payload;
      console.log("LGA", state.userLga);
    },
    updateUserMobile: (state, action) => {
      state.userMobile = action.payload;
      console.log("MOBILE", state.userMobile);
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
        }else {
          console.log("PRODUCT_ID NOT IN FOUND",state.productId);
        }
      })
      .addCase(productList.rejected, state => {
        state.loading = false;
        state.error = true;
      })

      //PRODUCT FEE
      .addCase(productFee.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(productFee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.feeTypeData = action.payload as ProductFeeResponse;
        if (action.payload.data) {
          state.fee = action.payload.data?.data[0].cost.cost_per_kg;
        }
      })
      .addCase(productFee.rejected, state => {
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
        console.log("Cart",state.cartData);
      }) 
      .addCase(addTocart.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.errorCode = action.payload?.data?.error_code || 1;
        state.message = action.payload.data.message;
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
      }) 
      .addCase(updateCartItemQuantity.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.errorCode = action.payload?.data?.error_code || 1;
        state.message = action.payload.data.message;
      })

      //FEES
      .addCase(serviceFee.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(serviceFee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        if(action.payload.data){
          state.listFees = action.payload as FeesResponse
        }
  
      }) 
      .addCase(serviceFee.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.errorCode = action.payload?.data?.error_code || 1;
        state.message = action.payload.data.message;
      })

      //LIST CART
      .addCase(triggerCartList.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(triggerCartList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.cartList = action.payload.data as CartItemResponsePayload;
      })
      .addCase(triggerCartList.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.errorCode = action.payload?.data?.error_code || 1;
        state.message = action.payload.data.message;
      })

      //GET STATE
      .addCase(getState.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getState.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.states = action.payload as StateResponse
      })
      .addCase(getState.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.errorCode = action.payload?.data?.error_code || 1;
        state.message = action.payload.data.message;
        console.log("Error getting state",state.message)
      })

    },
      
});

export const {setProductWeight, setProductQuantity, setUserCart, updateCart,setCartItemId, setServiceFee,updateUserState,updateUserLga,updateUserMobile} =
  orderSlice.actions;

export default orderSlice.reducer;
