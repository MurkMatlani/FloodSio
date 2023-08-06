import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { FlatGrid } from 'react-native-super-grid';
import { NavigationRef } from '../../../App';
import { DonorContext } from '../../Context/DonorContext/DonorContext';

const { width, height } = Dimensions.get("screen")
const ItemView = () => {
    const { allItems, getAllItemsNecessary, loader } = useContext(DonorContext);

    useEffect(() => { getAllItemsNecessa() }, [])

    const getAllItemsNecessa = async () => {
        await getAllItemsNecessary();
    }
    const Item = ({ item, backgroundColor, textColor }) => (
        <TouchableOpacity
            onPress={() => {
                NavigationRef.current.navigate("SingleItemView", { item })
            }}

            style={[styles.item, { backgroundColor, paddingHorizontal: 0, borderRadius: 10, elevation: 10 }]}>
            <View style={{ width: "100%", height: height * 0.15 }}>
                <Image source={{ uri: item.image.url }} style={{ width: "100%", height: height * 0.15, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingVertical: 3, paddingHorizontal: 10 }}>
                <Text style={{ color: textColor, fontSize: 16, fontWeight: '700', width: "60%" }} numberOfLines={1} >{item.name}</Text>
                <Text style={{ color: textColor, fontSize: 14, fontWeight: '700', width: "40%", textAlign: "right" }}>Rs:{item.price}</Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: '#ccc', fontSize: 15, fontWeight: '700', width: "100%" }} numberOfLines={2}>{item.description}</Text>
            </View>
            {/* <View style={{ position: 'absolute', top: 5, right: 5, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#fff', width: 70, height: 30, borderRadius: 5 }}>
                <TouchableOpacity onPress={() => { onRemoveCart(item._id) }}>
                    <FontAwesome name="minus" color="#111" size={18} />
                </TouchableOpacity>
                <View style={{}}>
                    {
                        saveAllItems != null ? <CountText
                            allSaveItem={saveAllItems}
                            id={item._id}
                        />


                            : <Text style={{ color: "#111", fontSize: 16, fontWeight: "600", paddingHorizontal: 10 }}>0</Text>
                    }
                </View>
                <TouchableOpacity onPress={() => { onAddCart(item) }}>
                    <FontAwesome name="plus" color="#111" size={18} />
                </TouchableOpacity> */}
            {/* </View> */}
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
            <TouchableOpacity onPress={() => { NavigationRef.current.navigate("SellAllItems") }} style={{ width: "90%", height: 50, backgroundColor: '#D0D3D4', marginHorizontal: 20, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    // onChangeText={searchFilterFunction}
                    // value={search}
                    editable={false}
                    onPressOut={() => { }}
                    style={{ width: "80%", paddingHorizontal: 10, color: "#111" }} placeholder='Search here...' placeholderTextColor={"#777"} />
                <View style={{ width: 10 }}></View>
                <Image source={require("../../Images/search-icon.png")} style={{ width: 25, height: 25, }} />
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}><Text style={{ color: "#111", fontSize: 18, fontWeight: '600' }}>All Items</Text></View>
            <View style={{ height: height * 0.67 }}>
                <ScrollView
                    nestedScrollEnabled
                >
                    <ImageSlider />
                    <CategoryView />
                    {allItems == null ? <ActivityIndicator /> :
                        <FlatGrid
                            // nestedScrollEnabled

                            itemDimension={150}
                            data={allItems}
                            renderItem={renderItem}
                            keyExtractor={item => item._id}
                            ListEmptyComponent={() => {
                                return <View style={{ paddingHorizontal: 90, paddingVertical: 100 }}><Text style={{ color: "#777", fontSize: 20, fontWeight: '600' }}>Items is Not Available</Text></View>
                            }}
                        />}
                </ScrollView>
            </View>
            {loader && <View style={{ width: "100%", height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, right: 0 }}>
                <ActivityIndicator />
            </View>}
        </View>
    )
}

export default ItemView

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        paddingBottom: 10,
        elevation: 10,
        marginVertical: 5,
        position: 'relative'
    }
})

const CategoryView = () => {
    const { allCategories, getAllItemsByCategory } = useContext(DonorContext);

    return (
        <View style={{ width: width, height: 60, marginTop: 20, backgroundColor: '#fff', paddingHorizontal: 10 }}>
            {
                allCategories == null ? <ActivityIndicator /> :
                    <FlatList
                        horizontal
                        data={allCategories}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity
                                onPress={() => {
                                    getAllItemsByCategory(item._id);
                                }}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    marginHorizontal: 6,
                                    backgroundColor: "#ccc",
                                    height: 35,
                                }}
                                key={index}>
                                <Text style={{ color: "#111" }}>{item.name}</Text>
                            </TouchableOpacity>
                        }}
                    />
            }
            <View style={{ width: "100%", alignItems: 'flex-end' }}>
                <Text
                    onPress={() => { NavigationRef.current.navigate("SellAllItems") }}
                    style={{ color: "#111", fontWeight: '600', textDecorationLine: "underline" }}>See All</Text>
            </View>
        </View>)
}

const CountText = ({ allSaveItem, id }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
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


const ImageSlider = () => {
    const renderItem = ({ item, index }) => {
        console.log(item);
        return (
            // <View key={index} >
            <Image key={index} source={item} style={{ width: width * 0.93, height: height * 0.25, borderRadius: 10 }} />
            // </View>
        );
    }

    const { width, height } = Dimensions.get("screen")

    const carousel = useRef();
    return <Carousel
        ref={carousel}
        data={[require(`../../Images/img1.jpg`), require(`../../Images/img2.jpg`), require(`../../Images/img3.jpg`)]}
        renderItem={renderItem}
        autoplay={true}
        containerCustomStyle={{ backgroundColor: '#fff', marginLeft: 10, paddingLeft: 5, paddingRight: 5 }}
        sliderWidth={width - 20}
        itemWidth={width - 20}
    />

} 