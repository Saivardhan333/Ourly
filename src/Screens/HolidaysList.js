import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const HolidaysList = () => {
  return (
    <View style={styles.screen}>
      <Text>HolidaysList Screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HolidaysList;
