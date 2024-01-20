import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DashboardLayout} from '../Screens';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {DASHBOARD, SETTINGS, SHOPPING_CART} from '../Assets';
import {View, Image} from 'react-native';
import {colors} from '../Constants/Colors';
import AccountSettings from '../Screens/Settings/Settings';

const barOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: '',
};
const Tab = createBottomTabNavigator();
const Dashboard = createNativeStackNavigator();
const OrderStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

export const OrderStacks = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="Orders"
        component={DashboardLayout}
        options={{headerShown: false, headerTitle: ''}}
      />
    </OrderStack.Navigator>
  );
};

const DashboardStack = () => {
  return (
    <Dashboard.Navigator>
      <Dashboard.Screen
        name="DashboardLayout"
        component={DashboardLayout}
        options={{headerShown: false, headerTitle: ''}}
      />
    </Dashboard.Navigator>
  );
};

const UserSettings = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{headerShown: false, headerTitle: ''}}
      />
    </SettingsStack.Navigator>
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
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={DASHBOARD}
                alt="icon"
                resizeMode="contain"
                style={{
                  tintColor: focused ? colors.ORANGE : colors.LGRAY,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Order"
        component={OrderStacks}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={SHOPPING_CART}
                alt="icon"
                resizeMode="contain"
                style={{
                  tintColor: focused ? colors.ORANGE : colors.LGRAY,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={UserSettings}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={SETTINGS}
                alt="icon"
                resizeMode="contain"
                style={{
                  tintColor: focused ? colors.ORANGE : colors.LGRAY,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigator;

const getTabVisibility = (routes: any): string => {
  const routeName = getFocusedRouteNameFromRoute(routes) ?? 'Home';
  console.log('visibility', routeName);

  const hideRouteTab = ['OrderDetails', 'OrderDetails'];
  if (hideRouteTab.indexOf(routeName)) {
    return 'none';
  }
  return 'flex';
};
