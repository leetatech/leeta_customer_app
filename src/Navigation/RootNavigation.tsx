import React, {useState} from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import Slider from '../Screens/OnboardingScreen/Slider/Slider';
import { 
  InitialScreen,
  CreateAccount, 
  Otp, 
  ForgotPassword, 
  EmailVerification, 
  SignIn, 
  CreateNewPassword,
  PasswordCreated,
  MarketPlace,
} from '../Screens';
import BottomNavigator from './BottomTab';

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
             <RootStack.Screen
              name="OTPInput"
              component={Otp}
              options={screenDefaultOptions}
            />
             <RootStack.Screen
              name="EmailVerification"
              component={EmailVerification}
              options={screenDefaultOptions}
            />
            <RootStack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={screenDefaultOptions}
            />
            <RootStack.Screen
              name="CreateNewPassword"
              component={CreateNewPassword}
              options={screenDefaultOptions}
            />
            <RootStack.Screen
              name="PasswordCreated"
              component={PasswordCreated}
              options={screenDefaultOptions}
            />
              <RootStack.Screen
              name="SignIn"
              component={SignIn}
              options={screenDefaultOptions}
            />
             <RootStack.Screen
              name="MarketPlace"
              component={MarketPlace}
              options={screenDefaultOptions}
            />
          </RootStack.Group>
          <RootStack.Screen
            name="BottomNavigator"
            component={BottomNavigator}
            options={screenDefaultOptions}
          />
        </RootStack.Navigator>
      )}
    </>
  );
}
