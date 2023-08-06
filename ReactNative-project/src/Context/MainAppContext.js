import { createContext, useEffect, useState } from "react";
import { ErrorAlert, validateEmail } from "../helper/ShowAlert";
import instance from "../Api/AxiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationRef } from "../../App";
import { StackActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { Alert } from "react-native";
// import { Platform } from 'react-native';
// import { PermissionsAndroid } from 'react-native';



const MainAppContext = createContext();

const MainAppContextProvider = ({ children }) => {
    const [isImageLoader, setIsImageLoader] = useState(false);
    const [userType, setUserType] = useState("");
    const [loader, setLoader] = useState(false);
    const [isSplash, setIsSplash] = useState(false);
    const [localUser, setLocalUser] = useState(null);
    // donor Login Filed Start

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cnic, setCinc] = useState('');
    const [isPassword, setIsPassword] = useState(false);
    const [isSuccessModal, setIsSuccessModal] = useState(false);


    // donor Login Filed End

    useEffect(() => { requestUserPermission(); getLocalUser() }, [])
    async function registerAppWithFCM() {
        await messaging().registerDeviceForRemoteMessages();
    }

    async function requestUserPermission() {
        // if (Platform.OS == "ios") {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
            await registerAppWithFCM();
        }
        // } else {
        //    var permissionStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        //     if(permissionStatus=="granted"){
        //         console.log("Ok");
        //     }else{
        //         console.log("Permission is required");
        //     }
        // }
    }
    const getLocalUser = async () => {
        setIsSplash(true);
        try {
            const data = await AsyncStorage.getItem('@user');
            const type = await AsyncStorage.getItem('@userType');
            if (data != null || data != undefined) {
                setUserType(type);
                const user = JSON.parse(data);
                // console.log(typeof user)
                // console.log(user);
                setEmailRegister(user.email_address);
                setFullName(user.full_name);
                setGender(user.gender);
                setCinc(user.cnic);
                setPhoneNumber(user.phone_no);
                setLocalUser(user);
            }
        } catch (e) {
            ErrorAlert(JSON.stringify(e));
        }
        setIsSplash(false);
    }
    const saveLocalUser = async (data) => {
        try {
            const value = data;
            await AsyncStorage.setItem('@user', value)
            return true;
        } catch (e) {
            ErrorAlert(JSON.stringify(e));
            return false;
        }
    }
    const saveUserType = async (data) => {
        try {
            await AsyncStorage.setItem('@userType', data)
            return true;
        } catch (e) {
            ErrorAlert(JSON.stringify(e));
            return false;
        }

    }

    const clear = () => {
        setEmail('');
        setPassword('');
        setEmailRegister("");
        setPasswordRegister('');
        setGender('');
        setCinc('');
        setPhoneNumber('');
        setFullName('');
        // setUserType('');
    }

    const checkPassword = (str) => {
        var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return re.test(str);
    }
    const isPasswordShow = () => { setIsPassword(!isPassword); }
    const onLogin = async () => {
        if (email == '' && password == "" && userType == "") {
            ErrorAlert("Please Fill All Fields");
        } else if (email == "") {
            ErrorAlert("Please Enter Email");
        } else if (password == "") {
            ErrorAlert("Please Enter Password");
        } else if (!validateEmail(email)) {
            ErrorAlert("Please Enter valid Email");
        } else if (!checkPassword(password)) {
            ErrorAlert("Please Enter valid Password With spacial corrector");
        } else if (userType == "") {
            ErrorAlert("Please Select User Type");
        } else {
            setLoader(true);
            const data = { "email_address": email, "password": password };
            const URI_PATH = userType == "Admin" ? "/admin" : userType == "Donor" ? "/donor" : userType == "Vendor" ? "/vendor" : userType == "Rider" ? "/rider" : "/victim"
            try {
                const response = await instance.post(`/api${URI_PATH}/sign-in`, data);
                if (response.status == 200) {
                    if (response.data['status'] == '200') {
                        await AsyncStorage.clear();
                        const isSave = await saveLocalUser(JSON.stringify(response.data['singleUser']));
                        const isType = await saveUserType(userType);
                        if (isSave && isType) {
                            clear();
                            await getLocalUser();
                            const PAGE_URI = userType == "Admin" ? "AdminApp" : userType == "Donor" ? "DonorApp" : userType == "Vendor" ? "VenderApp" : "RiderApp";
                            NavigationRef.current.dispatch(StackActions.replace(PAGE_URI));
                        } else {
                            ErrorAlert("Du to same Server Side Problem Please restart App");
                        }
                    } else if (response.data['status'] == '404') {
                        ErrorAlert(response['data']['message']);

                    }
                }
            } catch (error) {
                const err = JSON.parse(JSON.stringify(error));
                console.log(err.code)
                if (err.code == "ERR_BAD_REQUEST") {
                    ErrorAlert("Email or password is invalid Please create an account");
                } else {
                    ErrorAlert(err.message);
                }
            }
            setLoader(false);
        }
    }
    const onRegister = async () => {
        if (emailRegister == '' && passwordRegister == "" && fullName == "" && phoneNumber == "" && gender == "" && cnic == "" && userType == "") {
            ErrorAlert("Please Fill All Fields");
        } else if (fullName == "") {
            ErrorAlert("Please Enter Full Name");
        }
        else if (emailRegister == "") {
            ErrorAlert("Please Enter Email");
        } else if (passwordRegister == "") {
            ErrorAlert("Please Enter Password");
        } else if (!validateEmail(emailRegister)) {
            ErrorAlert("Please Enter valid Email");
        } else if (!checkPassword(passwordRegister)) {
            ErrorAlert("Please Enter valid Password With spacial corrector");
        } else if (phoneNumber == "") {
            ErrorAlert("Please Enter Phone Number");
        } else if (cnic == "") {
            ErrorAlert("Please Enter Cnic Number");
        } else if (userType == "") {
            ErrorAlert("Please Select User Type");
        } else {
            setLoader(true);
            const data = {
                "email_address": emailRegister,
                "password": passwordRegister,
                "full_name": fullName,
                "gender": gender,
                "phone_no": phoneNumber,
                "cnic": cnic,
            };
            const URI_PATH = userType == "Admin" ? "/admin" : userType == "Donor" ? "/donor" : userType == "Vendor" ? "/vendor" : userType == "Rider" ? "/rider" : "/victim";
            if (userType == "Victim") {
                try {
                    const response = await instance.post(`/api${URI_PATH}/create-victim`, data);
                    if (response.status == 201) {
                        await AsyncStorage.clear();
                        const isSave = await saveLocalUser(JSON.stringify(response.data[`saved${userType}`]));
                        const isType = await saveUserType(userType);
                        Alert.alert("Success","Victim Create Success");
                    }
                } catch (error) {
                    const err = JSON.parse(JSON.stringify(error));
                    ErrorAlert(err.message);
                }
            } else {
                try {
                    const response = await instance.post(`/api${URI_PATH}/sign-up`, data);
                    if (response.status == 201) {
                        await AsyncStorage.clear();
                        const isSave = await saveLocalUser(JSON.stringify(response.data[`saved${userType}`]));
                        const isType = await saveUserType(userType);
                        if (isSave && isType) {
                            clear();
                            await getLocalUser();
                            const PAGE_URI = userType == "Admin" ? "AdminApp" : userType == "Donor" ? "DonorApp" : userType == "Vendor" ? "VenderApp" : "RiderApp";
                            NavigationRef.current.dispatch(StackActions.replace(PAGE_URI));
                        } else {
                            ErrorAlert("Du to same Server Side Problem Please restart App");
                        }
                    }
                } catch (error) {
                    const err = JSON.parse(JSON.stringify(error));
                    ErrorAlert(err.message);
                }
            }
            setLoader(false);
        }
    }
    const onImageUpload = async (formData, id, userType) => {
        setIsImageLoader(true);
        try {
            const URI_PATH = userType == "Admin" ? 'admin' : userType == "Donor" ? "donor" : userType == "Vendor" ? "vendor" : userType == "Rider" ? "rider" : "victim";
            const response = await instance.post(`/api/${URI_PATH}/upload-profile-picture/${id}`, { "imageBase64": formData });
            console.log(response.data);
            if (response.status === 200) {
                if (response.data['status'] == '400') {
                    ErrorAlert(JSON.stringify(response.data['message']));
                } else if (response.data['status'] == '200') {
                    console.log(response.data);
                    await AsyncStorage.removeItem("@user");
                    await saveUserType(userType);
                    await saveLocalUser(JSON.stringify(response.data[`updated${userType}`]));
                    setIsSuccessModal(true);
                } else if (response.data['status'] == '404') {
                    ErrorAlert(JSON.stringify(response.data['message']));
                }
            }
        } catch (error) {
            console.log(JSON.parse(error));
            ErrorAlert(JSON.stringify(error));
        }
        setIsImageLoader(false);
    }
    const updateUser = async (userType, id) => {
        if (emailRegister == "" && fullName == "" && phoneNumber == "" && gender == "" && cnic == "" && userType == "") {
            ErrorAlert("Please Fill All Fields");
        } else if (fullName == "") {
            ErrorAlert("Please Enter Full Name");
        }
        else if (emailRegister == "") {
            ErrorAlert("Please Enter Email");
        }
        else if (!validateEmail(emailRegister)) {
            ErrorAlert("Please Enter valid Email");
        } else if (phoneNumber == "") {
            ErrorAlert("Please Enter Phone Number");
        } else if (cnic == "") {
            ErrorAlert("Please Enter Cnic Number");
        } else if (userType == "") {
            ErrorAlert("Please Select User Type");
        } else {
            setLoader(true);
            const data = {
                "email_address": emailRegister,
                "full_name": fullName,
                "gender": gender,
                "phone_no": phoneNumber,
                "cnic": cnic,
            };
            const URI_PATH = userType == "Admin" ? "admin" : userType == "Donor" ? "donor" : userType == "Vendor" ? "vendor" : userType == "Rider" ? "rider" : "victim";
            // console.log(data);
            try {

                const response = await instance.put(`/api/${URI_PATH}/update-${URI_PATH}/${id}`, data);
                if (response.status == 200) {
                    if (response.data['status'] == "200") {
                        console.log(JSON.stringify(response.data[`updated${userType}`]));
                        await AsyncStorage.removeItem("@user");
                        await saveUserType(userType);
                        await saveLocalUser(JSON.stringify(response.data[`updated${userType}`]));
                        setIsSuccessModal(true);
                    }
                    else {
                        ErrorAlert("Du to same Server Side Problem Please restart App");
                    }
                }
            } catch (error) {
                ErrorAlert(JSON.stringify(error));
            }
            setLoader(false);
        }
        // console.log(fullName, gender, emailRegister, phoneNumber, cnic);
    }
    const onForgotPassword = async (email) => {
        if (email == '') {
            ErrorAlert("Please Enter Email");
        } else if (!validateEmail(email)) {
            ErrorAlert("Please Enter Valid Email");
        } else {
            setLoader(true);
            try {
                const URI_PATH = userType == "Admin" ? "admin" : userType == "Donor" ? "donor" : userType == "Vendor" ? "vendor" : userType == "Rider" ? "rider" : "victim";
                const response = await instance.post(`/api/forgot-password/check-${URI_PATH}-email`, { email });
                console.log(response.data);
                if (response.data['status'] && response.data['status'] == '400' || response.data['status'] && response.data['status'] == '404') {
                    ErrorAlert(response.data['message']);
                } else {
                    const otpSend = await instance.post(`/api/forgot-password/send-forgot-password-otp-email/${email}`);
                    if (otpSend.data['status'] == "400") {
                        ErrorAlert(response.data['message'])
                    } else {
                        NavigationRef.current.navigate("OtpHere", { params: { userType: userType, email: email } })
                    }
                }
            } catch (error) {
                const err = JSON.parse(JSON.stringify(error));
                if (err.status == 404) {
                    ErrorAlert(err.message);
                } else if (err.status == 500) {
                    ErrorAlert(err.message);
                } else {
                    ErrorAlert(JSON.stringify(err));
                }
            }
            setLoader(false);

        }
    }
    const otpVerify = async (email, type, otp) => {
        // navigation.replace('ResetPassword')
        if (otp == "") {
            ErrorAlert("Please Enter Otp Code");
        } else {
            setLoader(true);
            try {
                const response = await instance.post(`/api/forgot-password/verify-forgot-password-otp/${email}`, { otp_code: otp });
                console.log(response.data);
                if (response.data['status'] && response.data['status'] == '400' || response.data['status'] && response.data['status'] == '404') {
                    ErrorAlert(response.data['message']);
                } else {
                    NavigationRef.current.navigate("ResetPassword", { params: { userType: userType, email: email } });
                }
            } catch (error) {
                const err = JSON.parse(JSON.stringify(error));
                if (err.status == 404) {
                    ErrorAlert(err.message);
                } else if (err.status == 500) {
                    ErrorAlert(err.message);
                } else {
                    ErrorAlert(JSON.stringify(err));
                }
            }
            setLoader(false);

        }
    }

    const updatePassword = async (type, email, password, cPassword) => {
        if (password == "") {
            ErrorAlert("Please Enter Password");
        } else if (cPassword == "") {
            ErrorAlert("Please Enter Confirm Password");
        } else if (!checkPassword(password)) {
            ErrorAlert("Please Enter valid Password With spacial corrector");
        } else if (password != cPassword) {
            ErrorAlert("Password Dose not match");
        } else {
            setLoader(true);
            try {
                const URI_PATH = type == "Admin" ? "admin" : type == "Donor" ? "donor" : type == "Vendor" ? "vendor" : "rider"
                const response = await instance.patch(`/api/forgot-password/update-${URI_PATH}-pasword/${email}`, { confirm_password: cPassword, password: password });
                console.log(response.data);
                if (response.data['status'] && response.data['status'] == '400' || response.data['status'] && response.data['status'] == '404') {
                    ErrorAlert(response.data['message']);
                } else {
                    setIsSuccessModal(true);
                    // NavigationRef.current.dispatch(StackActions.replace("Login"));
                }
            } catch (error) {
                const err = JSON.parse(JSON.stringify(error));
                console.log(err);
                if (err.status == 404) {
                    ErrorAlert(err.message);
                } else if (err.status == 500) {
                    ErrorAlert(err.message);
                } else {
                    ErrorAlert(JSON.stringify(err));
                }
            }
            setLoader(false);

        }
    }
    const onLogOut = async () => {
        setLocalUser(null);
        await AsyncStorage.clear();
        clear();
        
        NavigationRef.current.reset({
            index:0,
            routes: [{ name: 'Login' }],

        });
    }
    const onBack = async () => {
        setIsSuccessModal(false);
        await getLocalUser();
    }
    const onBackPasswordChange = async () => {
        setIsSuccessModal(false);
        await onLogOut();
        // NavigationRef.current.dispatch(StackActions.replace("Login"));
    }
    return <MainAppContext.Provider
        value={{
            userType,
            setUserType,
            email,
            setEmail,
            password,
            setPassword,
            onLogin,
            onRegister,
            setEmailRegister,
            emailRegister,
            passwordRegister,
            setPasswordRegister,
            fullName,
            setFullName,
            setGender,
            gender,
            setPhoneNumber,
            phoneNumber,
            cnic,
            setCinc,
            loader,
            setLoader,
            isPasswordShow,
            isPassword,
            setIsSplash,
            isSplash,
            localUser,
            onImageUpload,
            isImageLoader,
            updateUser,
            onForgotPassword,
            otpVerify,
            updatePassword,
            onLogOut,
            clear,
            onBack,
            isSuccessModal,
            onBackPasswordChange
        }}
    >{children}</MainAppContext.Provider>

};


export { MainAppContext, MainAppContextProvider };
