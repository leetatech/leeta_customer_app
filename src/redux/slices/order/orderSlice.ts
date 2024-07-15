import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  addTocart,
  triggerCartList,
  productFee,
  serviceFee,
  productList,
  updateCartItemQuantity,
  getState,
  deliveryFee,
  triggerDeleteCartItem,
  triggerCheckout,
} from './orderServices';
import {
  ProductListResponse,
  ProductFeeResponse,
  CartItemResponsePayload,
  FeesResponse,
  StateResponse,
} from './types';

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
  cartData: CartItemResponsePayload;
  cartItemId?: string;
  newCartItemQuantity?: Record<string, string>;
  listFees?: FeesResponse;
  serviceFee: number;
  cartList: CartItemResponsePayload;
  states: StateResponse;
  userState?: string;
  userLga?: string;
  generatedDeliveryFee?: any;
  checkoutData?:any
  cartId?: string;
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
  cartData: {},
  cartItemId: '',
  newCartItemQuantity: {},
  listFees: {},
  serviceFee: 0,
  cartList: {},
  states: {},
  userState: '',
  userLga: '',
  generatedDeliveryFee: {},
  checkoutData:{},
  cartId: '',
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
      const { payload: itemId } = action;
      if (!state.cartData?.data?.cart_items) {
        return;
      }
      state.cartData.data.cart_items = state.cartData.data.cart_items.filter(
        item => item.id !== itemId
      );
    },
    setCartItemId: (state, action) => {
      state.cartItemId = action.payload;
    },
    setServiceFee: (state, action) => {
      state.serviceFee = action.payload;
    },
    updateUserState: (state, action) => {
      state.userState = action.payload;
    },
    updateUserLga: (state, action) => {
      state.userLga = action.payload;
    },
    setUserCartId: (state, action) => {
      state.cartId = action.payload;
      console.log(state.cartId)
    },
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
        state.newCartItemQuantity = action.payload!.data as Record<
          string,
          string
        >;
      })
      .addCase(
        updateCartItemQuantity.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = true;
          state.errorCode = action.payload?.data?.error_code || 1;
          state.message = action.payload.data.message;
        },
      )

      //FEES
      .addCase(serviceFee.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(serviceFee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        if (action.payload.data) {
          state.listFees = action.payload as FeesResponse;
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
      .addCase(
        triggerCartList.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = true;
          state.errorCode = action.payload?.data?.error_code || 1;
          state.message = action.payload.data.message;
        },
      )

      //GET STATE
      .addCase(getState.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getState.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.states = action.payload as StateResponse;
      })
      .addCase(getState.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.errorCode = action.payload?.data?.error_code || 1;
        state.message = action.payload.data.message;
      })

      //DELIVERY FEE
      .addCase(deliveryFee.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deliveryFee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.generatedDeliveryFee = action.payload as any;
      })
      .addCase(deliveryFee.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.errorCode = action.payload?.data?.error_code || 1;
        state.message = action.payload.data.message;
      })

      //DELETE CART ITEM
      .addCase(triggerDeleteCartItem.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(triggerDeleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = action.payload?.data
      })
      .addCase(
        triggerDeleteCartItem.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = true;
          state.errorCode = action.payload?.data?.error_code || 1;
          state.message = action.payload.data.message;
        },
      )

      //CHECKOUT
      .addCase(triggerCheckout.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(triggerCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = action.payload?.data
        state.checkoutData = action.payload
        console.log('CHECKOUT_SUCCESS', state.checkoutData)
      })
      .addCase(
        triggerCheckout.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = true;
          state.errorCode = action.payload?.data?.error_code || 1;
          state.message = action.payload.data.message;
          console.log('CHECKOUT_UNSUCCESS',state.message)

        },
      );
  },
});

export const {
  setProductWeight,
  setProductQuantity,
  setUserCart,
  updateCart,
  setCartItemId,
  setServiceFee,
  updateUserState,
  updateUserLga,
  setUserCartId
} = orderSlice.actions;

export default orderSlice.reducer;
