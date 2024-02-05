import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../Screens';
import {colors} from '../Constants/Colors';
import {SvgIcon} from '../Components/icons';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();


export const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false, headerTitle: ''}}
      />
    </HomeStack.Navigator>
  );
};


const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarInactiveTintColor: colors.LGRAY,
        tabBarActiveTintColor: colors.ORANGE,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreens}
        options={{
          tabBarIcon: ({focused}) => (
            <SvgIcon
              size={24}
              fill={focused ? colors.ORANGE : colors.LGRAY}
              pathData="M10.6798 18.6189V13.2856H14.9533V18.6189H20.2952V11.5078H23.5003L12.8166 3.50781L2.13281 11.5078H5.33794V18.6189H10.6798Z"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigator;
