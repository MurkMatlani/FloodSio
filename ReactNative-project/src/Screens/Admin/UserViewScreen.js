import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Image } from 'react-native-animatable';
const UserViewScreen = ({ route, navigation }) => {
    const { item, userType } = route.params.params;
    const { height, width } = Dimensions.get("screen")
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: height * 0.06, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                <Ionicons onPress={() => { navigation.goBack() }} name="ios-chevron-back-outline" color="#111" size={25} style={{ paddingHorizontal: 15 }} />
                <Text style={{ color: "#111", fontSize: 17, fontWeight: "600", paddingHorizontal: 10 }}>View {userType}</Text>
            </View>
            <ScrollView >
                <View style={{ width: "100%", alignItems: 'center', marginVertical: 30 }}>
                    {item.profile_picture.url == "" ?
                        <View style={{ width: "90%", height: 200, borderRadius: 10, backgroundColor: "grey", alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                style={{ width: 70, height: 70, }}
                                source={require("../../Images/user.png")} />
                        </View>
                        : <Image source={{ uri: item.profile_picture.url }} style={{ width: "90%", height: 200, borderRadius: 10 }} />}
                </View>
                <View style={{ width: "100%", marginVertical: 10, paddingHorizontal: 20 }}>
                    <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}>Name: {item.full_name}</Text>
                </View>
                <View style={{ width: "100%", marginVertical: 10, paddingHorizontal: 20 }}>
                    <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}>Email: {item.email_address}</Text>
                </View>
                <View style={{ width: "100%", marginVertical: 10, paddingHorizontal: 20 }}>
                    <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}>Phone No: {item.phone_no}</Text>
                </View>
                <View style={{ width: "100%", marginVertical: 10, paddingHorizontal: 20 }}>
                    <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}>Cnic: {item.cnic}</Text>
                </View>
                <View style={{ width: "100%", marginVertical: 10, paddingHorizontal: 20 }}>
                    <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}>Gender: {item.gender}</Text>
                </View>
                <View style={{ width: "100%", marginVertical: 10, paddingHorizontal: 20 }}>
                    <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}>User Type: {userType}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default UserViewScreen

const styles = StyleSheet.create({})