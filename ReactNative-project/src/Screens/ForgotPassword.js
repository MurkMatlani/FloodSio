import { COLOURS } from '../Components/ThemeColours';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, ImageBackground, TextInput, View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import Dropdown from '../Components/DropDwon';
import { useContext, useState } from 'react';
import { MainAppContext } from '../Context/MainAppContext';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const navigation = useNavigation();
    const {
        setUserType,
        onForgotPassword,
        loader
    } = useContext(MainAppContext);





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
                                <Text style={styles.frgt_name}>Forget Password</Text>
                            </View>
                            <Text style={styles.email_name}>Your email</Text>
                            {/* <Animatable.View > */}
                            {/* <View> */}
                            <TextInput onChangeText={(e) => setEmail(e)} value={email} placeholder='Email' placeholderTextColor={'grey'} style={styles.inpt_here} />
                            {/* </View> */}
                            {/* </Animatable.View> */}
                            <Text style={styles.email_name}>User Type</Text>
                            <Dropdown
                                width='80%'
                                label="Select Type"
                                data={[
                                    { label: 'Admin', value: '1' },
                                    { label: 'Donor', value: '2' },
                                    { label: 'Vendor', value: '3' },
                                    { label: 'Rider', value: '4' },
                                ]} onSelect={(e) => {
                                    setUserType(e.label);
                                }} />
                            <TouchableOpacity

                                style={styles.btn} activeOpacity={0.8} onPress={() => {
                                    // navigation.replace('OtpHere')
                                    onForgotPassword(email);
                                }}>
                                {loader ? <ActivityIndicator /> : <Text style={{
                                    color: 'white', fontSize: 12, paddingVertical: 15,
                                    textAlign: 'center', fontFamily: 'Ubuntu-Bold', letterSpacing: .5,
                                }}>Reset Password</Text>}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        </>
    )
}

export default ForgotPassword

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
        fontFamily: 'Ubuntu-Bold',
        backgroundColor: COLOURS.peach,
    },

    frgt_name: {
        fontSize: 25,
        marginTop: 100,
        letterSpacing: .5,
        paddingVertical: 5,
        color: COLOURS.apple,
        fontFamily: 'Ubuntu-Bold',
    },

    email_name: {
        width: '100%',
        fontSize: 14,
        marginTop: 40,
        paddingVertical: 5,
        paddingHorizontal: 40,
        color: COLOURS.apple,
        fontFamily: 'Ubuntu-Medium',
    },


    inpt_here: {
        width: "80%",
        borderWidth: 1,
        borderRadius: 5,
        letterSpacing: .3,
        marginVertical: 5,
        color: COLOURS.black,
        paddingHorizontal: 10,
        fontFamily: 'Ubuntu-Regular',
        borderColor: COLOURS.peach,
    },

    btn: {
        width: "80%",
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: COLOURS.apple,
    },
})