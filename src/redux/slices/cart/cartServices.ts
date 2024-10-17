import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {apiUrl} from '../../../config';
import {apiCall} from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ProductListResponse,
  ProductFeeResponse,
  CartItemResponsePayload,
  FeesResponse,
  StateResponse,
} from './types';

export interface FeeTypeData {
  filter: {
    fields: {
      name: string;
      operator: string;
      value: string;
    }[];
    operator: string;
  };
  paging: {
    index: number;
    size: number;
  };
}

export interface CartData {
  cost: number;
  product_id: string;
  quantity: number;
  weight: number;
}
export interface CartItemQuantityData {
  cart_item_id: string;
  quantity: number;
}

export interface FeesData {
  filter: {
    fields: {
      name: string;
      operator: string;
      value: string;
    }[];
    operator: string;
  };
  paging: {
    index: number;
    size: number;
  };
}

export interface PaginationData {
  // filter: {
  //   fields: {
  //     name: string;
  //     operator: string;
  //     value: string;
  //   }[];
  //   operator: string;
  // };
  paging: {
    index: number;
    size: number;
  };
}

export interface DeliveryFeeData {
  filter: {
    fields: [
      {
        name: string;
        operator: 'isEqualTo';
        value: string;
      },
      {
        name: string;
        operator: 'isEqualTo';
        value: string;
      },
    ];
    operator: string;
  };
  paging: {
    index: number;
    size: number;
  };
}

export interface CheckoutData {
  cart_id: string;
  delivery_details: {
    address: {
      city: string;
      closest_landmark: string;
      coordinate: {
        latitude: number;
        longitude: number;
      };
      full_address: string;
      lga: string;
      state: string;
      verified: boolean;
    };
    email: string;
    name: string;
    phone: string;
  };
  delivery_fee: number;
  payment_method: string;
  service_fee: number;
  total_fee: number;
}

export const productList = createAsyncThunk(
  'cart/productList',
  async (productList: PaginationData, {rejectWithValue}) => {
    try {
      const url = apiUrl.productList;
      const method = 'put';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, productList, headers);
      return response as ProductListResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        throw error;
      }
    }
  },
);

export const productFee = createAsyncThunk(
  'cart/productFee',
  async (feeType: FeeTypeData, {rejectWithValue}) => {
    try {
      const url = apiUrl.feesType;
      const method = 'put';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, feeType, headers);
      return response as ProductFeeResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        throw error;
      }
    }
  },
);

export const addTocart = createAsyncThunk(
  'cart/addTocart',
  async (cart: CartData, {rejectWithValue}) => {
    try {
      const url = apiUrl.cartAdd;
      const method = 'post';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, cart, headers);
      return response as CartItemResponsePayload;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        throw error;
      }
    }
  },
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async (cartItemQuantity: CartItemQuantityData, {rejectWithValue}) => {
    try {
      const url = apiUrl.cartItemQuantity;
      const method = 'put';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, cartItemQuantity, headers);
      return response as Record<string, Record<string, string> | string>;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        throw error;
      }
    }
  },
);

export const serviceFee = createAsyncThunk(
  'cart/serviceFee',
  async (fee: FeesData, {rejectWithValue}) => {
    try {
      const url = apiUrl.feesType;
      const method = 'put';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, fee, headers);
      return response as FeesResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        throw error;
      }
    }
  },
);

export const triggerCartList = createAsyncThunk(
  'cart/cartList',
  async (cartList: PaginationData, {rejectWithValue}) => {
    try {
      const url = apiUrl.listCart;
      const method = 'put';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, cartList, headers);
      return response as CartItemResponsePayload;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        throw error;
      }
    }
  },
);

export const getState = createAsyncThunk(
  'cart/getState',
  async (_, {rejectWithValue}) => {
    try {
      const url = apiUrl.getStates;
      const method = 'get';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, undefined, headers);
      return response as StateResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        throw error;
      }
    }
  },
);

export const deliveryFee = createAsyncThunk(
  'cart/deliveryFee',
  async (deliveryFeePayload: DeliveryFeeData, {rejectWithValue}) => {
    try {
      const url = apiUrl.feesType;
      const method = 'put';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, deliveryFeePayload, headers);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        throw error;
      }
    }
  },
);

export const triggerDeleteCartItem = createAsyncThunk(
  'cart/triggerDeleteCartItem',
  async (id: string, {rejectWithValue}) => {
    try {
      const url = `${apiUrl.deleteCartItem}/${id}`;
      const method = 'delete';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, id, headers);
      return response as Record<string, string>;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        throw error;
      }
    }
  },
);

export const triggerCheckout = createAsyncThunk(
  'cart/triggerCheckout',
  async (checkout: CheckoutData, {rejectWithValue}) => {
    try {
      const url = apiUrl.checkout;
      const method = 'post';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, checkout, headers);
      return response as any;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response || error.response);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        throw error;
      }
    }
  },
);
