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
} from './cartServices';
import {
  ProductListResponse,
  ProductFeeResponse,
  CartItemResponsePayload,
  FeesResponse,
  StateResponse,
} from './types';

interface cartState {
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
  serviceFeePerOrder: number;
  cartList: CartItemResponsePayload;
  states: StateResponse;
  userState?: string;
  userLga?: string;
  generatedDeliveryFee?: any;
  checkoutData?: any;
  cartId?: string;
  userDeliveryInformation: Record<string, string>;
  userDeliveryFee?: number;
}

const initialState: cartState = {
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
  serviceFeePerOrder: 0,
  cartList: {},
  states: {},
  userState: '',
  userLga: '',
  generatedDeliveryFee: {},
  checkoutData: {},
  cartId: '',
  userDeliveryInformation: {
    contactName: '',
    phoneNumber: '',
    address: '',
    userState: '',
    userLga: '',
    additionalInfo: '',
  },
  userDeliveryFee: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
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
      const payload = action.payload;
      if (!state.cartList?.data?.cart_items) {
        return;
      }
      if (typeof payload === 'object' && payload.data) {
        state.cartList.data.cart_items = payload.data.cart_items;
      } else if (typeof payload === 'string') {
        state.cartList.data.cart_items = state.cartList.data.cart_items.filter(
          item => item.id.toString() !== payload,
        );
      }
    },
    setCartItemId: (state, action) => {
      state.cartItemId = action.payload;
    },
    setServiceFee: (state, action) => {
      state.serviceFeePerOrder = action.payload;
    },
    updateUserState: (state, action) => {
      state.userState = action.payload;
    },
    updateUserLga: (state, action) => {
      state.userLga = action.payload;
    },
    setUserCartId: (state, action) => {
      state.cartId = action.payload;
    },
    updateUserDeliveryFee: (state, action) => {
      state.userDeliveryFee = action.payload;
    },

    setUserDeliveryInformation: (state, action) => {
      state.userDeliveryInformation = {
        ...state.userDeliveryInformation,
        ...action.payload,
      };
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
        state.cartList = action.payload as CartItemResponsePayload;
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
        state.message = action.payload?.data;
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
        state.message = action.payload?.data.message;
        state.checkoutData = action.payload;
      })
      .addCase(
        triggerCheckout.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = true;
          const payload = action.payload;
          if (payload && payload.data) {
            state.errorCode = payload.data.error_code || 1;
            state.message = payload.data.message;
          } else if (typeof payload === 'string') {
            state.message = payload;
          }
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
  setUserCartId,
  setUserDeliveryInformation,
  updateUserDeliveryFee,
} = cartSlice.actions;

export default cartSlice.reducer;
