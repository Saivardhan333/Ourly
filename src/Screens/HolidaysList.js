import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {baseurl} from '../utils/urls';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
const HolidaysList = ({navigation}) => {
  const [holliday, setholliday1] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseurl}/api/holidays/get/all/list`)
      .then(response => {
        setholliday1(response.data.response);
      })
      .catch(error => console.log(error));
    setLoading(false);
  }, []);
  return (
    <View style={styles.screen}>
      <View style={styles.drawerHeader}>
        <View style={{flex: 2, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={30} style={{}} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitle}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Holidays List</Text>
        </View>
        <Text style={styles.headerRight}></Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginTop: 10,
          elevation: 8,
        }}>
        <Text style={{flex: 3.5, fontSize: 22, color: 'black', paddingLeft: 5}}>
          Holiday
        </Text>
        <Text style={{flex: 2.5, fontSize: 22, color: 'black'}}>Day</Text>
        <Text style={{flex: 4, fontSize: 22, color: 'black'}}>Date</Text>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="Black" />
        </View>
      ) : (
        <FlatList
          data={holliday}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                marginTop: 20,
                elevation: 6,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
              }}>
              <Text
                style={{
                  flex: 3.5,
                  color: 'black',
                  fontSize: 14,
                  paddingLeft: 5,
                }}>
                {item.holidays}
              </Text>
              <Text style={{flex: 2.5, color: '#000000', fontSize: 14}}>
                {item.day}
              </Text>
              <Text
                style={{
                  flex: 4,
                  color: '#000000',
                  fontSize: 14,
                }}>
                {item.date}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    margin: 10,
  },
  drawerHeader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 10,
  },
  headerTitle: {
    flex: 6,
    // paddingLeft: 60,
    alignItems: 'center',
  },
  headerRight: {
    flex: 2,
  },
});
export default HolidaysList;
