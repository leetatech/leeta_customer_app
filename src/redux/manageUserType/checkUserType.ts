import AsyncStorage from '@react-native-async-storage/async-storage';

type UserType = 'Registered User' | 'Guest User' | 'Unknown User Type';

export const manageUserType = async (): Promise<UserType> => {
  try {
    const userInfo = await AsyncStorage.getItem('userInformation');
    const retrievedUserInfo = userInfo ? JSON.parse(userInfo) : null;

    if (!retrievedUserInfo) {
      return 'Unknown User Type';
    }
    if (
      retrievedUserInfo.body &&
      typeof retrievedUserInfo.body.email === 'object'
    ) {
      return 'Registered User';
    } else if (retrievedUserInfo.device_id) {
      return 'Guest User';
    } else {
      return 'Unknown User Type';
    }
  } catch (error) {
    console.error('Error managing user type:', error);
    return 'Unknown User Type';
  }
};

export const user = {
  guest : 'Guest User',
  registered : 'Registered User',
  unknown : 'Unknown User Type'
}
