import React, {FC, useMemo} from 'react';
import {View, Image, ImageSourcePropType} from 'react-native';
import carousel from '../../../data/carouselData';
import createStyles from './styles';
import Buttons from '../../../Components/Buttons/Buttons';
import AppIntroSlider from 'react-native-app-intro-slider';
import {colors} from '../../../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fonts from '../../../Constants/Fonts';
import DeviceInfo from 'react-native-device-info'

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
interface ICarouselItem {
  image: ImageSourcePropType;
  title: string;
  description1: string;
}

const Slider: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);

  const handleSkipOnboarding = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem('userOnboarding', 'true');
      const deviceId = DeviceInfo.getUniqueId();
      console.log('Device ID:', deviceId);
      await AsyncStorage.setItem('deviceID', await deviceId);
      navigation.navigate('BottomNavigator');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const handleNavigateToSignUp = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem('userOnboarding', 'true');
      const deviceId = DeviceInfo.getUniqueId();
      console.log('Device ID:', deviceId);
      await AsyncStorage.setItem('deviceID', await deviceId);
      navigation.navigate('CreateAccount');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const renderItem = ({item}: {item: ICarouselItem}) => (
    <>
      <SafeAreaView style={styles.image_container}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <View style={styles.contentContainer}>
          <View style={styles.description_container}>
            <Fonts type="boldBlack" style={styles.title}>
              {item.title}
            </Fonts>
            <Fonts type="smallText" style={styles.description}>
              {item.description1}
            </Fonts>
          </View>
        </View>
      </SafeAreaView>
    </>
  );

  return (
    <>
      <AppIntroSlider
        data={carousel}
        renderItem={renderItem}
        activeDotStyle={{backgroundColor: colors.ORANGE}}
        dotStyle={{backgroundColor: colors.LGRAY}}
        showNextButton={false}
        showDoneButton={false}
      />

      <View style={styles.button_container}>
        <Buttons
          title="Create an account"
          disabled={false}
          onPress={handleNavigateToSignUp}
          buttonStyle={undefined}
          textStyle={undefined}
        />
        <TouchableOpacity onPress={handleSkipOnboarding}>
          <Fonts type='normalText' style={styles.skip}>Skip</Fonts>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Slider;
