import React from 'react';
import Dashboard from '../Screens/Dashboard';
import Reports from '../Screens/Reports';
import HolidaysList from '../Screens/HolidaysList';
import CustomDrawer from './CustomDrawer';
import Profile from '../Screens/Profile';
import {DrawerContent, createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../Screens/Home';
import BottomTabNavigator from './BottomTabNavigator';
import TimeTracker from '../Screens/TimeTracker';
import TimeSheet from '../Screens/TimeSheet';
import {Text} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Icons1 from 'react-native-vector-icons/MaterialIcons';
import Icons2 from 'react-native-vector-icons/MaterialIcons';
import Icons3 from 'react-native-vector-icons/MaterialIcons';
import Icons4 from 'react-native-vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();
const DrawerNavigator = props => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#022945',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-medium',
          fontSize: 18,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Icons name="home-outline" size={22} color={'white'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({color}) => (
            <Icons1 name="dashboard" size={22} color={'white'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Reports"
        component={Reports}
        options={{
          drawerIcon: ({color}) => (
            <Icons2 name="assessment" size={22} color={'white'} />
          ),
        }}
      />
      <Drawer.Screen
        name="HolidaysList"
        component={HolidaysList}
        options={{
          drawerIcon: ({color}) => (
            <Icons3 name="calendar-view-day" size={22} color={'white'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <Icons4 name="user-circle" size={22} color={'white'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
