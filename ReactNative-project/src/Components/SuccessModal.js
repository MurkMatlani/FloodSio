


import { StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const { width, height } = Dimensions.get("screen")

const SuccessModal = ({ isVisible = false ,onBackHome}) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                visible={isVisible}
                transparent={true}
                style={{ backgroundColor: "red" }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Lottie source={require('../Images/json_animations/success.json')} autoPlay loop style={{
                            width: 100,
                            height: 80
                        }} />
                        <View style={{ paddingVertical: 10 }}>
                            <Text style={{ color: "#111", fontSize: 18, fontWeight: '600' }}>Success !</Text>
                        </View>
                        <TouchableOpacity onPress={onBackHome} style={{ marginTop: 10 }}>
                            <Ionicons name="md-home-outline" color="#111" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default SuccessModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: "60%",
        height: height * 0.25,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})