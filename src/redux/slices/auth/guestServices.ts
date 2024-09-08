import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {apiUrl} from '../../../config';
import {apiCall} from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

export interface GuestData {
  address: {
    address_type: string;
    city: string;
    closest_landmark: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
    default_delivery_address: boolean;
    full_address: string;
    lga: string;
    state: string;
    verified: boolean;
  };
  default_delivery_address: boolean;
  device_id: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  number: string;
}

export const updateGuestData = createAsyncThunk(
  'user/updateUserData',
  async (guestDataDetails: GuestData, {rejectWithValue}) => {
    try {
      const url = apiUrl.guest;
      const method = 'put';
      const token = await AsyncStorage.getItem('userToken');

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, guestDataDetails, headers);

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

export const getGuestData = createAsyncThunk(
  'user/getGuestData',
  async (_, {rejectWithValue}) => {
    const deviceId = await DeviceInfo.getUniqueId();
    console.log('device id:', deviceId);
    try {
      const url = `${apiUrl.guest}/${deviceId}`;
      const method = 'get';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: any = await apiCall(url, method, undefined, headers);
      if (response.data !== undefined) {
        await AsyncStorage.setItem(
          'userInformation',
          JSON.stringify(response.data),
        );
      } else {
        return null;
      }
      return response as any;
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
