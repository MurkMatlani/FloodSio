import { COLOURS } from '../Components/ThemeColours';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useContext, useState } from 'react';
import { MainAppContext } from '../Context/MainAppContext';

const OtpHere = ({ navigation, route }) => {
    const { userType, email } = route.params.params;
    const [optCode, setOtpCode] = useState('');
    // const navigation = useNavigation()
    const { otpVerify, loader } = useContext(MainAppContext);

    return (
        <>
            <StatusBar backgroundColor={'#eee'} barStyle='dark-content' />
            <View style={{ height: '100%', width: '100%', backgroundColor: COLOURS.white }}>
                <ImageBackground source={require('../Images/simple.jpg')} style={styles.image_back} >
                    <ScrollView>
                        <View style={styles.child_container}>
                            <TouchableOpacity style={styles.btn_align} activeOpacity={0.6} onPress={() => navigation.goBack()}>
                                <MaterialIcons name='keyboard-arrow-left' style={styles.name} />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.frgt_name}>Your OTP Here</Text>
                            </View>
                            <Text style={{ color: COLOURS.apple, fontSize: 15, marginTop: 40, paddingVertical: 10, fontFamily: 'Roboto-Medium', letterSpacing: 1, textAlign: 'center' }}>Your OTP</Text>

                            {/* <Animatable.View>
                                <View> */}
                            <TextInput
                                onChangeText={(e) => setOtpCode(e)}
                                placeholder='Otp' keyboardType='number-pad' placeholderTextColor={'grey'} style={styles.inpt_here} />
                            {/* </View>
                            </Animatable.View> */}

                            <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={() => {
                                otpVerify(
                                    email, userType, optCode
                                )
                            }}>
                                {loader ? <ActivityIndicator /> : <Text style={{
                                    color: 'white', fontSize: 12, paddingVertical: 15,
                                    textAlign: 'center', fontFamily: 'Roboto-Bold', textTransform:
                                        'uppercase', letterSpacing: .5,
                                }}>Reset Password</Text>}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        </>
    )
}

export default OtpHere

const styles = StyleSheet.create({

    image_back: {
        height: '100%',
        width: '100%',
        backgroundColor: COLOURS.white,
    },


    child_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    btn_align: {
        marginHorizontal: 20,
        alignSelf: 'flex-start',
    },

    name: {
        width: 40,
        padding: 5,
        fontSize: 30,
        marginTop: 30,
        borderRadius: 7,
        letterSpacing: .5,
        textAlign: 'center',
        color: COLOURS.apple,
        fontFamily: 'Roboto-Bold',
        backgroundColor: COLOURS.peach,
    },

    frgt_name: {
        fontSize: 25,
        marginTop: 100,
        letterSpacing: .5,
        paddingVertical: 10,
        color: COLOURS.apple,
        fontFamily: 'Roboto-Bold',
    },

    inpt_here: {
        height: 45,
        width: 120,
        borderWidth: 1,
        borderRadius: 5,
        letterSpacing: 3,
        marginVertical: 5,
        textAlign: 'center',
        color: COLOURS.black,
        paddingHorizontal: 10,
        fontFamily: 'Roboto-Bold',
        borderColor: COLOURS.peach,
    },

    btn: {
        width: 300,
        marginTop: 25,
        borderRadius: 5,
        backgroundColor: COLOURS.apple,
    },
})