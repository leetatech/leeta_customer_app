import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {apiUrl} from '../../../config';
import {apiCall} from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PaginationData {
  //   filter: {
  //     fields: [
  //       {
  //         keys: ['string'];
  //         name: 'string';
  //         operator: 'beginsWith';
  //         value: 'string';
  //       },
  //     ];
  //     operator: 'and';
  //   };
  paging: {
    index: number;
    size: number;
  };
  //   sorting: {
  //     column: 'string';
  //     direction: 'desc';
  //   };
}

export const triggerOrderList = createAsyncThunk(
  'order/order_list',
  async (data: PaginationData, {rejectWithValue}) => {
    try {
      const url = apiUrl.getOrders;
      const method = 'put';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = (await apiCall(
        url,
        method,
        data,
        headers,
      )) as unknown as Record<string, any>;
      return response.data;
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

export const triggerOrderDetails = createAsyncThunk(
  'order/order_details',
  async (orderid: number, {rejectWithValue}) => {
    try {
      const url = `${apiUrl.getOrders}/${orderid}`;
      const method = 'get';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, undefined, headers) as unknown as Record<string, any>;
      return response.data;
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

export const triggerOrderStatusHistory = createAsyncThunk(
  'order/order_status_history',
  async (orderid: number, {rejectWithValue}) => {
    try {
      const url = `${apiUrl.getOrderStatusHistory}/${orderid}`;
      const method = 'get';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = (await apiCall(
        url,
        method,
        undefined,
        headers,
      )) as unknown as Record<string, any>;
      console.log(response)
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
