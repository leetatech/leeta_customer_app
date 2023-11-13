import React, {FC, useMemo} from 'react';
import {View, Text, Image} from 'react-native';
import carousel from '../../../data/carouselData';
import createStyles from './styles';
import Buttons from '../../../Components/Buttons/Buttons';
import AppIntroSlider from 'react-native-app-intro-slider';
import {colors} from '../../../Constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {SvgUri} from 'react-native-svg';
import { TouchableOpacity } from 'react-native';
interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const Slider: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <>
      <AppIntroSlider
        data={carousel}
        style={{flex: 1}}
        renderItem={({item}) => {
          return (
            <>
              <SafeAreaView style={styles.image_container}>
                <Image source={item.image} style={styles.boy} />
              </SafeAreaView>
              <>
                <View style={styles.contentContainer}>
                  <View style={styles.description_container}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description1}</Text>
                  <Text style={styles.description}> {item.description2}</Text>
                  </View>
                 
                </View>
              </>
            </>
          );
        }}
        activeDotStyle={{backgroundColor: colors.ORANGE}}
        dotStyle={{backgroundColor: colors.LGRAY}}
        showNextButton={false}
        showDoneButton={false}
      />
      <View style={styles.button_container}>
        <Buttons
          title="Create an account"
          disabled={false}
          onPress={() => navigation.navigate('CreateAccount')}
          buttonStyle={undefined}
          textStyle={undefined}
        />
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
        
      </View>
    </>
  );
};

export default Slider;
