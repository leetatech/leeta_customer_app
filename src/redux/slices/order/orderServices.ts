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
  'order/product_list',
  async (productListData:{
    paging: {
      index: number,
      size: number
    }
  }, {rejectWithValue}) => {
    try {
      const url = apiUrl.productList
      const method = 'post';
      const token = await AsyncStorage.getItem('userToken');
      console.log("Token:" + token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, productListData, headers);
      console.log("RESPONSE",JSON.stringify(response))
      return response as Record<string, Record<string, string> | string>;
    } catch (error) {
      console.log("error", error);
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
