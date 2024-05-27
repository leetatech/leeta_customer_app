import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {apiUrl} from '../../../config';
import {apiCall} from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProductListResponse, FeeResponse} from './types';

export interface FeeTypeData {
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
export interface CheckoutData {
  cost: number,
  product_id: string,
  quantity: number,
  weight: number
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

export const checkout = createAsyncThunk(
  'order/checkout',
  async (checkout: CheckoutData, {rejectWithValue}) => {
    try {
      const url = apiUrl.checkout
      const method = 'post';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, checkout, headers);
      return response as  Record<string, Record<string, string> | string>;
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
