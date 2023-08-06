import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { NavigationRef } from '../../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import instance from '../../Api/AxiosConfig';
import { ErrorAlert } from '../../helper/ShowAlert';
import Slideshow from '../../Components/Slideshow';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const TrackOrder = ({ route, navigation }) => {
    const { height } = Dimensions.get("screen");
    // console.log(route);
    const [order, setOrder] = React.useState(null);
    const { id } = route.params;
    React.useEffect(() => { getOrderById() }, [id])
    const getOrderById = async () => {
        try {
            const response = await instance.get(`/api/order/get-order/${id}`);
            if (response.status == 200) {
                if (response.data['status'] == '200') {
                    // console.log(response.data['order'])
                    setOrder(response.data['order']);
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
    // const orderTypes = {
    //     placed: "PLACED",
    //     finished: "FINISHED",
    //     preparing: "PREPARING",
    //     cancelled: "CANCELLED",
    //   };
    // const paymentTypes = {
    //     not_paid: "NOT-PAID",
    //     paid: "PAID",
    //     partial: "PARTIAL",
    //   };

    return (
        <View>
            <View style={{ width: '100%', height: height * 0.06, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                <Ionicons onPress={() => { NavigationRef.current.goBack() }} name="ios-chevron-back-outline" color="#111" size={25} style={{ paddingHorizontal: 15 }} />
                <Text style={{ color: "#111", fontSize: 17, fontWeight: "700", paddingHorizontal: 10 }}>Track Order</Text>
            </View>
            {
                order != null ? <View>
                    <View style={{ width: "100%", height: height * 0.3, paddingTop: 20, paddingHorizontal: 10 }}>
                        <CustomImageSlider
                            item={order.items}
                        />
                    </View>
                    <View style={{ width: "100%", height: height * 0.4, }}>
                        <ProgressSteps
                            activeStep={order.order_status == "PLACED" ? 1 :
                            order.order_status == "PREPARING" ? 2
                                 : 0}
                        isComplete={order.order_status == "FINISHED"}
                        completedLabelColor="green"
                        >
                            <ProgressStep removeBtnRow={true} label="Placed Order">
                                <View style={{ alignItems: 'center' }}>
                                    <Text>This is the content within step 1!</Text>
                                </View>
                            </ProgressStep>
                            <ProgressStep removeBtnRow={true} label="PREPARING">
                                <View style={{ alignItems: 'center' }}>
                                    <Text>This is the content within step 2!</Text>
                                </View>
                            </ProgressStep>
                            {/* <ProgressStep removeBtnRow={true} label="CANCELLED">
                                <View style={{ alignItems: 'center' }}>
                                    <Text>This is the content within step 3!</Text>
                                </View>
                            </ProgressStep> */}
                            <ProgressStep removeBtnRow={true} label="FINISHED">
                                <View style={{ alignItems: 'center' }}>
                                    <Text>This is the content within step 3!</Text>
                                </View>
                            </ProgressStep>
                           
                        </ProgressSteps>
                    </View>
                </View> :
                    <ActivityIndicator />

            }
        </View>
    )
}

export default TrackOrder

const styles = StyleSheet.create({})



const CustomImageSlider = ({ item }) => {
    // console.log(item);
    const [dataSource, setDataSource] = useState(
        item.map((e) => ({
            title: e.item.name,
            caption: '',
            url: e.item.image.url,
        }))
    )
    const [position, setPosition] = useState(1);
    return <Slideshow
        dataSource={dataSource}
        position={position}
        titleStyle={{ color: "#fff", fontSize: 20, paddingHorizontal: 25 }}
        onPositionChanged={position => { setPosition(position) }} />

}