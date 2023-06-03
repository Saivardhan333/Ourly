import React, {useState} from 'react';
import {
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Button,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerNavigators from '../Components/DrawerNavigators';
import Homes from './Homes';
import axios from 'axios';
import TimeTracker from './TimeTracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [modal, setmodal] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [showpassword, setshowpassword] = useState(true);
  const [checkValidEmail, setcheckValidEmail] = useState(false);
  const [Entrytext, setEntrytext] = useState(false);
  const [forgotemail, setforgotemail] = useState();

  const emailhandle = () => {
    const body = {email: email, password: password};
    const passwordvalidity = handlePasswordChange(password);

    if (checkValidEmail) {
      Alert.alert('Please enter a valid email address.');
    } else if (!passwordvalidity) {
      console.log(body);
      navigation.navigate(Homes);
      axios
        .post('http://192.168.0.207:4178/api/user/login/insert', body)
        .then(response => {
          const loginResponse = response?.data?.response;
          console.log('login data', loginResponse);
          // Store loginResponse in AsyncStorage
          AsyncStorage.setItem('loginResponse', JSON.stringify(loginResponse))
            .then(() => {
              console.log('loginResponse stored in AsyncStorage.');
            })
            .catch(error => {
              console.log(
                'Error storing loginResponse in AsyncStorage:',
                error,
              );
            });
          navigation.navigate(Homes);
        })
        .catch(error => {
          console.log('Something caused an error', error);
        });
    } else {
      Alert.alert(passwordvalidity);
    }
  };

  const handleEmailChange = text => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setemail(text);
    if (re.test(text)) {
      setcheckValidEmail(false);
    } else {
      setcheckValidEmail(true);
    }
  };
  const handlePasswordChange = text => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(text)) {
      return 'Password must not contain Whitespaces.';
    }

    // const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    // if (!isContainsUppercase.test(text)) {
    //   return 'Password must have at least one Uppercase Character.';
    // }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(text)) {
      return 'Password must have at least one Lowercase Character.';
    }
    // const isspecialCharRegex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    // if (!isspecialCharRegex.test(text)) {
    //   return 'password must contain atleast one special charecter';
    // }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(text)) {
      return 'Password must contain at least one Digit.';
    }

    const isValidLength = /^.{8,15}$/;
    if (!isValidLength.test(text)) {
      return 'Password must be 8-16 Characters Long.';
    }

    // const isContainsSymbol =
    //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    // if (!isContainsSymbol.test(value)) {
    //   return 'Password must contain at least one Special Symbol.';
    // }

    return null;
  };
  const hidepassword = () => {
    setEntrytext(!Entrytext);
  };
  function forgotpass(text) {
    setforgotemail(text);
  }
  function sendEmail() {
    const gg = {email: forgotemail};
    axios
      .post('http://192.168.0.207:4178/api/user/send/forget/password/link', gg)
      .then(response => console.log(response.data.response))
      .catch(error => console.log(error));
  }
  return (
    <View onTouchStart={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require('../assets/images/splash-bg.png')}
        style={{height: '100%', width: '100%'}}>
        <View style={styles.container}>
          <Image
            source={require('../assets/images/OurlyLogo.png')}
            style={{height: 130, width: 130, resizeMode: 'contain'}}></Image>
        </View>
        <View style={styles.login}>
          <Text style={styles.logintext}>Login</Text>
        </View>
        <View style={styles.userpass}>
          <View style={styles.user}>
            <TextInput
              style={styles.userinput}
              onChangeText={handleEmailChange}
              value={email}
              placeholder="Enter your email address"
              placeholderTextColor={(color = 'black')}></TextInput>
          </View>
          <View style={styles.pass}>
            <View>
              <TextInput
                style={styles.passinput}
                placeholder="Enter your Password"
                placeholderTextColor={(color = 'black')}
                secureTextEntry={!Entrytext}
                onChangeText={text => setpassword(text)}
                value={password}
                placeholderStyle={{padding: 20}}
                underlineColorAndroid="transparent"
              />
              <TouchableOpacity
                onPress={hidepassword}
                style={{position: 'absolute', right: 20, bottom: 12}}>
                <Icon
                  name={Entrytext ? 'eye' : 'eye-off'}
                  size={20}
                  style={{color: 'black'}}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: -2}}>
              <TouchableOpacity
                onPress={() => {
                  setmodal(true);
                }}>
                <Text style={styles.forg}>ForgotPassword</Text>
              </TouchableOpacity>
            </View>
            <Modal
              transparent={true}
              visible={modal}
              keyboardShouldPersistTaps="handled">
              <View style={{backgroundColor: '#000000aa', flex: 1}}>
                <View style={{flex: 2}}></View>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: '50%',
                    margin: 30,
                    borderRadius: 30,
                    flex: 6,
                  }}>
                  <View
                    style={{
                      flex: 3,
                    }}></View>
                  <View
                    style={{
                      flex: 8,
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <View>
                      <TextInput
                        style={styles.userinput}
                        onChangeText={forgotpass}
                        value={forgotemail}
                        placeholder="Enter your email address"
                        placeholderTextColor={(color = 'black')}></TextInput>
                    </View>
                    <Button title="Send Email" onPress={sendEmail}></Button>
                    <Button
                      title="Close"
                      onPress={() => {
                        setmodal(false);
                      }}>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: 'bold',
                          backgroundColor: 'gray',
                          width: 100,
                          height: 40,
                        }}>
                        close
                      </Text>
                    </Button>
                  </View>
                  <View
                    style={{
                      flex: 2,
                    }}></View>
                </View>
                <View style={{flex: 2}}></View>
              </View>
            </Modal>
          </View>

          <TouchableOpacity style={styles.Touch} onPress={emailhandle}>
            <Text style={styles.signin}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  login: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logintext: {
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'black',
  },
  userpass: {
    flex: 6,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  user: {
    flexDirection: 'row',
    marginTop: -100,
  },
  userinput: {
    borderWidth: 2,
    height: 50,
    width: 300,
    fontSize: 20,
    borderRadius: 10,
    paddingLeft: 10,
    color: 'black',
  },
  pass: {
    alignItems: 'flex-end',
    marginTop: -90,
  },
  passinput: {
    borderWidth: 2,
    height: 50,
    width: 300,
    fontSize: 20,
    borderRadius: 10,
    paddingLeft: 10,
    color: 'black',
  },
  Touch: {
    height: 40,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginTop: -50,
    borderRadius: 10,
  },
  signin: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  forg: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default Login;
