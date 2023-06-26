import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, TouchableOpacity} from 'react-native';
import TimeTracker from '../Screens/TimeTracker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TimeSheet from '../Screens/TimeSheet';

const BottomTab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          height: 50, // Specify the desired height here
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'TimeTracker') {
            iconName = focused
              ? 'clock-time-two-outline'
              : 'clock-time-two-outline';
          } else if (route.name === 'TimeSheet') {
            iconName = focused ? 'timetable' : 'timetable';
          }

          return <Icon name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}>
      <BottomTab.Screen
        name="TimeTracker"
        component={TimeTracker}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: focused ? 'blue' : 'black',
              }}>
              TimeTracker
            </Text>
          ),
        }}
      />
      <BottomTab.Screen
        name="TimeSheet"
        component={TimeSheet}
        options={{
          headerShown: false,
          // headerStyle: {
          //   backgroundColor: 'lightblue',
          //   height: 40,
          //   borderRadius: 10,
          // },
          // headerTitleStyle: {fontSize: 25, color: 'white'},
          // headerTitleAlign: 'center',
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: focused ? 'blue' : 'black',
              }}>
              TimeSheet
            </Text>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
export default BottomTabNavigator;
