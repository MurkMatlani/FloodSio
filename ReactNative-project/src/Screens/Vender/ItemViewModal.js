import { StyleSheet, Text, View, Modal, Dimensions, Image } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get("screen");
const ItemViewModal = ({ isOpen, item, onClose }) => {
    console.log(item);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                visible={isOpen}
                transparent={true}
                style={{ backgroundColor: "red" }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: "100%", height: 50, backgroundColor: '#fff' }}>
                            <Text style={{ color: "#111", fontWeight: '600', fontSize: 20, }}>View Item</Text>
                            <Text onPress={onClose} style={{ color: "#111", fontWeight: '600', fontSize: 30, transform: [{ rotate: '50deg' }], position: "absolute", top: 5, right: 10 }}>+</Text>
                        </View>
                        <View style={{ width: "100%", height: 150, borderRadius: 10 }}>
                            <Image source={{ uri: item?.image.url }} style={{ flex: 1, borderRadius: 10 }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingVertical: 6, }}>
                            <Text style={{ color: "#111", fontSize: 16, fontWeight: '700', width: "70%" }}  >{item?.name}</Text>
                            <Text style={{ color: "#111", fontSize: 14, fontWeight: '700', width: "30%", textAlign: "right" }}>Rs:{item?.price}</Text>
                        </View>
                        <Text style={{ color: "#111", fontSize: 15, fontWeight: '700', width: "100%" }}  >category: {item?.category.name}</Text>
                        <Text style={{ color: "#111", fontSize: 14, fontWeight: '700', width: "100%", marginTop: 5 }}>Quantity:{item?.quantity}</Text>
                        <Text style={{ color: "#111", fontSize: 14, fontWeight: '700', width: "100%", marginTop: 20 }}>Description</Text>
                        <Text style={{ color: '#ccc', fontSize: 15, fontWeight: '700', width: "100%" }} >{item?.description}</Text>

                    </View>

                </View>
            </Modal>
        </View>
    )
}

export default ItemViewModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: "90%",
        // height: height * 0.25,
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