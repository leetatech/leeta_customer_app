import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';

export default function Screens() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
