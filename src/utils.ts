import axios, {AxiosResponse} from 'axios';

export const apiCall = async <T>(
  url: string,
  method: string,
  data?: any,
  header?: Record<string, string>,
): Promise<T | undefined> => {
  try {
    const headers = header ? header : {};
    const response: AxiosResponse = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      throw {
        data: error.response?.data,
        message: error.message,
        isAxiosError: true,
      };
    } else {
      console.error('General error:', error);
      throw {
        isAxiosError: false,
      };
    }
  }
};

export const maskEmail = (email: string) => {
  const atIndex = email.indexOf('@');
  const visiblePart = email.slice(0, Math.min(6, atIndex));
  const maskedPart = email
    .slice(visiblePart.length, atIndex)
    .replace(/./g, '*');
  return `${visiblePart}${maskedPart}${email.slice(atIndex)}`;
};

export const capitalizeFirstLetter = (word: string) => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const formattedDate = (timestamp: number) => {
  // Timestamp
  timestamp = 1728400175 * 1000; // Multiply by 1000 to convert seconds to milliseconds

  // Convert timestamp to a Date object
  const date = new Date(timestamp);

  // Get day of the week, day of the month, and month
  const options = {weekday: 'long', day: '2-digit', month: '2-digit'} as const;
  return `On ${date.toLocaleDateString('en-US', options).replace('/', ' - ')}`;
};
