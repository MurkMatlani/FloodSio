import React, { useContext, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationRef } from '../../../App';
import { COLOURS } from '../../Components/ThemeColours';
import { AdminContext } from '../../Context/AdminContext/AdminContext';
const { height, width } = Dimensions.get("screen");
const SingleItemView = ({ route, navigation }) => {
    const { item } = route.params;
    const [isEnabled, setIsEnabled] = useState(item.is_in_need);
    const { onRemoveItemFromNecess, onAddItemFromNecess } = useContext(AdminContext);
   
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: height * 0.06, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                <Ionicons onPress={() => { NavigationRef.current.goBack() }} name="ios-chevron-back-outline" color="#111" size={25} style={{ paddingHorizontal: 15 }} />
                <Text style={{ color: "#111", fontSize: 17, fontWeight: "600", paddingHorizontal: 10 }}>View Item</Text>
            </View>
            <ScrollView>
                <View style={{ width: width, height: height * 0.3, alignItems: "center", justifyContent: 'center', marginVertical: 20 }}>
                    <Image source={{ uri: item.image.url }} style={{ width: width - 60, height: height * 0.3, borderRadius: 10 }} />
                </View>
                <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: "#111", fontSize: 20, fontWeight: "600" }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}> Price: </Text>
                        <Text style={{ color: "#111", fontSize: 20, fontWeight: "600" }}>Rs:{item.price}</Text>
                    </View>
                </View >
                <View style={{ paddingHorizontal: 30, flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}>Category: {item.category.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}> Quantity:</Text>
                        <Text style={{ color: "#111", fontSize: 20, fontWeight: "600" }}> {item.quantity}</Text>
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
                <View style={{ width: width, height: height * 0.3, paddingHorizontal: 20 }}>
                    <Text style={{ color: "#111" }}>{item.description}</Text>
                </View>
                <View style={{ width: width, height: height * 0.07, paddingHorizontal: 20, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: "#111", fontSize: 16, fontWeight: '600' }}>Add Item Necessary</Text>
                    <Switch
                        onValueChange={async (e) => {
                            if (isEnabled) {
                                await onRemoveItemFromNecess(item._id);
                                setIsEnabled(false);
                            } else {
                                await onAddItemFromNecess(item._id);
                                setIsEnabled(true);
                            }
                            // await addItemToNecessary(item._id, e);
                            // setIsEnabled(e)
                        }}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? COLOURS.apple : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        value={isEnabled}
                    />
                </View>
                {/* <View style={{ width: width, height: height * 0.07, paddingHorizontal: 20, flexDirection: "row", justifyContent: 'space-between' }}>
                    <View style={{ width: width / 2 - 40, height: height * 0.07, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', borderRadius: 10, justifyContent: "space-around" }}>
                        <TouchableOpacity onPress={() => { onRemoveCart(item._id) }}>
                            <FontAwesome name="minus" color="#111" size={18} />
                        </TouchableOpacity>
                        <View style={{}}>
                            {
                                saveAllItems != null ? <CountText
                                    allSaveItem={saveAllItems}
                                    id={item._id}
                                />


                                    : <Text style={{ color: "#111", fontSize: 20, fontWeight: "600", paddingHorizontal: 10 }}>0</Text>
                            }
                        </View>
                        <TouchableOpacity onPress={() => { onAddCart(item) }}>
                            <FontAwesome name="plus" color="#111" size={18} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { setScreenIndex(1), NavigationRef.current.goBack(); }} style={{ width: width / 2 - 40, height: height * 0.07, backgroundColor: COLOURS.apple, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: "#fff" }}>Check Out</Text>
                    </TouchableOpacity>
                </View> */}

            </ScrollView>
        </View>
    )
}

export default SingleItemView

const styles = StyleSheet.create({})

const CountText = ({ allSaveItem, id }) => {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        // console.log(allSaveItem.length)
        let it = count;
        allSaveItem.map((value, key) => {
            if (value._id == id) {
                it += 1;
                setCount(it);
            }
        })
    }, [allSaveItem, id])
    return <Text style={{ color: "#111", fontSize: 16, fontWeight: "600", paddingHorizontal: 10 }}>{count}</Text>
}