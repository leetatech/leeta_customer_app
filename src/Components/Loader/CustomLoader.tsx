import React, {useEffect, useMemo} from 'react';
import {Animated,Easing,View} from 'react-native';
import createStyles from './style';
import { LOADER } from '../../Assets/svgImages';
const spinAnim = new Animated.Value(0);
const interpolateRotation = spinAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});
const animatedStyle = {
  transform: [{rotate: interpolateRotation}],
};
const CustomLoader = () => {
  const styles = useMemo(() => createStyles(), []);

  useEffect(() => {
    const resetAnimation = () => {
      spinAnim.setValue(0);
    };
    const startAnimation = () => {
      resetAnimation();
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 7000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ).start();
    };
    startAnimation();
  }, []);


  return (
    <View style={styles.spinner_container}>
      <Animated.View style={animatedStyle}>
        <LOADER width={50} />
      </Animated.View>
    </View>
  );
};

export default CustomLoader;
