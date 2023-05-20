import React from 'react';
import {useState} from 'react';
import {Text, View} from 'react-native';

const [options, setoptions] = useState([
  TimeTracker,
  TimeSheet,
  Dashboard,
  HolidaysList,
  Reports,
]);
const Headings = () => {
  return (
    <View>
      {/* {options.map((options, index) => (
        <Text>{options.name}</Text>
      ))} */}
      <Text>name</Text>
    </View>
  );
};
export default Headings;
