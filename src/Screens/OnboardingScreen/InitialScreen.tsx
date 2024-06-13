import React, {FC, useEffect, useMemo} from 'react';
import {View, Image, Text} from 'react-native';
import createStyles from './styles';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {LOGO} from '../../Assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const InitialScreen: FC<IProps> = ({navigation}) => {

  const checkOnboardingStatus = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem('userOnboarding');
      const routeName =
        onboardingStatus === 'true' ? 'SignIn' : 'Slider';
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
