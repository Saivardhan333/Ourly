import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

const SplashScreen = ({navigation}) => (
  <>
    <ImageBackground
      source={require('../assets/images/splash-bg.png')}
      style={{height: '100%', width: '100%'}}>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/OurlyLogo.png')}
          style={{height: 130, width: 130, resizeMode: 'contain'}}></Image>
      </View>
      <View style={styles.containers}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View>
            <Text style={styles.terms}>Terms and Conditions</Text>
          </View>
        </TouchableOpacity>
        {/* <Button title="terms" onPress={() => alert(10)}></Button> */}
      </View>
    </ImageBackground>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,

    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  containers: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  terms: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SplashScreen;
