import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { COLOURS } from '../../Components/ThemeColours'
import Dropdown from '../../Components/DropDwon'
import { AdminContext } from '../../Context/AdminContext/AdminContext'

const AddVictim = ({ onClose }) => {
    const { setEmailRegister,
        emailRegister,
        setPasswordRegister,
        passwordRegister,
        fullName,
        setFullName,
        setGender,
        gender,
        setPhoneNumber,
        phoneNumber,
        setCinc,
        cnic,onCreateVictim ,loader} = useContext(AdminContext);
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.child_container}>
                    <Text onPress={onClose} style={{ color: "#111", fontWeight: '600', fontSize: 30, transform: [{ rotate: '50deg' }], position: "absolute", top: 5, right: 10 }}>+</Text>
                    <Text style={styles.name}>Add Victim Here</Text>
                    <Text style={styles.email_name}>Full Name</Text>
                    <View style={styles.inpt_here}>
                        <TextInput
                            onChangeText={(e) => setFullName(e)}
                            value={fullName}
                            placeholder='Your Full Name' placeholderTextColor={'grey'} style={styles.inpt} />
                        <Image source={require('../../Images/user.png')} style={styles.envelop_image} tintColor={COLOURS.apple} />
                    </View>
                    <Text style={styles.email_name}>Email</Text>
                    <View style={styles.inpt_here}>
                        <TextInput
                            onChangeText={(e) => setEmailRegister(e)}
                            value={emailRegister}
                            placeholder='Your Email' placeholderTextColor={'grey'} style={styles.inpt} />
                        <Image source={require('../../Images/envelope.png')} style={styles.envelop_image} tintColor={COLOURS.apple} />
                    </View>

                    <Text style={styles.email_name}>Password</Text>
                    <View style={styles.inpt_here}>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(e) => setPasswordRegister(e)}
                            value={passwordRegister}
                            placeholder='Your Password' placeholderTextColor={'grey'} style={styles.inpt} />
                        <TouchableOpacity ><Image source={require('../../Images/eye.png')} style={styles.envelop_image} tintColor={COLOURS.apple} /></TouchableOpacity>

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
                        <Image source={require('../../Images/phone_icon.png')} style={styles.envelop_image} tintColor={COLOURS.apple} />
                    </View>
                    <Text style={styles.pswd_name}>Cnic</Text>
                    <View style={styles.inpt_here}>
                        <TextInput
                            onChangeText={(e) => setCinc(e)}
                            value={cnic}
                            placeholder='Cnin Number' maxLength={14} keyboardType='number-pad' placeholderTextColor={'grey'} style={styles.inpt} />
                        <Image source={require('../../Images/cnic_icon.png')} style={styles.envelop_image} tintColor={COLOURS.apple} />
                    </View>
                    <TouchableOpacity onPress={onCreateVictim} style={styles.btn} activeOpacity={0.6}>
                        {loader?<ActivityIndicator/> :<Text style={styles.login_text}>Add Victim</Text>}
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}

export default AddVictim

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOURS.white
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
        marginTop: 40,
        borderRadius: 5,

        backgroundColor: COLOURS.apple,
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