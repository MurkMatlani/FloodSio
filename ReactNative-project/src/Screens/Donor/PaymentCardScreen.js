import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import { NavigationRef } from '../../../App'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOURS } from '../../Components/ThemeColours';
import { DonorContext } from '../../Context/DonorContext/DonorContext';
import { ErrorAlert } from '../../helper/ShowAlert';
import SuccessModal from '../../Components/SuccessModal';
const { width, height } = Dimensions.get("screen")
const PaymentCardScreen = ({ route, navigation }) => {
    // console.log(route.params);
    const { total } = route.params;
    const [isCardValid, setIsCardValid] = useState(false);
    const [isDateValid, setIsDateValid] = useState(false);
    const { orderCreate, loader , isSuccessModal,
        onBackPayment} = useContext(DonorContext)
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryData, setExpiryData] = useState('');
    function validate_creditCardNumber(number) {
        var re16digit = /^\d{16}$/;
        if (!re16digit.test(number)) {
            setIsCardValid(true)
            return false;
        }
        setIsCardValid(false);
        return true;

    }

    const createOrder = async () => {
        if (cardHolderName == "" && cardNumber == "" && expiryData == "" && cvv == "") {
            ErrorAlert("Please Fill All Fields");
        } else if (cardHolderName == "") {
            ErrorAlert("Please Enter card Holder Name");
        }
        else if (cardNumber == "") {
            ErrorAlert("Please Enter card Number");
        } else if (expiryData == "") {
            ErrorAlert("Please Enter card Expiry Date");
        } else if (cvv == "") {
            ErrorAlert("Please Enter card Cvv No");
        } else {
            await orderCreate(total);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ width: '100%', height: height * 0.06, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                    <Ionicons onPress={() => { NavigationRef.current.goBack() }} name="ios-chevron-back-outline" color="#111" size={25} style={{ paddingHorizontal: 15 }} />
                    <Text style={{ color: "#111", fontSize: 17, fontWeight: "600", paddingHorizontal: 10 }}>Payment Info</Text>
                </View>
                <View>
                    <View style={styles.cardBox}>
                        {/* tintColor={'#ccc'} */}
                        <Image style={styles.cardImage} resizeMode='stretch' source={require('../../Images/atm_card.png')} />
                    </View>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={styles.text}>Card Holder Name</Text>
                        <TextInput
                            onChangeText={(e) => setCardHolderName(e)}
                            value={cardHolderName}
                            style={styles.input} placeholderTextColor={"#777"} placeholder='Enter Card Holder Name' />
                    </View>
                    <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                        <Text style={styles.text}>Card Number</Text>
                        <TextInput
                            onChangeText={(value) => {
                                setCardNumber(value)
                                validate_creditCardNumber(value);
                            }}
                            maxLength={16}
                            value={cardNumber}
                            style={[styles.input, {
                                borderWidth: 1,
                                borderColor: isCardValid ? "red" : "#ccc"
                            }]} placeholderTextColor={"#777"} placeholder='Enter Card Number' keyboardType='numeric' />
                    </View>
                    <View style={{ paddingHorizontal: 20, marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: "space-between", flexDirection: 'row' }}>
                        <View style={{ width: "40%" }}>
                            <Text style={styles.text}>Expiry Date</Text>
                            <TextInput
                                value={expiryData}
                                maxLength={5}
                                style={[styles.input, {
                                    borderWidth: 1,
                                    borderColor: isDateValid ? "red" : "#ccc"
                                }]} placeholderTextColor={"#777"} placeholder='03/27'
                                onChangeText={(e) => {
                                    setExpiryData(e);
                                    if (e.match("/")) {
                                        setIsDateValid(false);
                                    } else {
                                        setIsDateValid(true);
                                    }
                                }}
                                keyboardType='default'
                            />
                        </View>
                        <View style={{ width: "40%" }}>
                            <Text style={styles.text}>CVV No</Text>
                            <TextInput style={styles.input}
                                onChangeText={(e) => setCvv(e)}
                                maxLength={3}
                                value={cvv}
                                keyboardType='numeric'
                                placeholderTextColor={"#777"} placeholder='#567' />
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => { createOrder() }}
                    style={styles.checkoutButton}>
                    {loader ? <ActivityIndicator /> : <Text style={styles.checkoutButtonText}>Purchase</Text>}
                </TouchableOpacity>
                
            </ScrollView>
         <SuccessModal isVisible={isSuccessModal} onBackHome={onBackPayment}/>
        </View>
    )
}

export default PaymentCardScreen

const styles = StyleSheet.create({
    cardBox: {
        width: "100%",
        height: height * 0.34,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    cardImage: {
        width: width,
        height: "100%",
        borderRadius: 10,
    },
    text: {
        color: "#111",
        fontSize: 17,
        fontWeight: '700',
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        color: "#111"

    },
    checkoutButton: {
        backgroundColor: COLOURS.apple,
        marginHorizontal: 20,
        marginTop: height * 0.1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
})