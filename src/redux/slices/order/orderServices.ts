import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {apiUrl} from '../../../config';
import {apiCall} from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProductListResponse, FeeResponse, CartItemResponsePayload, ServiceFeesResponse} from './types';

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

export interface ProductListingData {
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
  cost: number,
  product_id: string,
  quantity: number,
  weight: number
}
export interface CartItemQuantityData {
  
  cart_item_id: string,
    quantity: number
  
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

export const productList = createAsyncThunk(
  'order/productList',
  async (productList: ProductListingData, {rejectWithValue}) => {
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

export const feeType = createAsyncThunk(
  'order/feeType',
  async (feeType: FeeTypeData, {rejectWithValue}) => {
    try {
      const url = apiUrl.feesType;
      const method = 'put';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, feeType, headers);
      return response as FeeResponse;
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
      const url = apiUrl.cartAdd
      const method = 'post';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, cart, headers);
      return response as  CartItemResponsePayload;
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
      return response as  Record<string, Record<string, string> | string>;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        console.log("ERROR",error.message)
        return rejectWithValue(error.message);
      } else {
        throw error;
      }
    }
  },
);

export const fees = createAsyncThunk(
  'order/fees',
  async (fee: FeesData, {rejectWithValue}) => {
    try {
      const url = apiUrl.feesType
      const method = 'put';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, fee, headers);
      return response as  ServiceFeesResponse;
      // return response as  Record<string, Record<string, string> | string>;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        console.log("ERROR",error.message)
        return rejectWithValue(error.message);
      } else {
        throw error;
      }
    }
  },
);