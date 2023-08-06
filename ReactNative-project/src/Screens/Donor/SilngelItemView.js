import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationRef } from '../../../App';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLOURS } from '../../Components/ThemeColours';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { DonorContext } from '../../Context/DonorContext/DonorContext';
import { ErrorAlert } from '../../helper/ShowAlert';
import instance from '../../Api/AxiosConfig';
const { height, width } = Dimensions.get("screen");
const SingleItemView = ({ route, navigation }) => {
    const { _id } = route.params.item;

    const [item, setItem] = useState(null);
    const { onAddCart, onRemoveCart, saveAllItems, setScreenIndex, loader, cartItem, setTotalPrice,
        totalPrice } = useContext(DonorContext);

    useEffect(() => { getItemById() }, [route.params.item, cartItem]);

    const getItemById = async () => {
        try {
            const response = await instance.get(`/api/item/get-item/${_id}`);
            if (response.status == 200) {
                if (response.data['status'] == '200') {
                    setItem(response.data['item'])
                }
            }
        } catch (error) {
            const err = JSON.parse(JSON.stringify(error));
            if (err.status == 404) {
                ErrorAlert(err.message);
            } else if (err.status == 500) {
                ErrorAlert(err.message);
            } else {
                ErrorAlert(JSON.stringify(err));
            }
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: height * 0.06, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                <Ionicons onPress={() => { NavigationRef.current.goBack() }} name="ios-chevron-back-outline" color="#111" size={25} style={{ paddingHorizontal: 15 }} />
                <Text style={{ color: "#111", fontSize: 17, fontWeight: "600", paddingHorizontal: 10 }}>View Item</Text>
            </View>
            {item == null ? <ActivityIndicator /> : <ScrollView>
                <View style={{ width: width, height: height * 0.3, alignItems: "center", justifyContent: 'center', marginVertical: 20 }}>
                    <Image source={{ uri: item.image.url }} style={{ width: width - 60, height: height * 0.3, borderRadius: 10 }} />
                </View>
                <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: "#111", fontSize: 20, fontWeight: "600" }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}> Price:</Text>
                        <Text style={{ color: "#111", fontSize: 20, fontWeight: "600" }}> Rs:{item.price}</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 30, flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}>Category: {item.category.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}> Quantity:</Text>
                        <Text style={{ color: "#111", fontSize: 20, fontWeight: "600" }}>  {item.quantity}</Text>
                    </View>
                </View >
                <View style={{ paddingHorizontal: 20, marginTop: 30, marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={{ uri: item.vendor.profile_picture.url }}
                        style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }}
                    />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}>{item.vendor.full_name}</Text>
                        <Text style={{ color: "#777", fontSize: 14, fontWeight: "600" }}>{item.vendor.email_address}</Text>
                    </View>
                </View>
                <View style={{ width: width, height: height * 0.25, paddingHorizontal: 20 }}>
                    <Text style={{ color: "#111" }}>{item.description}</Text>
                </View>
                <View style={{ width: width, height: height * 0.07, paddingHorizontal: 20, flexDirection: "row", justifyContent: 'space-between' }}>
                    <View style={{ width: width / 2 - 40, height: height * 0.07, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', borderRadius: 10, justifyContent: "space-around" }}>
                        <TouchableOpacity onPress={() => {
                            var data = saveAllItems?.filter(v => v._id == item._id);
                            console.log(data)
                            // if (data.length > 0) {
                                let prc = totalPrice;
                                prc -= item.price;
                                onRemoveCart(item._id)
                                setTotalPrice(prc);
                            // } else {
                            //     ErrorAlert("Please Add One Item");
                            // }
                        }}>
                            <FontAwesome name="minus" color="#111" size={18} />
                        </TouchableOpacity>
                        <View style={{}}>
                            {/* {console.log(cartItem.map((v, k) => v.item == item._id).length,"dd")} */}
                            {

                                cartItem != null || cartItem?.length > 0 ? <CountText
                                    allSaveItem={cartItem}
                                    id={item._id}
                                />


                                    : <Text style={{ color: "#111", fontSize: 20, fontWeight: "600", paddingHorizontal: 10 }}>0</Text>
                            }
                        </View>
                        <TouchableOpacity onPress={() => {
                            let prc = totalPrice;
                            prc += item.price;
                            onAddCart(item)
                            setTotalPrice(prc);
                        }}>
                            <FontAwesome name="plus" color="#111" size={18} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { setScreenIndex(1), NavigationRef.current.goBack(); }} style={{ width: width / 2 - 40, height: height * 0.07, backgroundColor: COLOURS.apple, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: "#fff" }}>Check Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>}
            {loader && <View style={{ width: "100%", height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, right: 0, backgroundColor: "#2e2e2e8f" }}>
                <ActivityIndicator />
            </View>}
        </View>
    )
}

export default SingleItemView

const styles = StyleSheet.create({})

const CountText = ({ allSaveItem, id }) => {
    // const [count, setCount] = React.useState(0);
    // React.useEffect(() => {
    //     console.log(allSaveItem.length)
    //     let it = count;
    //     allSaveItem.map((value, key) => {
    //         if (value.item == id) {
    //             it += 1;
    //             setCount(it);
    //         }
    //     })
    // }, [allSaveItem, id])
    return <Text style={{ color: "#111", fontSize: 16, fontWeight: "600", paddingHorizontal: 10 }}>{
        allSaveItem.map((value, key) => value.item == id).length
    }</Text>
}