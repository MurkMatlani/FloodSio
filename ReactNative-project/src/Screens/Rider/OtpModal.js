import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { COLOURS } from '../../Components/ThemeColours';

const OtpModal = ({ visible, onClose, onVerify }) => {
    const { width, height } = Dimensions.get("screen");
    const [code, setCode] = useState('');
    return (
        <View
            style={{
                width: width, height: height, backgroundColor: "#2e2e2e8f",
                display: visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center',
                position: 'absolute', top: 0, left: 0, zIndex: 999
            }}
        >

            <View style={{ width: "90%", height: height * 0.26, marginTop: -height * 0.3, backgroundColor: "#fff", borderRadius: 10, elevation: 20 }}>
                <View style={{ width: "100%", height: 60, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: "#111", fontSize: 20, fontWeight: "600" }}>Otp Verify</Text>
                    <Text onPress={onClose} style={{ color: "#111", fontWeight: '600', fontSize: 30, transform: [{ rotate: '50deg' }], position: "absolute", top: 5, right: 10 }}>+</Text>
                </View>
                <View>
                    <View style={{ paddingHorizontal: 20 }}>
                        <TextInput
                            onChangeText={(e) => { setCode(e) }}
                            value={code}
                            keyboardType='phone-pad'
                            style={{ width: width * 0.8, height: 50, backgroundColor: '#ccc', paddingHorizontal: 10, borderRadius: 10 }}
                            placeholder='Enter Otp' placeholderTextColor={"#777"} />
                    </View>
                </View>
                <View style={{ marginTop: 50, marginBottom: 10, flexDirection: 'row', justifyContent: "center", alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={onClose} style={[styles.btn, { backgroundColor: '#D0D3D4' }]}><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
                    <View style={{ width: 20 }}></View>
                    <TouchableOpacity onPress={() => { onVerify(code); }} style={[styles.btn, { backgroundColor: COLOURS.apple }]}>
                        <Text style={styles.btnText}>{"Verify"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default OtpModal

const styles = StyleSheet.create({
    btn: {
        width: "40%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 50,
    },
    btnText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff"
    }
})