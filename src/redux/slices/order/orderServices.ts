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
  paging: {
    index: number;
    size: number;
  };
}

export interface DeliveryFeeData {
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

export const productList = createAsyncThunk(
  'order/productList',
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
  'order/productFee',
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
  'order/addTocart',
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
  'order/updateCartItemQuantity',
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
  'order/serviceFee',
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
  'order/cartList',
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
  'order/getState',
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
  'order/deliveryFee',
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
  'order/triggerDeleteCartItem',
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
