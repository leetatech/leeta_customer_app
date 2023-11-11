import React, {FC, useMemo, useState, useEffect} from 'react';
import {View,Text} from 'react-native';
import createStyles from './styles';

const Otp = () => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View style={styles.container}>
      <Text style={styles.otp}>OTP Screen</Text>
    </View>
  );
};

export default Otp;
