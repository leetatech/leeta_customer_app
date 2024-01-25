import React, {FC, useMemo} from 'react';
import {View, Text} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import PaddedLayout from '../../Components/Layouts/PaddedLayout';
import createStyles from './style';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const Home: FC<IProps> = ({navigation}) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <PaddedLayout>
      <View style={styles.mainContainer}>
        <Text>Home Screen</Text>
      </View>
    </PaddedLayout>
  );
};

export default Home;
