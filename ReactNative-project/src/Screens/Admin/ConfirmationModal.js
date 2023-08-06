import { Dimensions, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { COLOURS } from '../../Components/ThemeColours';
import { AdminContext } from '../../Context/AdminContext/AdminContext';
import React from 'react';



export const ConfirmationModal = ({ visible = true, onClose, onConfirm }) => {
    const { width, height } = Dimensions.get("screen");
    const { loader } = React.useContext(AdminContext)
    return <View
        style={{
            width: width, height: height, backgroundColor: "#2e2e2e8f",
            display: visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center',
            position: 'absolute', top: 0, left: 0, zIndex: 999
        }}
    >
        <View style={{ width: "90%", height: height * 0.26, backgroundColor: "#fff", borderRadius: 10, elevation: 20 }}>
            <View style={{ width: "100%", height: 60, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: "#111", fontSize: 20, fontWeight: "600" }}>Confirm</Text>
                <Text onPress={onClose} style={{ color: "#111", fontWeight: '600', fontSize: 30, transform: [{ rotate: '50deg' }], position: "absolute", top: 5, right: 10 }}>+</Text>
            </View>
            <Text style={{ color: "#111", paddingHorizontal: 20, fontSize: 18, fontWeight: "600" }}>Do You want to Give This donation to This Victim?</Text>
            <View style={{ marginTop: 50, marginBottom: 10, flexDirection: 'row', justifyContent: "center", alignContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={onClose} style={[styles.btn, { backgroundColor: '#D0D3D4' }]}><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
                <View style={{ width: 20 }}></View>
                <TouchableOpacity onPress={onConfirm} style={[styles.btn, { backgroundColor: COLOURS.apple }]}>
                    {loader ?
                        <ActivityIndicator />
                        : <Text style={styles.btnText}>{"Confirm"}
                        </Text>}

                </TouchableOpacity>
            </View>
        </View>
    </View>
}


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