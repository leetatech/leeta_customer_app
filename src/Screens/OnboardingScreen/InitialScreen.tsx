import React, {FC, useEffect, useMemo} from 'react';
import {View, Image, Text} from 'react-native';
import createStyles from './styles';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {LOGO} from '../../Assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {guestSession} from '../../utils'

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const InitialScreen: FC<IProps> = ({navigation}) => {

  // Function to determine the onboarding status and navigate accordingly
  const navigateBasedOnOnboardingStatus = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem('userOnboarding');
      const routeName = onboardingStatus === 'true' ? 'BottomNavigator' : 'Slider';

      navigation.reset({
        index: 0,
        routes: [{ name: routeName }],
      });
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  // Set up effect to handle user status on component mount
  useEffect(() => {
    const handleUserStatus = async () => {
      try {
        let onboardingStatus = await AsyncStorage.getItem('userOnboarding');
        if (!onboardingStatus) {
          await AsyncStorage.setItem('userOnboarding', 'false');
          onboardingStatus = 'false';
        }

        console.log(`Onboarding status: ${onboardingStatus}`);

        // Call refreshSession if needed
        await guestSession();

        // Delayed navigation to simulate a splash screen or initial loading
        setTimeout(navigateBasedOnOnboardingStatus, 2000);
      } catch (error) {
        console.error('Error handling user status:', error);
      }
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
