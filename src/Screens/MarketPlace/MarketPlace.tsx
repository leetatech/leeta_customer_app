import React, {FC, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import PaddedLayout from '../../Components/Layouts/PaddedLayout';
import {NAVIGATION_ICON} from '../../Assets/svgImages';
import createStyles from './style';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const MarketPlace: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <PaddedLayout>
      <TouchableOpacity onPress={navigation.goBack}>
        <NAVIGATION_ICON />
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        <Text>Market place</Text>
      </View>
    </PaddedLayout>
  );
};

export default MarketPlace;
