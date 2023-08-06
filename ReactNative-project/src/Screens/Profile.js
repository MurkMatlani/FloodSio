import React, { useContext, useState, } from 'react';
import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Dropdown from '../Components/DropDwon';
import { COLOURS } from '../Components/ThemeColours';
import { MainAppContext } from '../Context/MainAppContext';
import { ErrorAlert } from '../helper/ShowAlert';
import { NavigationRef } from '../../App';
import SuccessModal from '../Components/SuccessModal';

const ProfileScreen = ({ navigation, route }) => {
    const { userType } = route.params.params;
    const { localUser, onImageUpload,
        isImageLoader, updateUser,
        setEmailRegister,
        emailRegister,
        fullName,
        setFullName,
        setGender,
        setPhoneNumber,
        phoneNumber,
        cnic,
        setCinc,
        gender,
        loader,
        onLogOut,
        isSuccessModal,
        onBack
    } = useContext(MainAppContext);

    const [image, setImage] = useState(localUser == null ? null : localUser['profile_picture']['url'] == '' ? null : localUser['profile_picture']['url']);
    const [new_imageset, setNewImage] = useState(false);
    const openGallery = async () => {
        try {
            const images = await launchImageLibrary({
                includeBase64: true,
                // saveTophotos: true,
                mediatype: ' photo',
            });
            setImage(images.assets[0].uri);
            setNewImage(true);
            // console.log(localUser);
            // if (userType == "Vendor") {
            const image1 = "data:image/png;base64," + images.assets[0].base64;
            await onImageUpload(image1, localUser['_id'], userType);
            // }
        } catch (error) {
            ErrorAlert(JSON.stringify(error));
        }
    }


    return (
        <>
            <StatusBar backgroundColor={'#eee'} barStyle='dark-content' />
            <ScrollView style={{ height: '100%', backgroundColor: COLOURS.white }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 30, }}>
                    <TouchableOpacity style={styles.btn_align} activeOpacity={0.6} onPress={() => navigation.goBack()}>
                        <MaterialIcons name='keyboard-arrow-left' style={styles.name} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn_align, { right: 5 }]} activeOpacity={0.6} onPress={() => { onLogOut() }}>
                        <MaterialIcons name='logout' style={styles.name} />
                    </TouchableOpacity>
                    {isImageLoader ?
                        <ActivityIndicator />
                        :
                        <>
                            {image == null ?
                                <View style={{ backgroundColor: COLOURS.apple, justifyContent: 'center', alignItems: 'center', width: 150, height: 150, borderRadius: 100 }} resizeMode='cover' />
                                : <Image source={{ uri: image }} style={{ justifyContent: 'center', alignItems: 'center', width: 150, height: 150, borderRadius: 100 }} resizeMode='cover' />}

                            <TouchableOpacity activeOpacity={0.6} onPress={openGallery}
                                style={{ backgroundColor: COLOURS.peach, bottom: 30, left: 50, height: 30, width: 30, justifyContent: 'center', borderRadius: 100 }}>
                                <AntDesign name='plus' style={{ color: COLOURS.apple, fontSize: 20, paddingHorizontal: 5, textAlign: 'center' }} />
                            </TouchableOpacity>
                        </>}
                </View>

                <View style={{ marginVertical: 10, }}>

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
                            // value={localUser['email_address']}
                            placeholder='Your email' placeholderTextColor={'grey'} style={styles.inpt} />
                        <Image source={require('../Images/envelope.png')} style={styles.envelop_image} tintColor={COLOURS.apple} />
                    </View>
                    <Text style={styles.email_name}>Gender</Text>
                    <View
                        style={{ marginHorizontal: 20 }}
                    >
                        <Dropdown
                            value={{ label: gender }}
                            width='100%'
                            label="Select Gender"
                            data={[
                                { label: 'Male', value: '1' },
                                { label: 'Female', value: '2' },
                            ]} onSelect={(e) => {
                                setGender(e.label)
                            }} />
                    </View>
                    <Text style={styles.email_name}>Phone Number</Text>
                    <View style={styles.inpt_here}>
                        <TextInput
                            onChangeText={(e) => { setPhoneNumber(e) }}
                            value={phoneNumber}
                            // value={localUser['phone_no']}
                            placeholder='Phone Number' maxLength={11} keyboardType='number-pad' placeholderTextColor={'grey'} style={styles.inpt} />
                        <Image source={require('../Images/phone_icon.png')} style={styles.envelop_image} tintColor={COLOURS.apple} />
                    </View>
                    <Text style={styles.email_name}>Cnic</Text>
                    <View style={styles.inpt_here}>
                        <TextInput
                            onChangeText={(e) => setCinc(e)}
                            value={cnic}
                            // value={localUser['cnic']}
                            placeholder='Cnin Number' maxLength={14} keyboardType='number-pad' placeholderTextColor={'grey'} style={styles.inpt} />
                        <Image source={require('../Images/cnic_icon.png')} style={styles.envelop_image} tintColor={COLOURS.apple} />
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', }}>

                    <TouchableOpacity style={styles.changepassword} onPress={() => { NavigationRef.current.navigate("ResetPassword", { params: { userType: userType, email: localUser['email_address'] } }); }} activeOpacity={0.8}>
                        <Text style={{ width: 25 }}></Text>
                        <Text style={{ color: COLOURS.white, letterSpacing: .5, textAlign: 'center', fontWeight: 'bold' }}>Change Password</Text>
                        <MaterialIcons name='keyboard-arrow-right' style={{ color: COLOURS.white, fontSize: 26, paddingHorizontal: 5, top: -2 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { updateUser(userType, localUser['_id']) }}
                        style={styles.btn} activeOpacity={0.8}>
                        {loader ? <ActivityIndicator /> : <Text style={{ color: COLOURS.white, textAlign: 'center', letterSpacing: .5, fontWeight: 'bold' }}>Update Profile</Text>}
                    </TouchableOpacity>

                </View>
                <View style={{ height: 30 }}></View>
                <SuccessModal
                    isVisible={isSuccessModal}
                    onBackHome={onBack}
                />
            </ScrollView>
        </>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    name: {
        height: 40,
        fontSize: 14,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        color: COLOURS.black,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        borderColor: COLOURS.peach,
    },
    email: {
        height: 40,
        fontSize: 14,
        marginTop: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        color: COLOURS.black,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        borderColor: COLOURS.peach,
    },

    changepassword: {
        width: 300,
        height: 50,
        width: '90%',
        marginTop: 30,
        borderRadius: 5,
        paddingVertical: 15,
        backgroundColor: COLOURS.apple,

        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    btn: {
        width: 300,
        height: 50,
        width: '90%',
        marginTop: 20,
        borderRadius: 5,
        paddingVertical: 15,
        backgroundColor: COLOURS.apple,
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
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        letterSpacing: .3,
        marginHorizontal: 20,
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
    envelop_image: {
        height: 25,
        width: 25,
    },
    email_name: {
        width: '100%',
        fontSize: 15,
        letterSpacing: .5,
        paddingVertical: 10,
        paddingHorizontal: 30,
        color: COLOURS.apple,
        fontFamily: 'Ubuntu-Medium',
    },
    btn_align: {
        top: 7,
        position: 'absolute',
        marginHorizontal: 20,
        alignSelf: 'flex-start',
    },
    name: {
        width: 40,
        padding: 5,
        fontSize: 30,
        marginTop: 0,
        borderRadius: 7,
        letterSpacing: .5,
        textAlign: 'center',
        color: COLOURS.apple,
        fontFamily: 'Roboto-Bold',
        backgroundColor: COLOURS.peach,
    },
})