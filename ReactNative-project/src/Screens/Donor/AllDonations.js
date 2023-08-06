import React, { useContext, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationRef } from '../../../App'
import { DonorContext } from '../../Context/DonorContext/DonorContext'

const { height } = Dimensions.get("screen")
const AllDonations = () => {
    const { allDonations } = useContext(DonorContext);
    const [search, setSearch] = React.useState('');
    const [filteredDataSource, setFilteredDataSource] = React.useState(null);

    React.useEffect(() => { setFilteredDataSource(allDonations) }, [allDonations])

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = allDonations.filter(
                function (item) {
                    const itemData = item.name
                        ? item.name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(allDonations);
            setSearch(text);
        }
    };
    const Item = ({ item, backgroundColor, textColor }) => (
        <View style={[styles.item, { backgroundColor, display: 'flex', flexDirection: "row" }]}>
            <View style={{ width: 100, height: 100 }}>
                <Image source={{ uri: item?.items[0].item?.image.url }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={[styles.title, { color: textColor }]}>{item?.items[0].item?.name}</Text>
                <Text style={[styles.description, { color: textColor }]} numberOfLines={2}>Donor Name: {item.donor.full_name}</Text>
                <View>
                    <Text style={{ color: "#111" }}>Status: {item.completed ? "Completed" : "Process"}</Text>
                </View>
            </View>
            <View style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                    NavigationRef.current.navigate("ViewDonation", { donation: item })
                }}>
                    <Ionicons name="eye" color="#111" size={20} /></TouchableOpacity>
            </View>
        </View>
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
            <View style={{ width: '100%', height: height * 0.06, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                <Ionicons onPress={() => { NavigationRef.current.goBack() }} name="ios-chevron-back-outline" color="#111" size={25} style={{ paddingHorizontal: 15 }} />
                <Text style={{ color: "#111", fontSize: 17, fontWeight: "700", paddingHorizontal: 10 }}>Donations</Text>
            </View>
            <View style={{ width: "90%", height: 50, backgroundColor: '#D0D3D4', marginHorizontal: 20, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    onChangeText={searchFilterFunction}
                    value={search}
                    style={{ width: "80%", paddingHorizontal: 10, color: "#111" }} placeholder='Search here...' placeholderTextColor={"#777"} />
                <View style={{ width: 10 }}></View>
                <Image source={require("../../Images/search-icon.png")} style={{ width: 25, height: 25, }} />
            </View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ color: "#111", fontSize: 18, fontWeight: '600' }}>All Donations</Text></View>
            <View style={{ height: "79%" }}>
                {filteredDataSource == null ? <ActivityIndicator /> : <FlatList
                    nestedScrollEnabled
                    data={filteredDataSource}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    ListEmptyComponent={() => {
                        return <View style={{ paddingHorizontal: 70, paddingVertical: 100 }}><Text style={{ color: "#777", fontSize: 20, fontWeight: '600' }}>Donation is Not Available</Text></View>
                    }}
                />}
            </View>

        </View>
    )
}

export default AllDonations

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 10
    },
    title: {
        fontSize: 18,
        paddingVertical: 5,
        fontWeight: "700",
    },
    description: {
        fontSize: 15,
        paddingVertical: 5,
        fontWeight: "500",
    },
})