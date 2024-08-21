import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {apiUrl} from '../../../config';
import {apiCall} from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDataResponse } from './type';

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

export interface ResetPasswordData {
  confirm_password: string;
  email: string;
  password: string;
}
export interface ResendOtpData {
  email: string;
}
export interface UpdateUserData {
  addresses: {
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
  }[];
  dob: string;
  email: {
    address: string;
    verified: boolean;
  };
  first_name: string;
  has_pin: boolean;
  id: string;
  is_blocked: boolean;
  is_blocked_reason: string;
  last_name: string;
  phone: {
    number: string;
    primary: boolean;
    verified: boolean;
  };
  pin_blocked: boolean;
  status: string;
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
      } else {
        return null;
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
      const url = apiUrl.logIn;
      const method = 'post';
      const response: any = await apiCall(url, method, loginDetails);
      if (response.data !== undefined) {
        await AsyncStorage.setItem('userToken', response.data.auth_token);
        await AsyncStorage.setItem(
          'userInformation',
          JSON.stringify(response.data),
        );
      } else {
        return null;
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
      const url = apiUrl.forgotPassword;
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

//Password Reset
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (resetPasswordDetails: ResetPasswordData, {rejectWithValue}) => {
    try {
      const url = apiUrl.passwordReset;
      const method = 'post';
      const response: any = await apiCall(url, method, resetPasswordDetails);
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

//Resend Otp
export const resendOtp = createAsyncThunk(
  'user/resendOtp',
  async (resendOtpDetails: ResendOtpData, {rejectWithValue}) => {
    try {
      const url = apiUrl.resendOtp;
      const method = 'post';
      const response: any = await apiCall(url, method, resendOtpDetails);
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

//Get user data
export const triggerGetUserData = createAsyncThunk(
  'user/getUserData',
  async (_, {rejectWithValue}) => {
    try {
      const url = apiUrl.user;
      const method = 'get';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: any = await apiCall(url, method, undefined, headers);
      if (response.data !== undefined) {
        await AsyncStorage.setItem(
          'userAddress',
          JSON.stringify(response.data),
        );
      } else {
        return null;
      }
      return response as  UserDataResponse
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
//update user data
export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (userDataDetails: UpdateUserData, {rejectWithValue}) => {
    try {
      const url = apiUrl.user;
      const method = 'put';
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await apiCall(
        url,
        method,
        userDataDetails,
        headers,
      );
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
