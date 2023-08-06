import * as Animatable from 'react-native-animatable';
import { COLOURS } from '../Components/ThemeColours';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, ImageBackground, Text, TextInput, View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useContext, useState } from 'react';
import { MainAppContext } from '../Context/MainAppContext';
import SuccessModal from '../Components/SuccessModal';

const ResetPassword = ({ navigation, route }) => {
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const { updatePassword, loader,isSuccessModal,onBackPasswordChange } = useContext(MainAppContext);
    const { userType, email } = route.params.params;

   

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
                                <Text style={styles.frgt_name}>Reset Password</Text>
                            </View>

                            <Text style={styles.pswd_name}>New Password</Text>
                            <TextInput
                                onChangeText={(e) => setPassword(e)}
                                value={password}
                                placeholder='New Password' placeholderTextColor={'grey'} style={styles.inpt_here} />


                            <Text style={styles.cnfrmpswd_name}>Confirm Password</Text>

                            <TextInput
                                onChangeText={(e) => setCPassword(e)}
                                value={cPassword}
                                placeholder='Confirm Password' placeholderTextColor={'grey'} style={styles.inpt_here} />


                            <TouchableOpacity style={styles.btn} activeOpacity={0.6} onPress={() => { updatePassword(userType, email, password, cPassword) }}>
                                {loader ? <ActivityIndicator /> : <Text style={{
                                    color: 'white', fontSize: 12, paddingVertical: 15,
                                    textAlign: 'center', fontFamily: 'Ubuntu-Bold',
                                    letterSpacing: .5,
                                }}>CONFIRM</Text>}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View >
            <SuccessModal  isVisible={isSuccessModal}  onBackHome={onBackPasswordChange}/>
        </>
    )
}

export default ResetPassword

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
        marginTop: 60,
        letterSpacing: .5,
        paddingVertical: 10,
        color: COLOURS.apple,
        fontFamily: 'Ubuntu-Bold',
    },

    pswd_name: {
        width: '100%',
        fontSize: 16,
        marginTop: 40,
        paddingVertical: 10,
        color: COLOURS.apple,
        paddingHorizontal: 30,
        fontFamily: 'Ubuntu-Medium'
    },

    cnfrmpswd_name: {
        width: '100%',
        fontSize: 16,
        marginTop: 10,
        paddingVertical: 10,
        color: COLOURS.apple,
        paddingHorizontal: 30,
        fontFamily: 'Ubuntu-Medium'
    },

    inpt_here: {
        width: 300,
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
        width: 300,
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: COLOURS.apple,
    },
})