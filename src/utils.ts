import axios, {AxiosResponse} from 'axios';

export const apiCall = async <T>(
  url: string,
  method: string,
  data?: any,
  header?: Record<string, string>
): Promise<T | undefined> => {
  try {
    console.log("TOKEEEEN", header)
     const headers = header ? header : {};
    const response: AxiosResponse = await axios({
      method,
      url,
      data,
      headers
    });
    return response.data
  } catch (error) {
    throw error;
  }
};

export const maskEmail = (email: string ) => {
  const atIndex = email.indexOf('@');
  const visiblePart = email.slice(0, Math.min(6, atIndex));
  const maskedPart = email.slice(visiblePart.length, atIndex).replace(/./g, '*');
  return `${visiblePart}${maskedPart}${email.slice(atIndex)}`;
  };


