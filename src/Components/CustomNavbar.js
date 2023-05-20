import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import DrawerNavigator from './DrawerNavigators';
import {useNavigation} from '@react-navigation/native';

function CustomNavbar({name}) {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="bars" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.contain}>{name}</Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Icon name="logout" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
  },
  contain: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
export default CustomNavbar;
