import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Dropdown from '../Components/DropDwon';
import { COLOURS } from '../Components/ThemeColours';
import { MainAppContext } from '../Context/MainAppContext';
import DropDownPicker from 'react-native-dropdown-picker';

const Register = () => {

  const { onRegister,
    setEmailRegister,
    emailRegister,
    passwordRegister,
    setPasswordRegister,
    fullName,
    setFullName,
    setGender,
    setPhoneNumber,
    phoneNumber,
    cnic,
    setCinc, loader, setUserType, isPasswordShow,
    isPassword } = useContext(MainAppContext);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Admin', value: '1' },
    { label: 'Donor', value: '2' },
    { label: 'Vendor', value: '3' },
    { label: 'Rider', value: '4' },
    // { label: 'Victim', value: '5' },

  ])
  const [value, setValue] = useState(null);
  return (
    <>
      <StatusBar backgroundColor={COLOURS.apple} barStyle='light-content' />
      <View style={styles.container}>
        <ImageBackground source={require('../Images/simple.jpg')} style={styles.image_back} >
          <ScrollView>
            <View style={styles.child_container}>
              <Text style={styles.name}>Register Here</Text>

              <Text style={styles.email_name}>Full Name</Text>
              <View style={styles.inpt_here}>
                <TextInput
                  onChangeText={(e) => setFullName(e)}
                  value={fullName}
                  placeholder='Your Full Name' placeholderTextColor={'grey'} style={styles.inpt} />
                <Image source={require('../Images/user.png')} style={styles.envelop_image} tintColor={COLOURS.apple} />
              </View>

              <Text style={styles.email_name}>Email</Text>
              <View style={styles.inpt_here}>
                <TextInput
                  onChangeText={(e) => setEmailRegister(e)}
                  value={emailRegister}
                  placeholder='Your Email' placeholderTextColor={'grey'} style={styles.inpt} />
                <Image source={require('../Images/envelope.png')} style={styles.envelop_image} tintColor={COLOURS.apple} />
              </View>

              <Text style={styles.email_name}>Password</Text>
              <View style={styles.inpt_here}>
                <TextInput
                  secureTextEntry={!isPassword}
                  onChangeText={(e) => setPasswordRegister(e)}
                  value={passwordRegister}
                  placeholder='Your Password' placeholderTextColor={'grey'} style={styles.inpt} />
                <TouchableOpacity onPress={isPasswordShow}><Image source={isPassword ? require('../Images/eye.png') : require('../Images/eye.png')} style={styles.envelop_image} tintColor={COLOURS.apple} /></TouchableOpacity>

              </View>

              <Text style={styles.pswd_name}>Gender</Text>
              <Dropdown
                label="Select Gender"
                data={[
                  { label: 'Male', value: '1' },
                  { label: 'Female', value: '2' },
                ]} onSelect={(e) => {
                  setGender(e.label);
                }} />


              <Text style={styles.pswd_name}>Phone Number</Text>
              <View style={styles.inpt_here}>
                <TextInput
                  onChangeText={(e) => { setPhoneNumber(e) }}
                  value={phoneNumber}
                  placeholder='Phone Number' maxLength={11} keyboardType='number-pad' placeholderTextColor={'grey'} style={styles.inpt} />
                <Image source={require('../Images/phone_icon.png')} style={styles.envelop_image} tintColor={COLOURS.apple} />
              </View>
              <Text style={styles.pswd_name}>Cnic</Text>
              <View style={styles.inpt_here}>
                <TextInput
                  onChangeText={(e) => setCinc(e)}
                  value={cnic}
                  placeholder='Cnin Number' maxLength={14} keyboardType='number-pad' placeholderTextColor={'grey'} style={styles.inpt} />
                <Image source={require('../Images/cnic_icon.png')} style={styles.envelop_image} tintColor={COLOURS.apple} />
              </View>
              <Text style={styles.pswd_name}>User Type</Text>
              <DropDownPicker
                listMode='MODAL'
                // schema={{
                //   label: 'name',
                //   value: '_id'
                // }}
                placeholder='Select User Type'
                searchable
                style={{ width: "90%", marginHorizontal: 20, borderRadius: 5, borderColor: COLOURS.peach, backgroundColor: "transparent" }}
                zIndex={1000}
                addCustomItem={true}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={(e) => {
                  if (e == 1) {
                    setUserType("Admin");
                  } else if (e == 2) {
                    setUserType("Donor");
                  } else if (e == 3) {
                    setUserType("Vendor");
                  } else if (e == 4) {
                    setUserType("Rider");
                  } else {
                    // setUserType("Victim");
                  }
                }}
              />
              {/* <Dropdown
                label="Select Type"
                data={[
                  { label: 'Admin', value: '1' },
                  { label: 'Donor', value: '2' },
                  { label: 'Vendor', value: '3' },
                  { label: 'Rider', value: '4' },
                ]} onSelect={(e) => {
                  setUserType(e.label);
                }} /> */}

              <TouchableOpacity style={styles.btn} onPress={onRegister} activeOpacity={0.6}>
                {loader ? <ActivityIndicator /> : <Text style={styles.login_text}>Register Here</Text>}
              </TouchableOpacity>

              <TouchableOpacity style={{ width: '100%', alignItems: 'center', marginTop: 10 }} onPress={() => navigation.replace('Login')} activeOpacity={0.6}>
                <Text style={styles.have_not_account}>Already Have an Account Login?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  )
}

export default Register

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
    marginTop: 30,
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
    fontSize: 15,
    width: '100%',
    marginTop: 10,
    letterSpacing: .5,
    paddingVertical: 5,
    color: COLOURS.apple,
    paddingHorizontal: 30,
    fontFamily: 'Ubuntu-Medium'
  },

  btn: {
    width: 300,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: COLOURS.apple,
  },

  have_not_account: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 20,
    color: '#1b1b1b',
    textAlign: 'left',
    letterSpacing: .5,
    paddingHorizontal: 30,
    fontFamily: 'Ubuntu-Medium',
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

})