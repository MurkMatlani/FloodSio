import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { DonorContext } from '../../Context/DonorContext/DonorContext'
import { NavigationRef } from '../../../App';

const AllOrders = () => {
    const { allOrders, getAllPlacedOrder } = useContext(DonorContext);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true)
        await getAllPlacedOrder();
        setRefreshing(false);
    }
    const renderItem = ({ item }) => {
        return <View style={styles.orderBox}>
            <View style={{ width: 100, height: 100, marginHorizontal: 10 }}>
                <Image source={{ uri: item?.items[0].item?.image.url }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            </View>
            <View style={{ width: "65%" }}>
                <Text numberOfLines={1} style={{ color: "#111", fontSize: 15, fontWeight: "600" }}>OrderId: {item._id}</Text>
                <Text style={{ color: "#111", fontSize: 18, fontWeight: "600" }}>Name: {item?.items[0].item?.name}</Text>
                <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>Total: Rs{item.total_amount}</Text>
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
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Text style={{
                fontSize: 20, color: "#111", fontWeight: "600", paddingHorizontal: 20,
                paddingVertical: 10
            }}>AllOrders</Text>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />
                }
                style={{ paddingVertical: 10 }}>
                <FlatList
                    nestedScrollEnabled
                    data={allOrders}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id.toString()}
                />
            </ScrollView>
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