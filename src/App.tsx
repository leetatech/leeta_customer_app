import React from 'react';
import Screens from './Navigation';
import { colors } from './Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './redux/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1, backgroundColor:colors.WHITE}}>
        <Screens />
      </SafeAreaView>
    </Provider>
  );
}
