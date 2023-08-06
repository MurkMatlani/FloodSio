import React from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AdminContext } from '../../Context/AdminContext/AdminContext';
const { width, height } = Dimensions.get("screen")
const VictimModal = ({ isVisible = false, onClose, onVictimSelect }) => {
    const { allVictims } = React.useContext(AdminContext);
    const Item = ({ item, backgroundColor, textColor }) => (
        <TouchableOpacity
            onPress={() => {
                onVictimSelect(item._id);
            }}
            style={[styles.item, { backgroundColor }]}>
            <View style={{ flexDirection: 'row' }}>
                {item.profile_picture.url != '' ? <Image
                    style={{ width: 70, height: 70, borderRadius: 10 }}
                    source={{ uri: item.profile_picture.url }} /> : <Image
                    style={{ width: 70, height: 70, }}
                    source={require("../../Images/user.png")} />}
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={[styles.title, { color: textColor }]}>{item.full_name}</Text>
                    <Text style={[styles.description, { color: textColor }]} numberOfLines={2}>Email: {item.email_address}</Text>
                    <Text style={[styles.description, { color: textColor }]} numberOfLines={2}>Phone Number: {item.phone_no}</Text>
                </View>
            </View>
            {/* <View style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { }}><Image source={require("../../Images/eye.png")} style={{ width: 20, height: 20 }} /></TouchableOpacity>
                <View style={{ width: 10 }}></View>
                <TouchableOpacity onPress={() => { onDelete(item.id) }}>
              <Image source={require("../../Images/delete-icon.png")} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            </View> */}
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        // console.log(item)
        return (
            <Item
                item={item}
                // onPress={() => setSelectedId(item.id)}
                backgroundColor={"#fff"}
                textColor={"#111"}
            />
        );
    };
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.modalText}>All Victims</Text>
                            <AntDesign onPress={onClose} name="close" size={20} color="#111" />
                        </View>
                        <View style={{ flex: 1 }}>
                            {allVictims == null ? <ActivityIndicator /> :
                                <FlatList
                                    nestedScrollEnabled
                                    data={allVictims}
                                    renderItem={renderItem}
                                    keyExtractor={item => item._id}
                                    ListEmptyComponent={() => {
                                        return <View style={{ paddingHorizontal: 50, paddingVertical: 100 }}><Text style={{ color: "#777", fontSize: 20, fontWeight: '600' }}>Riders is Not Available</Text></View>
                                    }}
                                // extraData={selectedId}
                                />
                            }
                        </View>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default VictimModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: "90%",
        height: height * 0.6,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: '#111',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
        fontWeight: "600",
        color: "#111"
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 10
    },
    title: {
        fontSize: 15,
        paddingVertical: 2,
        fontWeight: "700",
    },
    description: {
        fontSize: 12,
        paddingVertical: 2,
        fontWeight: "500",
    },
})