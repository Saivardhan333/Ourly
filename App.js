import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationNavigation from './src/Components/AuthenticationNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import Authentication from './src/Components/AuthenticationNavigation';
import DrawerNavigator from './src/Components/DrawerNavigators';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Authentication />
    </NavigationContainer>
  );
}
