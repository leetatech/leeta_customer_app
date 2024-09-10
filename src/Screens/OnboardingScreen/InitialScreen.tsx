import React, {FC, useEffect, useMemo} from 'react';
import {View, Image, Text} from 'react-native';
import createStyles from './styles';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {LOGO} from '../../Assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {apiUrl} from '../../config';
import {apiCall} from '../../utils';
import { useDispatch } from 'react-redux';
import { getGuestData } from '../../redux/slices/auth/guestServices';

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

  const dispatch = useDispatch();

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
  const handleGetGuestData = async () => {
    dispatch(getGuestData())
      .then(response => {
        const result = response.payload as any
        if (response && result && result.data) {
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error('Error getting guest data:', error);
      });
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
      if (!onboardingStatus) {
        await AsyncStorage.setItem('userOnboarding', 'false');
      }
      setTimeout(checkOnboardingStatus, 2000);
    };
    handleUserStatus();
    setGuestToken();
    handleGetGuestData()
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
