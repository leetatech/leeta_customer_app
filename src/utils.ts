import axios, {AxiosResponse, AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from "./config";

const storeInAsyncStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.debug(`storing ${key}`);
  } catch (error) {
    console.error('Failed to store data in AsyncStorage:', error);
  }
};

export const guestSession = async () => {
  try {
    const url = apiUrl.guest;
    const data = { device_id: "deviceId" };
    const guestSessionResponse = await apiCall(url, 'POST', data);
    if (guestSessionResponse) {
      await storeInAsyncStorage('guest_session', JSON.stringify(guestSessionResponse));
    }
  } catch (error) {
    console.error('Failed to refresh session:', error);
    throw error;
  }
};

const refreshSession = async () => {
  try {
    const url = apiUrl.guest;
    const data = { device_id: "deviceId" }
    const guestSessionResponse = await apiCall(url, 'POST', data);
    if (guestSessionResponse) {
      await storeInAsyncStorage('guest_session', JSON.stringify(guestSessionResponse));
    }
  } catch (error) {
    console.error('Failed to refresh session:', error);
    throw error;
  }
};

const handleAxiosError = async (error: AxiosError) => {
  if (axios.isAxiosError(error)) {
    console.error('Axios error:', error.response?.data);
    // Assign the inner `data` object to a variable
    const responseData = error.response?.data;
    const innerData = responseData?.data || {};

    const parsedError = {
      data: {
        error_code: innerData.error_code || responseData?.error_code || null,
        error_reference: innerData.error_reference || responseData?.error_reference || null,
        error_type: innerData.error_type || responseData?.error_type || null,
        internal_error_message: innerData.internal_error_message || responseData?.internal_error_message || null,
        message: innerData.message || responseData?.message || error.message,
      },
    };

    // Check for specific error code and type
    if (parsedError.data.error_code === 1019 || parsedError.data.error_type === 'ErrorUnauthorized') {
      console.debug('Refreshing authentication token');
      await refreshSession();
    }

    throw parsedError;
  } else {
    console.error('General error:', error);
    throw {
      message: (error as Error).message,
      isAxiosError: false,
    };
  }
};

export const apiCall = async <T>(
    url: string,
    method: string,
    data?: any,
    headers?: Record<string, string>
): Promise<T | undefined> => {
  try {
    console.debug(`making api call to ${url}`)
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data,
      headers: headers || {},
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error('Unexpected status code:', response.status);
      throw {
        data: response.data,
        status: response.status,
        isAxiosError: false,
      };
    }
  } catch (error) {
    await handleAxiosError(error as AxiosError);
  }
};


export const maskEmail = (email: string ) => {
  const atIndex = email.indexOf('@');
  const visiblePart = email.slice(0, Math.min(6, atIndex));
  const maskedPart = email.slice(visiblePart.length, atIndex).replace(/./g, '*');
  return `${visiblePart}${maskedPart}${email.slice(atIndex)}`;
  };

  export const capitalizeFirstLetter = (word:string) => {
    if (!word) return ''; 
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };