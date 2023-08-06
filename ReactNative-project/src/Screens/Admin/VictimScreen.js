import { StyleSheet, Text, View, Dimensions, TextInput, Image, ActivityIndicator,RefreshControl, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationRef } from '../../../App'
import { AdminContext } from '../../Context/AdminContext/AdminContext'
import AddVictim from './AddVictim'
import SuccessModal from '../../Components/SuccessModal'

const { height } = Dimensions.get("screen")
const VictimScreen = () => {
    const { allVictims, setIsShowAdd,
        isShowAdd, isSuccessModal, onBackHome,getAllItems } = useContext(AdminContext);
    const [searchFilterData, setSearchFilterData] = useState(null);
    useEffect(() => { setSearchFilterData(allVictims) }, [allVictims])
    const [search, setSearch] = React.useState('');
    const [refreshing,setRefreshing] = useState(false)
    const onRefresh =async()=>{
        setRefreshing(true);
        await getAllItems();
        setRefreshing(false);
    }
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = allVictims.filter(
                function (item) {
                    const itemData = item.full_name
                        ? item.full_name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            setSearchFilterData(newData);
            setSearch(text);
        } else {
            setSearchFilterData(allVictims);
            setSearch(text);
        }
    };
    const Item = ({ item, backgroundColor, textColor }) => (
        <TouchableOpacity
            onPress={() => {
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
            <View style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { }}><Image source={require("../../Images/eye.png")} style={{ width: 20, height: 20 }} /></TouchableOpacity>
                <View style={{ width: 10 }}></View>
                <TouchableOpacity onPress={() => { }}>
                    <Image source={require("../../Images/delete-icon.png")} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                backgroundColor={"#fff"}
                textColor={"#111"}
            />
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: height * 0.06, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons onPress={() => { NavigationRef.current.goBack() }} name="ios-chevron-back-outline" color="#111" size={25} style={{ paddingHorizontal: 15 }} />
                    <Text style={{ color: "#111", fontSize: 17, fontWeight: "600", paddingHorizontal: 10 }}>Victim</Text>
                </View>
                <Ionicons onPress={() => { setIsShowAdd(true) }} name="add" color="#111" size={25} style={{ paddingHorizontal: 15 }} />
            </View>
            <View style={{ width: "90%", height: 50, backgroundColor: '#D0D3D4', marginHorizontal: 20, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    onChangeText={searchFilterFunction}
                    value={search}
                    style={{ width: "80%", paddingHorizontal: 10, color: "#111" }} placeholder='Search here...' placeholderTextColor={"#777"} />
                <View style={{ width: 10 }}></View>
                <Image source={require("../../Images/search-icon.png")} style={{ width: 25, height: 25, }} />
            </View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}><Text style={{ color: "#111", fontSize: 18, fontWeight: '600' }}>All Victim</Text></View>
            <View style={{ height:height*0.8 }}>
                {searchFilterData == null ? <ActivityIndicator /> :
                    <FlatList
                    refreshControl={
                        <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        />
                    }
                        // inverted
                        nestedScrollEnabled
                        data={searchFilterData}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        ListEmptyComponent={() => {
                            return <View style={{ paddingHorizontal: 50, paddingVertical: 100 }}><Text style={{ color: "#777", fontSize: 20, fontWeight: '600' }}>Victim is Not Available</Text></View>
                        }}
                    />
                }
            </View>
            <View style={{ width: "100%", height: height, display: isShowAdd ? "flex" : "none", position: "absolute", top: 0, left: 0, backgroundColor: '#fff' }}>
                <AddVictim onClose={() => {
                    setIsShowAdd(false);
                }} />
            </View>
                <SuccessModal isVisible={isSuccessModal} onBackHome={onBackHome} />
        </View>

    )
}

export default VictimScreen

const styles = StyleSheet.create({
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