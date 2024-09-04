import React, {FC, useEffect, useMemo} from 'react';
import {View, Image, Text} from 'react-native';
import createStyles from './styles';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {LOGO} from '../../Assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {apiUrl} from '../../config';
import {apiCall} from '../../utils';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

interface GuestSessionData {
  session_id: string;
  device_id: string;
  token: string;
}

interface GuestSessionResponse {
  data: GuestSessionData;
}
const InitialScreen: FC<IProps> = ({navigation}) => {
  const setGuestToken = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const payLoad = {
        device_id: deviceId,
        location: {
          latitude: 0,
          longitude: 0,
        },
      };
      const url = apiUrl.guest;
      const data = payLoad;
      const method = 'post';
      const guestSessionResponse = (await apiCall(
        url,
        method,
        data,
      )) as GuestSessionResponse;
      const guestToken = guestSessionResponse.data.token;
      await AsyncStorage.setItem('userToken', guestToken);
    } catch (error) {
      console.error('Failed to refresh session:', error);
      throw error;
    }
  };

  const checkOnboardingStatus = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem('userOnboarding');
      const routeName =
        onboardingStatus === 'true' ? 'BottomNavigator' : 'Slider';
      navigation.reset({
        index: 0,
        routes: [{name: routeName}],
      });
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  useEffect(() => {
    const handleUserStatus = async () => {
      let onboardingStatus = await AsyncStorage.getItem('userOnboarding');
      console.log(`onboarding status: ${onboardingStatus});`);
      if (!onboardingStatus) {
        await AsyncStorage.setItem('userOnboarding', 'false');
      }
      setTimeout(checkOnboardingStatus, 2000);
    };
    handleUserStatus();
    setGuestToken();
  }, []);

  const styles = useMemo(() => createStyles(), []);

  return (
    <>
      <View style={styles.body}>
        <Image source={LOGO} />
      </View>
      <View style={styles.sub_container}>
        <Text style={styles.description}>Your reliable kitchen assistant.</Text>
      </View>
    </>
  );
};

export default InitialScreen;
