import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useContext, useState } from 'react'
import { RiderContext } from '../../Context/RiderContext/RiderContext'
import instance from '../../Api/AxiosConfig';
import { ErrorAlert } from '../../helper/ShowAlert';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationRef } from '../../../App';
const AllCompletedDonations = () => {
    const { allCompletedDonations, getCurrentDonation } = useContext(RiderContext);
    const [refresh, setSRefresh] = useState(false)
    const onRefresh = async () => {
        setSRefresh(true);
        await getCurrentDonation()
        setSRefresh(false);
    }
    return (
        <View style={{ flex: 1, }}>
            <Text style={{ color: "#111", paddingHorizontal: 20, paddingVertical: 20, fontWeight: "600", fontSize: 20 }}>All Complete Donations</Text>
            <View>
                {
                    allCompletedDonations == null || allCompletedDonations?.length <= 0 ?
                        <View style={{ color: "#111", fontWeight: "600", fontSize: 20 }}><Text>No Donation Completed</Text></View>
                        : <FlatList
                            refreshControl={<RefreshControl
                                refreshing={refresh}
                                onRefresh={onRefresh}
                            />}
                            data={allCompletedDonations}
                            renderItem={({ item, index }) => {
                                return <Donation id={item} key={index} />
                            }}
                        />
                }
            </View>
        </View>
    )
}


const Donation = ({ id }) => {
    const [donation, setDonation] = React.useState(null);
    React.useEffect(() => {
        getDonationById(id);
    }, [id]);

    const getDonationById = async (id) => {
        try {
            const response = await instance.get(`/api/donation/get-donation/${id}`)
            if (response.status == 200) {
                if (response.data['status'] == '200') {
                    console.log()
                    setDonation(response.data['donation']);
                }
            } else {
                ErrorAlert("Please restart App");
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (donation == null) {
        return <View></View>
    } else {
        return <View style={[styles.item, { backgroundColor: "#fff", display: 'flex', flexDirection: "row" }]}>
            <View style={{ width: 100, height: 100 }}>
                <Image source={{ uri: donation.items[0].item.image.url }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={[styles.title, { color: "#111" }]}>{donation.items[0].item.name}</Text>
                <Text style={[styles.description, { color: "#111" }]} numberOfLines={2}>Donor Name: {donation.donor.full_name}</Text>
                <View>
                    <Text style={{ color: "#111" }}>Status: {donation.completed ? "Completed" : "Process"}</Text>
                </View>
            </View>
            <View style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                    NavigationRef.current.navigate("ViewDonation", { donation: donation })
                }}><Ionicons name="eye" color="#111" size={20} /></TouchableOpacity>
            </View>
        </View>
    }
}

export default AllCompletedDonations

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