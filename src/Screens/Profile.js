import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  Keyboard,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {baseurl} from '../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = () => {
  const navigation = useNavigation();
  const [modalVisable, setmodal] = useState(false);
  const [mobilenumbers, setmobilenumber] = useState('');
  const [oldpassword, setoldpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );

  function updatePassword() {
    setmodal(true);
  }

  function mobilenumber(text) {
    setmobilenumber(text);
  }
  function oldPassword(text) {
    setoldpassword(text);
  }
  function newPassword(text) {
    setnewpassword(text);
  }
  function confirmPassword(text) {
    setconfirmpassword(text);
  }
  function passwordchanging() {
    if (oldpassword != null && newpassword != null && confirmpassword != null) {
      const passwordd = {
        old_password: oldpassword,
        new_password: newpassword,
        confirm_password: confirmpassword,
      };
      console.log('password', passwordd);

      axios
        .post(`${baseurl}/api/user/change/password`, passwordd, {
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJlbXBsb3llZV9pZCI6OTgyLCJlbWFpbCI6ImNoYWxhbXBkckBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiU2ltaGFhYWFhIGNoYWxhbSIsImxhc3RfbmFtZSI6InRlc3QiLCJnZW5kZXIiOiJtYWxlIiwicGhvbmVfbnVtYmVyIjoiODQ2NDg5NDIwNiIsImJsb29kX2dyb3VwIjoiQisiLCJkb2IiOiIyOS1NYXItMTk5NiIsImRlcGFydG1lbnRfaWQiOjE1LCJkZXNpZ25hdGlvbl9pZCI6MzIsInBhc3N3b3JkIjoiJDJiJDEwJHJnLy85Ulh1RVlHc21XSlU5R0s4WWV1amlUMmlWREx5ZXVYU2U4cjVFbXA1N3hDMU1DdGEuIiwiaW1hZ2UiOm51bGx9XSwiaWF0IjoxNjg0OTM1ODg3fQ.9HyJ6XokPWWI8TpPFSMBHJx8WGtAt6pV6QnTgpvit9I',
          },
        })
        .then(response => console.log(response.data.response))
        .catch(error => console.log(error));
    }
  }
  function mobilenumberupdate() {
    if (mobilenumbers.length == 10) {
      const mobil = {phone_number: mobilenumbers};

      axios
        .post(`${baseurl}/api/user/profile/update`, mobil, {
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJlbXBsb3llZV9pZCI6OTgyLCJlbWFpbCI6ImNoYWxhbXBkckBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiU2ltaGFhYWFhIGNoYWxhbSIsImxhc3RfbmFtZSI6InRlc3QiLCJnZW5kZXIiOiJtYWxlIiwicGhvbmVfbnVtYmVyIjoiODQ2NDg5NDIwNiIsImJsb29kX2dyb3VwIjoiQisiLCJkb2IiOiIyOS1NYXItMTk5NiIsImRlcGFydG1lbnRfaWQiOjE1LCJkZXNpZ25hdGlvbl9pZCI6MzIsInBhc3N3b3JkIjoiJDJiJDEwJHJnLy85Ulh1RVlHc21XSlU5R0s4WWV1amlUMmlWREx5ZXVYU2U4cjVFbXA1N3hDMU1DdGEuIiwiaW1hZ2UiOm51bGx9XSwiaWF0IjoxNjg0OTM1ODg3fQ.9HyJ6XokPWWI8TpPFSMBHJx8WGtAt6pV6QnTgpvit9I',
          },
        })
        .then(response => console.log(response.data.response))
        .catch(error => console.log(error));
    }
  }
  // launchCamera(options, callback);

  // // You can also use as a promise without 'callback':
  // const result = await launchCamera(options);
  // launchImageLibrary(options?, callback)

  // // You can also use as a promise without 'callback':
  // const result = await launchImageLibrary(options?);
  useEffect(() => {
    const checktoken = async () => {
      try {
        const storedResponse = await AsyncStorage.getItem('loginResponse');
        if (storedResponse !== null) {
          console.log('--', storedResponse);
          navigation.navigate('Homes');
        }
      } catch (error) {
        console.log(error);
      }
    };
    checktoken();
  }, []);
  return (
    <>
      <View style={styles.drawerHeader}>
        <View style={{flex: 2, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={30} style={{}} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitle}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Profile Update</Text>
        </View>
        <Text style={styles.headerRight}></Text>
      </View>
      <View
        style={{
          marginTop: 10,

          height: 150,
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 125,
            width: 125,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Image
            style={{flex: 1, resizeMode: 'contain'}}
            source={require('../assets/images/profile-reg-p1.png')}
          />
        </View>
      </View>
      <View
        onTouchStart={() => Keyboard.dismiss()}
        style={{padding: 10, flex: 8}}>
        {/* <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 25, color: '#000000'}}>Profile Update</Text>
        </View> */}
        <View style={{justifyContent: 'space-evenly', flex: 6}}>
          <TextInput
            style={{borderWidth: 2, borderRadius: 8, fontSize: 20}}
            placeholder="Email"
            inputMode="email"
            editable={false}
          />
          <TextInput
            style={{borderWidth: 2, borderRadius: 8, fontSize: 20}}
            placeholder="Name"
            inputMode="text"
            editable={false}
          />
          <TextInput
            style={{borderWidth: 2, borderRadius: 8, fontSize: 20}}
            placeholder="DOB"
            inputMode="text"
            editable={false}
          />
          <TextInput
            style={{borderWidth: 2, borderRadius: 8, fontSize: 20}}
            placeholder="Phone Number"
            inputMode="numeric"
            editable={true}
            onChangeText={mobilenumber}
            value={mobilenumbers}
          />
          <TextInput
            style={{borderWidth: 2, borderRadius: 8, fontSize: 20}}
            placeholder="Gender"
            inputMode="text"
            editable={false}
          />
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View>
            <TouchableOpacity onPress={() => setmodal(true)}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#000000',
                  borderWidth: 2,
                  padding: 8,
                  borderRadius: 5,
                  backgroundColor: 'lightblue',
                }}>
                Update Password
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={mobilenumberupdate}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#000000',
                  borderWidth: 2,
                  padding: 7,
                  borderRadius: 5,
                  backgroundColor: 'lightblue',
                }}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Modal
              statusBarTranslucent={true}
              transparent={true}
              visible={modalVisable}
              keyboardShouldPersistTaps="always">
              <View
                style={{
                  backgroundColor: '#000000aa',
                  flex: 1,
                }}>
                <View style={{flex: 2}}></View>

                <View
                  style={{
                    backgroundColor: 'white',
                    margin: 30,
                    borderRadius: 30,
                    flex: 6,
                    padding: 10,
                    borderWidth: 2,
                  }}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 22, color: '#000000'}}>
                      Change Password
                    </Text>
                  </View>
                  <View style={{flex: 7, justifyContent: 'space-evenly'}}>
                    <TextInput
                      onChangeText={oldPassword}
                      style={{borderWidth: 2, borderRadius: 8, fontSize: 20}}
                      placeholder="Old Password"></TextInput>
                    <TextInput
                      onChangeText={newPassword}
                      placeholder="new Password"
                      style={{
                        borderWidth: 2,
                        borderRadius: 8,
                        fontSize: 20,
                      }}></TextInput>
                    <TextInput
                      onChangeText={confirmPassword}
                      placeholder="confirm Password"
                      style={{
                        borderWidth: 2,
                        borderRadius: 8,
                        fontSize: 20,
                      }}></TextInput>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setmodal(false);
                        }}
                        style={{}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 20,
                            backgroundColor: 'lightblue',
                            borderWidth: 2,
                            borderRadius: 5,
                            padding: 5,
                          }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          console.log('press');
                          setmodal(false);
                        }}
                        style={{}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 20,
                            backgroundColor: 'lightblue',
                            borderWidth: 2,
                            borderRadius: 5,
                            padding: 5,
                          }}>
                          Add
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{flex: 2}}></View>
              </View>
            </Modal>
          </View>
          {/* <TouchableOpacity style={{}}>
            <Text style={{fontSize: 18, color: '#000000'}}>Cancel</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerHeader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 15,
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
export default Profile;
