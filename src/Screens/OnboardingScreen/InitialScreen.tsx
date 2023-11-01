import React, {FC, useEffect, useMemo} from 'react';
import {View, Image, Text} from 'react-native';
import createStyles from './styles';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGO} from '../../Assets';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const InitialScreen: FC<IProps> = ({navigation}) => {
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('Slider');
      if (value != null) {
        navigation.navigate('CreateAccount');
      } else {
        navigation.navigate('Slider', {title: 'Slider'});
      }
    } catch (e) {
    }
  };
  useEffect(() => {
    setTimeout(getUser, 5000);
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
