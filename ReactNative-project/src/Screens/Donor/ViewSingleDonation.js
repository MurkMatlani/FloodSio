import { StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Carousel from 'react-native-snap-carousel';

const ViewSingleDonation = ({ route, navigation }) => {
    const { width, height } = Dimensions.get("screen");
    console.log(route.params);
    const { donation } = route.params;

    const ImageSlider = () => {
        const renderItem = ({ item, index }) => {
            // console.log(item.item.name, "dddd");
            return (
                <View key={index} style={{ backgroundColor: "#fff", width: "90%", height: height * 0.3 }}>
                    <Image key={index} source={{ uri: item?.item?.image.url }} style={{ width: "100%", height: height * 0.3, borderRadius: 10 }} />
                    <Text style={{ color: "#111", position: "absolute", zIndex: 99, bottom: 30, paddingHorizontal: 10, fontSize: 18, fontWeight: '600', }}>{item?.item?.name}</Text>
                </View>
            );
        }

        const { width, height } = Dimensions.get("screen")

        const carousel = React.useRef();
        return <Carousel
            ref={carousel}
            data={donation.items}
            renderItem={renderItem}
            autoplay={true}
            containerCustomStyle={{ backgroundColor: '#fff', marginLeft: 0, paddingLeft: 0, paddingRight: 0 }}
            sliderWidth={width - 10}
            itemWidth={width - 10}
        />

    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: height * 0.06, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                <Ionicons onPress={() => { navigation.goBack() }} name="ios-chevron-back-outline" color="#111" size={25} style={{ paddingHorizontal: 15 }} />
                <Text style={{ color: "#111", fontSize: 17, fontWeight: "600", paddingHorizontal: 10 }}>View Donation</Text>
            </View>
            <ScrollView>
                <View style={{ width: "90%", height: height * 0.3, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10, alignSelf: 'center', marginTop: 10 }}>
                    <ImageSlider />
                </View>
                {/* <View> */}
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ color: "#111", fontSize: 16, fontWeight: "600" }}>Donation Id: {donation._id}</Text>
                </View>
                <Text style={{ fontSize: 20, fontWeight: "600", color: "#111", marginHorizontal: 20, marginTop: 20 }}>Rider:</Text>
                {donation.rider == null ? <Text style={{ color: '#777', paddingHorizontal: 20, marginTop: 20, fontSize: 14, fontWeight: "600" }}>Process</Text> : <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: "row", alignItems: 'center' }}>
                    {donation.rider?.profile_picture.url == "" ?
                        <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }} source={require('../../Images/user.png')} />
                        :
                        <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }} source={{ uri: donation.rider?.profile_picture.url }} />}
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: "#111", fontSize: 18, fontWeight: "600" }}>{donation.rider?.full_name}</Text>
                        <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>{donation.rider?.email_address}</Text>
                        <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>{donation.rider?.phone_no}</Text>

                    </View>
                </View>}
                <Text style={{ fontSize: 20, fontWeight: "600", color: "#111", marginHorizontal: 20, marginTop: 20 }}>Vendor:</Text>
                <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: "row", alignItems: 'center' }}>
                    {donation.vendor.profile_picture.url == "" ?
                        <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }} source={require('../../Images/user.png')} />
                        :
                        <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }} source={{ uri: donation.vendor.profile_picture.url }} />}
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: "#111", fontSize: 18, fontWeight: "600" }}>{donation.vendor.full_name}</Text>
                        <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>{donation.vendor.email_address}</Text>
                        <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>{donation.vendor.phone_no}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 20, fontWeight: "600", color: "#111", marginHorizontal: 20, marginTop: 20 }}>Victim:</Text>
                {donation.victim == null ? <Text style={{ color: '#777', paddingHorizontal: 20, marginTop: 20, fontSize: 14, fontWeight: "600" }}>Process</Text> : <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: "row", alignItems: 'center' }}>
                    {donation.victim?.profile_picture.url == "" ?
                        <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }} source={require('../../Images/user.png')} />
                        :
                        <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: "#111" }} source={{ uri: donation.victim?.profile_picture.url }} />}
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: "#111", fontSize: 18, fontWeight: "600" }}>{donation.victim?.full_name}</Text>
                        <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>{donation.victim?.email_address}</Text>
                        <Text style={{ color: "#111", fontSize: 14, fontWeight: "600" }}>{donation.victim?.phone_no}</Text>

                    </View>
                </View>}

                <Text style={{ fontSize: 20, fontWeight: "600", color: "#111", marginHorizontal: 20, marginTop: 20 }}>Evidence Picture:</Text>
                {donation.evidencePicture == "" ? <Text style={{
                    color: '#777', paddingHorizontal: 20,
                    marginTop: 20, fontSize: 14, fontWeight: "600"
                }}>Process</Text>
                    : <View style={{
                        paddingHorizontal: 20, marginTop: 20, flexDirection:
                            "row", alignItems: 'center', justifyContent: "center"
                    }}>
                        <Image source={{ uri: donation.evidencePicture }} style={{ width: "90%", height: height * 0.2, borderRadius: 10 }} />
                    </View>}
                <View style={{ height: 20 }}></View>
                {/* </View> */}
            </ScrollView>
        </View>
    )
}

export default ViewSingleDonation

const styles = StyleSheet.create({})