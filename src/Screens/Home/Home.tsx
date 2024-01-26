import React, {FC} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import GoogleMap from '../GoogleMap/GoogleMap';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const Home: FC<IProps> = ({navigation}) => {
  return <GoogleMap />;
};
export default Home;
