import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {apiUrl} from '../../../config';
import {apiCall} from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GasRefillData {
  cost: number;
  product_id: string;
  quantity: number;
  weight: number;
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


interface FilterField {
  name: string;
  operator: string;
  value: string;
}

interface Filter {
  operator: string;
  fields: FilterField[];
}

interface Paging {
  index: number;
  size: number;
  total: number;
}

interface Metadata {
  filter: Filter;
  paging: Paging;
}

interface DataItem {
  id: string;
  parent_category: string;
  name: string;
  description: string;
  status: string;
  status_ts: number;
  ts: number;
}

export interface ApiResponse {
  data: {
      metadata: Metadata;
      data: DataItem[];
  };
}



export const gasRefill = createAsyncThunk(
  'order/gas_refill',
  async (gasRefillDetails: GasRefillData, {rejectWithValue}) => {
    try {
      const url = apiUrl.cart;
      const method = 'post';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, gasRefillDetails, headers);
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

export const productList = createAsyncThunk(
  'order/productList',
  async (productList: ProductListingData, {rejectWithValue}) => {
    try {
      const url = apiUrl.productList;
      const method = 'post';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, productList, headers);
      
   return response as ApiResponse;

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
