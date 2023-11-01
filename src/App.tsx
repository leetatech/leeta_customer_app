import React from 'react';
import Screens from './Navigation';
import { colors } from './Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:colors.WHITE}}>
      <Screens />
    </SafeAreaView>
  );
}
