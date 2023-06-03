import React from 'react';
import {View, Text, StyleSheet, FlatList, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const HolidaysList = () => {
  const holliday = [
    {
      's.no': 1,
      holidays: 'Republic Day',
      date: '26 January,2023',
      day: 'Thursday',
      id: 1,
    },
    {
      's.no': 2,
      holidays: 'Maha Shivaratri',
      date: '18 February,2023',
      day: 'Saturday',
      id: 2,
    },
    {
      's.no': 3,
      holidays: 'Holi',
      date: '08 March,2023',
      day: 'Wednesday',
      id: 3,
    },
    {
      's.no': 4,
      holidays: 'Ugadi',
      date: '22 March ,2023',
      day: 'Wednesday',
      id: 4,
    },
    {
      's.no': 5,
      holidays: 'Independence Day',
      date: '15 August,2023',
      day: 'Tuesday',
      id: 5,
    },
    {
      's.no': 6,
      holidays: 'Vinayaka Chavathi',
      date: '18 September,2023',
      day: 'Monday',
      id: 6,
    },
    {
      's.no': 7,
      holidays: 'Gandhi Jayanthi',
      date: '02 October,2023',
      day: 'Monday',
      id: 7,
    },
    {
      's.no': 8,
      holidays: 'Vijayadasami',
      date: '24 October,2023',
      day: 'Tuesday',
      id: 8,
    },
    {
      's.no': 9,
      holidays: 'Diwali',
      date: '13 November,2023',
      day: 'Monday',
      id: 9,
    },
    {
      's.no': 10,
      holidays: 'Christmas',
      date: '25 December,2023',
      day: 'Monday',
      id: 10,
    },
  ];
  return (
    <View style={styles.screen}>
      <View style={{height: 40}}>
        <Text
          style={{
            fontSize: 22,
            color: 'black',
            alignSelf: 'center',
          }}>
          HOLIDAY LIST
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}>
        <Text style={{flex: 3.5, fontSize: 22, color: 'black', paddingLeft: 5}}>
          Holiday
        </Text>
        <Text style={{flex: 2.5, fontSize: 22, color: 'black'}}>Day</Text>
        <Text style={{flex: 4, fontSize: 22, color: 'black'}}>Date</Text>
      </View>
      <FlatList
        data={holliday}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'black',
              marginTop: 20,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
            }}>
            <Text
              style={{
                flex: 3.5,
                color: 'white',
                fontSize: 14,
                paddingLeft: 5,
              }}>
              {item.holidays}
            </Text>
            <Text style={{flex: 2.5, color: 'white', fontSize: 14}}>
              {item.day}
            </Text>
            <Text
              style={{
                flex: 4,
                color: 'white',
                fontSize: 14,
              }}>
              {item.date}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    margin: 10,
  },
});
export default HolidaysList;
