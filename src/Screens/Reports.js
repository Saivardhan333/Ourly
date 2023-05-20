import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const Reports = () => {
  return (
    <View style={styles.screen}>
      <Text>Reports Screen</Text>
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
export default Reports;
