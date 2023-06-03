import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../Screens/SplashScreen';
import Login from '../Screens/Login';

import BottomTabNavigato from './BottomTabNavigator';
import DrawerNavigators from './DrawerNavigators';

const Stack = createStackNavigator();

function AuthenticationNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Homes"
        component={DrawerNavigators}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default AuthenticationNavigation;
