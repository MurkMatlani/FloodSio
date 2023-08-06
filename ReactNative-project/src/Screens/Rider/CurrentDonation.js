import React, { useContext, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import instance from '../../Api/AxiosConfig';
import SuccessModal from '../../Components/SuccessModal';
import { COLOURS } from '../../Components/ThemeColours';
import { RiderContext } from '../../Context/RiderContext/RiderContext';
import { ErrorAlert } from '../../helper/ShowAlert';
import OtpModal from './OtpModal';
import EvidenceModal from './EvidenceModal';

const CurrentDonation = () => {
    const {
        loader,
        assignedDonation,setAssignedDonation } = useContext(RiderContext);
    const [isLoader, setIsLoader] = useState(false);
    const [isOtpShow, setIsOtpShow] = useState(false);
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [evidenceModal, setEvidenceModal] = useState(false);

    const onOtpVerify = async () => {
        if (assignedDonation.victim.email_address) {
            setIsLoader(true);
            try {
                const response = await instance.post(`/api/forgot-password/send-forgot-password-otp-email/${assignedDonation.victim.email_address}`);
                if (response.status == 200) {
                    if (response.data['status'] == '200') {
                        console.log(response.data);
                        setIsOtpShow(true);
                    } else if (response.data['status'] == '400' || response.data['status'] == '404') {
                        ErrorAlert(response.data['message']);
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
            setIsLoader(false);
        }
    }

    const onValidOtp = async (code) => {
        setIsLoader(true);
        try {
            const response = await instance.post(`/api/forgot-password/verify-forgot-password-otp/${assignedDonation.victim.email_address}`, { otp_code: code });
            if (response.status == 200) {
                if (response.data['status'] == '200') {
                    console.log(response.data);
                    setIsOtpShow(false);
                    setIsOtpValid(true);
                    setIsSuccessModal(true);
                } else if (response.data['status'] == '400' || response.data['status'] == '404') {
                    ErrorAlert(response.data['message']);
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
        setIsLoader(false);
    }


    const onComplete = async () => {
        if (isOtpValid) {
            setEvidenceModal(true);
        } else {
            ErrorAlert("First You need to Verify Your Email");
        }
    }




    const onSubmit = async (image) => {
        try {
            setIsLoader(true);
            const response = await instance.post(`/api/donation/complete-donation/${assignedDonation._id}`);
            if (response.status == 200) {
                if (response.data['status'] == '200') {
                    const donationResponse = await instance.patch(`/api/donation/upload-donation-evidence/${assignedDonation._id}`, { imageBase64: image });
                    if (donationResponse.status == 200) {
                        console.log(donationResponse.data);
                        if (response.data['status'] == '200') {
                            setEvidenceModal(false);
                            setIsSuccessModal(true);
                setAssignedDonation(null);

                        } else if (response.data['status'] == '400' || response.data['status'] == '404') {
                            ErrorAlert(response.data['message']);
                        }
                    }
                } else if (response.data['status'] == '400' || response.data['status'] == '404') {
                    ErrorAlert(response.data['message']);
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
        setIsLoader(false);
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                <Text style={{ color: "#111", fontWeight: "600", fontSize: 20 }}>Current Donation</Text>
            </View>
            <View>
                {
                    loader ? <ActivityIndicator /> :
                        assignedDonation == null ?
                            <View style={{ width: "100%", height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: "#ccc", fontSize: 25, fontWeight: "700" }}>No Donation Assign</Text>
                            </View>
                            : <View>
                                <View style={{ paddingHorizontal: 20 }}>
                                    <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}>Donation Id: {assignedDonation._id}</Text>
                                </View>
                                <Text style={{ fontSize: 20, fontWeight: "600", color: "#111", marginHorizontal: 20, marginTop: 20 }}>Donor:</Text>
                                <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: "row", alignItems: 'center' }}>
                                    {assignedDonation.donor.profile_picture.url == "" ?
                                        <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }} source={require('../../Images/user.png')} />
                                        :
                                        <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }} source={{ uri: assignedDonation.donor.profile_picture.url }} />}
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ color: "#111", fontSize: 18, fontWeight: "600" }}>{assignedDonation.donor.full_name}</Text>
                                        <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>{assignedDonation.donor.email_address}</Text>
                                        <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>{assignedDonation.donor.phone_no}</Text>

                                    </View>
                                </View>
                                <Text style={{ fontSize: 20, fontWeight: "600", color: "#111", marginHorizontal: 20, marginTop: 20 }}>Vendor:</Text>
                                <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: "row", alignItems: 'center' }}>
                                    {assignedDonation.vendor.profile_picture.url == "" ?
                                        <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }} source={require('../../Images/user.png')} />
                                        :
                                        <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }} source={{ uri: assignedDonation.vendor.profile_picture.url }} />}
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ color: "#111", fontSize: 18, fontWeight: "600" }}>{assignedDonation.vendor.full_name}</Text>
                                        <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>{assignedDonation.vendor.email_address}</Text>
                                        <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>{assignedDonation.vendor.phone_no}</Text>
                                    </View>
                                </View>
                                <Text style={{ fontSize: 20, fontWeight: "600", color: "#111", marginHorizontal: 20, marginTop: 20 }}>Victim:</Text>
                                <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: "row", alignItems: 'center' }}>
                                    {assignedDonation.victim.profile_picture.url == "" ?
                                        <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }} source={require('../../Images/user.png')} />
                                        :
                                        <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }} source={{ uri: assignedDonation.victim.profile_picture.url }} />}
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ color: "#111", fontSize: 18, fontWeight: "600" }}>{assignedDonation.victim.full_name}</Text>
                                        <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>{assignedDonation.victim.email_address}</Text>
                                        <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>{assignedDonation.victim.phone_no}</Text>

                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 20, width: "100%", height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 60 }}>
                                    <TouchableOpacity onPress={onOtpVerify} style={{ width: '40%', height: 50, backgroundColor: COLOURS.apple, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        {isLoader ? <ActivityIndicator /> : <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>Verify Donation</Text>}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={onComplete}

                                        style={{ width: '45%', height: 50, backgroundColor: "#ccc", alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ color: "#111", fontSize: 14, fontWeight: '600' }}>Complete Donation</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                }
            </View>
            <OtpModal visible={isOtpShow} onClose={() => { setIsOtpShow(false) }}
                onVerify={(code) => {
                    if (code == "") {
                        ErrorAlert("Please Enter Otp Code");
                    } else {
                        onValidOtp(code);
                    }
                }}
            />
            <EvidenceModal visible={evidenceModal}
                onClose={() => { setEvidenceModal(false) }}
                onVerify={onSubmit}
                isLoader={isLoader}
            />
            <SuccessModal isVisible={isSuccessModal} onBackHome={() => {
                setIsSuccessModal(false);
            }} />
        </View>
    )
}

export default CurrentDonation

