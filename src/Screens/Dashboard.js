import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Dashboard = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.screen}>
        <Text>Dashboard Screen</Text>
      </View>
      <View></View>
    </>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Dashboard;
