import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Login';
import TimeTracker from './TimeTracker';

function Logout({navigation}) {
  useEffect(() => {
    console.log('LogOut Screen');
    const removeAllDataFromAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage data removed successfully.');
        navigation.navigate('Login');
      } catch (error) {
        console.log('Error removing AsyncStorage data:', error);
      }
    };
    removeAllDataFromAsyncStorage();
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Logging Out...</Text>
    </View>
  );
}

export default Logout;
