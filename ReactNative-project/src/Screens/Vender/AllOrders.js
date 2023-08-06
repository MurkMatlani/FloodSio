import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationRef } from '../../../App';
import { VenderContext } from '../../Context/VenderContaxt/VenderContext';

const AllOrders = () => {
    const { allOrders, getAllPlacedOrder } = useContext(VenderContext);

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState(null);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await getAllPlacedOrder();
        setRefreshing(false);
    }, []);
    useEffect(() => { setFilteredDataSource(allOrders) }, [allOrders])

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = allOrders.filter(
                function (item) {
                    const itemData = item.order_status
                        ? item.order_status.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(allOrders);
            setSearch(text);
        }
    };


    const renderItem = ({ item }) => {
        console.log(item.items);
        return <View style={styles.orderBox}>
            <View style={{ width: 100, height: 100, marginHorizontal: 10 }}>
                <Image source={{ uri: item?.items[0].item?.image.url }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            </View>
            <View style={{ width: "65%" }}>
                <Text numberOfLines={1} style={{ color: "#111", fontSize: 15, fontWeight: "600" }}>OrderId: {item._id}</Text>
                <Text style={{ color: "#111", fontSize: 18, fontWeight: "600" }}>Name: {item.items[0].item?.name}</Text>
                <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>Total: Rs:{item.total_amount}</Text>
                <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>Status: {item.order_status}</Text>
                <TouchableOpacity
                    onPress={() => NavigationRef.current.navigate("TrackOrder", { id: item._id })}
                    style={{ position: "absolute", right: 0, bottom: -5, backgroundColor: "#ccc", paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6 }}>
                    <Text style={{ color: "#111", fontSize: 12, fontWeight: "600" }}>Track Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: "90%", height: 50, backgroundColor: '#D0D3D4', marginHorizontal: 20, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    onChangeText={searchFilterFunction}
                    value={search}
                    style={{ width: "80%", paddingHorizontal: 10, color: "#111" }} placeholder='Search here...' placeholderTextColor={"#777"} />
                <View style={{ width: 10 }}></View>
                <Image source={require("../../Images/search-icon.png")} style={{ width: 25, height: 25, }} />
            </View>
            <Text style={{ color: "#111", fontSize: 18, fontWeight: "600", marginHorizontal: 20, marginBottom: 10, marginTop: 10 }}>All Orders</Text>
            {/* <ScrollView
                style={{ paddingVertical: 10 }}> */}
            {filteredDataSource == null ? <ActivityIndicator /> : <FlatList

                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                nestedScrollEnabled
                // inverted
                data={filteredDataSource}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                ListEmptyComponent={() => {
                    return <View style={{ paddingHorizontal: 90, paddingVertical: 100 }}><Text style={{ color: "#777", fontSize: 20, fontWeight: '600' }}>Order is Not Available</Text></View>
                }}
            />}
            {/* </ScrollView> */}
        </View>
    )
}

export default AllOrders

const styles = StyleSheet.create({
    orderBox: {
        width: "94%",
        height: 120,
        backgroundColor: '#fff',
        marginLeft: 12,
        marginRight: 10,
        borderRadius: 10,
        elevation: 10,
        marginBottom: 10,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "flex-start",
        display: 'flex',
        flexDirection: "row"
    }
})