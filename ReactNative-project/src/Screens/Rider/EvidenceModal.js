import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOURS } from '../../Components/ThemeColours';
import { launchCamera } from 'react-native-image-picker';

const EvidenceModal = ({ visible, onClose, onVerify, isLoader = false }) => {
    const { width, height } = Dimensions.get("screen");
    const [code, setCode] = useState('');
    const [imageUri, setImageUri] = useState('');
    const onClickImage = async () => {
        try {
            const result = await launchCamera({ includeBase64: true, mediaType: "photo", cameraType: "back", });
            // console.log(result.assets);
            if (result.assets.length > 0) {
                setImageUri(result.assets[0].uri);
                setCode("data:image/png;base64," + result.assets[0].base64)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View
            style={{
                width: width, height: height, backgroundColor: "#2e2e2e8f",
                display: visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center',
                position: 'absolute', top: 0, left: 0, zIndex: 999
            }}
        >
            <View style={{ width: "90%", height: height * 0.4, marginTop: -height * 0.3, backgroundColor: "#fff", borderRadius: 10, elevation: 20 }}>
                <View style={{ width: "100%", height: 60, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: "#111", fontSize: 20, fontWeight: "600" }}>Evidence Image</Text>
                    <Text onPress={onClose} style={{ color: "#111", fontWeight: '600', fontSize: 30, transform: [{ rotate: '50deg' }], position: "absolute", top: 5, right: 10 }}>+</Text>
                </View>
                <View>
                    <View style={{ paddingHorizontal: 20 }}>
                        <TouchableOpacity
                            onPress={onClickImage}
                            style={{
                                alignItems: 'center', justifyContent: 'center',
                                width: width * 0.8, height: height * 0.2, backgroundColor: "#ccc", borderRadius: 10
                            }}
                        >
                            {imageUri == "" ? <FontAwesome name="camera" color="#777" size={50} />
                                : <Image source={{ uri: imageUri }} style={{ width: width * 0.8, height: height * 0.2, borderRadius: 10 }} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 40, marginBottom: 10, flexDirection: 'row', justifyContent: "center", alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={onClose} style={[styles.btn, { backgroundColor: '#D0D3D4' }]}><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
                    <View style={{ width: 20 }}></View>
                    <TouchableOpacity onPress={() => { onVerify(code); }} style={[styles.btn, { backgroundColor: COLOURS.apple }]}>
                        {isLoader ? <ActivityIndicator /> : <Text style={styles.btnText}>{"Submit"}</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default EvidenceModal

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