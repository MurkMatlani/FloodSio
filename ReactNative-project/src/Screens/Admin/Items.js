import React, { useContext } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationRef } from '../../../App'
import { AdminContext } from '../../Context/AdminContext/AdminContext'
import { FlatGrid } from 'react-native-super-grid'
const { width, height } = Dimensions.get("screen")
const Items = () => {
    const { allItems } = useContext(AdminContext);



    const [search, setSearch] = React.useState('');
    const [filteredDataSource, setFilteredDataSource] = React.useState(null);

    React.useEffect(() => { setFilteredDataSource(allItems) }, [allItems])

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = allItems.filter(
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
            setFilteredDataSource(allItems);
            setSearch(text);
        }
    };



    const Item = ({ item, backgroundColor, textColor }) => (
        <TouchableOpacity
            onPress={() => { NavigationRef.current.navigate("SingleItemView", { item }) }}
            style={[styles.item, { backgroundColor, paddingHorizontal: 0, borderRadius: 10, elevation: 10 }]}>
            <View style={{ width: "100%", height: height * 0.15 }}>
                <Image source={{ uri: item.image.url }} style={{ width: "100%", height: height * 0.15, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
            </View>
            {/* <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 10 }}>
                <Text style={{ color: textColor, fontSize: 12, fontWeight: '700', width: "50%" }} numberOfLines={1}>Author: {item.vendor.email_address}</Text>
                <Text style={{ color: textColor, fontSize: 12, fontWeight: '700', width: "50%", alignItems: 'flex-end', textAlign: "right" }}>Quantity: {item.quantity}</Text>
            </View> */}
            <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingVertical: 3, paddingHorizontal: 10 }}>
                <Text style={{ color: textColor, fontSize: 16, fontWeight: '700', width: "70%" }} numberOfLines={1} >{item.name}</Text>
                <Text style={{ color: textColor, fontSize: 15, fontWeight: '700', width: "30%", textAlign: "right" }}>Rs:{item.price}</Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: '#ccc', fontSize: 15, fontWeight: '700', width: "100%" }} numberOfLines={2}>{item.description}</Text>
            </View>
            {/* <View style={{ position: 'absolute', top: 5, right: 5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#fff', width: 60, height: 30, borderRadius: 5 }}>
                <TouchableOpacity onPress={() => { onEdit(item) }}><Image source={require("../../Images/edit-icon.png")} style={{ width: 20, height: 20 }} /></TouchableOpacity>
                <View style={{ width: 10 }}></View>
                <TouchableOpacity onPress={() => { onDelete(item.id) }}>
                    <Image source={require("../../Images/delete-icon.png")} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            </View> */}
        </TouchableOpacity>
    );


    const renderItem = ({ item }) => {
        // console.log(item.vendor)
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
                <Text style={{ color: "#111", fontSize: 17, fontWeight: "600", paddingHorizontal: 10 }}>All Items</Text>
            </View>
            <View style={{ width: "90%", height: 50, backgroundColor: '#D0D3D4', marginHorizontal: 20, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    onChangeText={searchFilterFunction}
                    value={search}
                    style={{ width: "80%", paddingHorizontal: 10, color: "#111" }} placeholder='Search here...' placeholderTextColor={"#777"} />
                <View style={{ width: 10 }}></View>
                <Image source={require("../../Images/search-icon.png")} style={{ width: 25, height: 25, }} />
            </View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}><Text style={{ color: "#111", fontSize: 18, fontWeight: '600' }}>All Items</Text></View>
            <View style={{ height: "73%" }}>

                {filteredDataSource == null ? <ActivityIndicator /> :

                    <FlatGrid
                        itemDimension={150}
                        data={filteredDataSource}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        ListEmptyComponent={() => {
                            return <View style={{ paddingHorizontal: 90, paddingVertical: 100 }}><Text style={{ color: "#777", fontSize: 20, fontWeight: '600' }}>Items is Not Available</Text></View>
                        }}
                    // renderItem={({ item }) => (<Text style={{color:"#111"}}>{item}</Text>)}
                    />
                    //  <FlatList
                    //     style={{ paddingVertical: 10, }}
                    //     nestedScrollEnabled
                    //     data={filteredDataSource}
                    //     renderItem={renderItem}
                    //     keyExtractor={item => item._id}
                    //     ListEmptyComponent={() => {
                    //         return <View style={{ paddingHorizontal: 90, paddingVertical: 100 }}><Text style={{ color: "#777", fontSize: 20, fontWeight: '600' }}>Items is Not Available</Text></View>
                    //     }}
                    // // extraData={selectedId}
                    // />
                }
            </View>
        </View>
    )
}

export default Items

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        paddingBottom: 10,
        elevation: 10,
        marginVertical: 5,
        position: 'relative'
    }
})