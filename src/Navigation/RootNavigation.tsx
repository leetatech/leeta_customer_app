import React, {useState} from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import Slider from '../Components/Slider/Slider';
import {CreateAccount, InitialScreen} from '../Screens';

type IProps = {
  defaultRoute: string;
};

const screenDefaultOptions: StackNavigationOptions = {
  headerShown: false,
  headerShadowVisible: false,
};

export default function RootNavigation({defaultRoute}: IProps) {
  const [initialRouteName] = useState(defaultRoute);
  const RootStack = createStackNavigator();

  return (
    <>
      {!!initialRouteName && (
        <RootStack.Navigator initialRouteName={initialRouteName}>
          <RootStack.Group>
            <RootStack.Screen
              name="InitialScreen"
              component={InitialScreen}
              options={screenDefaultOptions}
            />
            <RootStack.Screen
              name="Slider"
              component={Slider}
              options={screenDefaultOptions}
            />
            <RootStack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={screenDefaultOptions}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      )}
    </>
  );
}
