import React, {useMemo} from 'react';
import {View} from 'react-native';
import createStyles from './style';
import { LOADER } from '../../Assets/svgImages';

const CustomLoader = () => {
const styles = useMemo(() => createStyles(), []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.spinner_container}>
      <LOADER  width={50} />
      </View>
    </View>
  );
};

export default CustomLoader;
