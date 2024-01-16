import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {apiUrl} from '../../../config';
import {apiCall} from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface UserData {
  full_name: string;
  email: string;
  password: string;
  user_type: string;
}
export interface UserVerification {
  code: string;
  target: string | null | undefined;
}

export interface loginUserData {
  email: string;
  password: string;
  user_type: string;
}
export interface ForgotPasswordData {
  email: string;
}

export const signup = createAsyncThunk(
  'user/signup',
  async (userDetails: UserData, {rejectWithValue}) => {
    try {
      const url = apiUrl.signUp;
      const method = 'post';
      const response: any = await apiCall(url, method, userDetails);
      if (response.data !== undefined) {
        await AsyncStorage.setItem('userToken', response.data.auth_token);
      }else{
        console.log("token undefined")
      }
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

//verify otp
export const verifyOtp = createAsyncThunk(
  'user/verification',
  async (verifyUser: UserVerification, {rejectWithValue}) => {
    try {
      const url = apiUrl.otpVerification;
      const method = 'post';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(url, method, verifyUser, headers);
      return response as Record<string, Record<string, string> | string>;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
      }
    }
  },
);

//user login
export const login = createAsyncThunk(
  'user/login',
  async (loginDetails: loginUserData, {rejectWithValue}) => {
    try {
      const url = apiUrl.logIn
      const method = 'post';
      const response: any = await apiCall(url, method, loginDetails);
      if (response.data !== undefined) {
        await AsyncStorage.setItem('userToken', response.data.auth_token);
      }else{
        console.log("token undefined")
      }
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

//forgotPassword
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (forgotPasswordDetails: ForgotPasswordData, {rejectWithValue}) => {
    try {
      const url = apiUrl.forgotPassword
      const method = 'post';
      const response: any = await apiCall(url, method, forgotPasswordDetails);
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