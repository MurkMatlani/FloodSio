import { StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NavigationRef } from '../../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import instance from '../../Api/AxiosConfig';
import { ErrorAlert } from '../../helper/ShowAlert';
import Slideshow from '../../Components/Slideshow';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLOURS } from '../../Components/ThemeColours';

const TrackOrder = ({ route, navigation }) => {
    const { height } = Dimensions.get("screen");
    // console.log(route);
    const [order, setOrder] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [item, setItem] = React.useState(null);
    const [items, setItems] = React.useState([{ label: "PLACED", value: 'PLACED' },
    { label: "PREPARING", value: "PREPARING" },
    { label: "FINISHED", value: "FINISHED" }]);
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

    const onUpdateOrderStatus = async (status) => {
        if (status == "FINISHED") {
            await finishedOrder();
        } else {
            try {
                setOrder(null);
                const response = await instance.patch(`/api/order/update-order-status/${order?._id}`, { updatedStatus: status });
                if (response.status == 200) {
                    if (response.data['status'] == '200') {
                        await getOrderById();
                    } else if (response.data['status'] == '400' || response.data['status'] == '404') {
                        ErrorAlert(response.data['message']);
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
    }

    const finishedOrder = async () => {
        try {
            setOrder(null);
            const response = await instance.post(`/api/order/${order?._id}/finish-order`);
            if (response.status == 200) {
                if (response.data['status'] == '200') {
                    await getOrderById();
                } else if (response.data['status'] == '400' || response.data['status'] == '404') {
                    ErrorAlert(response.data['message']);
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
                            // activeStepIconColor={"#ccc"}
                            // activeStepIconBorderColor={"#ccc"}
                            // activeLabelColor={"#ccc"}
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
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={{ color: "#111", fontSize: 15, fontWeight: "600", marginBottom: 5 }}>Order Status</Text>
                        <DropDownPicker
                            placeholder='update order status'
                            items={items}
                            setOpen={setOpen}
                            open={open}
                            setValue={setItem}
                            value={item}
                            setItems={setItems}
                            onChangeValue={(v) => {
                                onUpdateOrderStatus(v);
                            }}
                        />
                    </View>
                    <View style={{ width: "100%", justifyContent: 'center', alignContent: "center", alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => { finishedOrder() }} style={{ backgroundColor: COLOURS.apple, alignContent: "center", alignItems: "center", justifyContent: 'center', width: "90%", height: 50, borderRadius: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}>Finish Order</Text>
                        </TouchableOpacity>
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