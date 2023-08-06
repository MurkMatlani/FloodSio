import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Dropdown from '../Components/DropDwon';
import { COLOURS } from '../Components/ThemeColours';
import { MainAppContext } from '../Context/MainAppContext';

const Login = () => {
  const { email, setEmail, password, setPassword, onLogin, loader, setUserType, isPasswordShow,
    isPassword, clear } = useContext(MainAppContext);
  const navigation = useNavigation()
  return (
    <>
      <StatusBar backgroundColor={COLOURS.apple} barStyle='light-content' />
      <View style={styles.container}>
        <ImageBackground source={require('../Images/simple.jpg')} style={styles.image_back} >
          <ScrollView>
            <View style={{ height: 50 }}></View>
            <View style={styles.child_container}>
              <View style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 30 }}>
                <Text style={{ color: COLOURS.apple, fontSize: 30, fontWeight: "600", fontFamily: 'Ubuntu-Bold', }}>Welcome Back!</Text>
                <Text style={{ color: COLOURS.apple, fontSize: 30, fontWeight: "600", fontFamily: 'Ubuntu-Bold', }}>Floods</Text>
              </View>
              <View style={{ height: 50 }}></View>
              <Text style={styles.email_name}>Email</Text>
              <View style={styles.inpt_here}>
                <TextInput
                  onChangeText={(e) => setEmail(e)}
                  value={email}
                  placeholder='Your Email' placeholderTextColor={'grey'} style={styles.inpt} />
                <Image source={require('../Images/envelope.png')} style={styles.envelop_image} tintColor={COLOURS.apple} />
              </View>
              <Text style={styles.pswd_name}>Password</Text>
              <View style={styles.inpt_here}>
                <TextInput
                  onChangeText={(e) => setPassword(e)}
                  value={password}
                  secureTextEntry={!isPassword}
                  placeholder='Your Password' placeholderTextColor={'grey'} style={styles.inpt} />
                <TouchableOpacity onPress={isPasswordShow}><Image source={isPassword ? require('../Images/eye.png') : require('../Images/eye.png')} style={styles.envelop_image} tintColor={COLOURS.apple} /></TouchableOpacity>
              </View>
              <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end', }} onPress={() => { navigation.navigate('ForgotPassword'); clear(); }} activeOpacity={0.6}>
                <View style={styles.forgt_background}>
                  <Text style={styles.forget_password}>Forget Password ?</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.pswd_name}>User Type</Text>
              <Dropdown
                label="Select Type"
                data={[
                  { label: 'Admin', value: '1' },
                  { label: 'Donor', value: '2' },
                  { label: 'Vendor', value: '3' },
                  { label: 'Rider', value: '4' },
                ]} onSelect={(e) => {
                  setUserType(e.label);
                }} />

              <TouchableOpacity style={styles.btn} activeOpacity={0.6} onPress={onLogin}>
                {loader ? <ActivityIndicator /> : <Text style={styles.login_text}>Login Here</Text>}
              </TouchableOpacity>

              <TouchableOpacity style={{ width: '100%', marginVertical: 20, alignItems: 'center' }} onPress={() => {
                clear();
                navigation.navigate('Register');
              }} activeOpacity={0.6}>
                <Text style={styles.have_not_account}>Don't Have an Account Register?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  )
}

export default Login

const styles = StyleSheet.create({

  image_back: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOURS.white,
  },

  envelop_image: {
    height: 25,
    width: 25,
  },

  envelop: {
    width: 40,
    fontSize: 28,
    color: COLOURS.apple,
  },

  container: {
    backgroundColor: COLOURS.white
  },

  child_container: {
    width: '100%',
    alignItems: 'center',
  },

  name: {
    fontSize: 25,
    marginTop: 100,
    paddingVertical: 10,
    color: COLOURS.apple,
    fontFamily: 'Ubuntu-Bold',
  },

  inpt_here: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    letterSpacing: .3,
    paddingHorizontal: 10,
    fontFamily: 'Ubuntu-Regular',
    borderColor: COLOURS.peach,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inpt: {
    width: '80%',
    color: COLOURS.black,
    fontFamily: 'Ubuntu-Medium',
  },

  email_name: {
    width: '100%',
    fontSize: 16,
    letterSpacing: .5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    color: COLOURS.apple,
    fontFamily: 'Ubuntu-Medium',
  },

  pswd_name: {
    fontSize: 16,
    width: '100%',
    marginTop: 10,
    letterSpacing: .5,
    paddingVertical: 10,
    color: COLOURS.apple,
    paddingHorizontal: 30,
    fontFamily: 'Ubuntu-Medium'
  },

  btn: {
    width: 300,
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: COLOURS.apple,
  },

  have_not_account: {
    fontSize: 12,
    marginTop: 10,
    color: '#1b1b1b',
    textAlign: 'left',
    letterSpacing: .5,
    paddingHorizontal: 30,
    fontFamily: 'Ubuntu-Medium',
  },

  forget_password: {
    padding: 3,
    fontSize: 10,
    borderRadius: 10,
    letterSpacing: .3,
    textAlign: 'center',
    color: COLOURS.white,
    fontFamily: 'Ubuntu-Medium',
    backgroundColor: COLOURS.peach,
  },

  login_text: {
    fontSize: 12,
    letterSpacing: 1,
    paddingVertical: 15,
    textAlign: 'center',
    color: COLOURS.white,
    fontFamily: 'Ubuntu-Bold',
    textTransform: 'uppercase',
  },

  forgt_background: {
    height: 20,
    width: 150,
    marginTop: 12,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 25,
  },
})