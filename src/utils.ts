import axios, {AxiosResponse} from 'axios';

export const apiCall = async <T>(
  url: string,
  method: string,
  data?: any,
  header?: Record<string, string>
): Promise<T | undefined> => {
  try {
     const headers = header ? header : {};
    const response: AxiosResponse = await axios({
      method,
      url,
      data,
      headers
    });
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      throw {
        data: error.response?.data,
        message: error.message,
        isAxiosError: true,
      };
  }else {
    console.error('General error:', error);
    throw {
      isAxiosError: false,
    };
  }
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