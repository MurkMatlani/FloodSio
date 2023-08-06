import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { DonorContext } from '../../Context/DonorContext/DonorContext';
import { COLOURS } from '../../Components/ThemeColours';
import { NavigationRef } from '../../../App';
import { ErrorAlert } from '../../helper/ShowAlert';
import instance from '../../Api/AxiosConfig';

const CartView = () => {
    const { saveAllItems, onRemoveCart, loader, cartItem, totalPrice, setTotalPrice, sumTotal, allItems } = useContext(DonorContext)
    const [price, setPrice] = useState(0);
    const [allItem, stallItem] = useState(null);
    const getAllItems = async () => {
        try {
            const response = await instance.get(`/api/item/get-all-items`);
            // console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == "200" && cartItem != null) {
                    stallItem(response.data['allItems']);
                    const result = response.data['allItems'].find(subArray => cartItem.some(value => value.item == subArray._id));
                    console.log(result);
                    setPrice(result?.price * cartItem.length)
                } else {
                    stallItem(null);
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

    // const sumTotal1 = async () => {
    //     await getAllItems();
    //     if (cartItem != null && allItem != null) {
    //         console.log(allItems.length)
    //         // sumTotal(cartItem)
    //         
    // const result = allItems.find(subArray => cartItem.some(value => value.item == subArray._id));
    //         console.log(result);
    //         setPrice(result?.price * cartItem.length)

    //     }
    // }
    useEffect(() => {
        getAllItems();
    }, [])

    const RenderCartItem = ({ id }) => {
        const [items, setItems] = useState(null);


        useEffect(() => {
            getItemById(id);
        }, [id])
        const getItemById = async (id) => {
            try {
                const response = await instance.get(`/api/item/get-item/${id}`);
                if (response.status == 200) {
                    if (response.data['status'] == '200') {
                        setItems(response.data['item'])
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
            <View>
                {items == null ? <View></View> : <View style={styles.cartItem}>
                    <Image source={{ uri: items.image.url }} style={styles.itemImage} />
                    <View>
                        <Text style={styles.itemName}>{items.name}</Text>
                        <Text style={styles.itemPrice}>Price: Rs:{items.price}</Text>

                    </View>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => {
                            onRemoveCart(items._id)
                            getAllItems();
                        }}
                    >
                        <Image source={require('../../Images/delete-icon.png')} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>}
            </View>
        )
    };

    const renderCartItem = ({ item, index }) => <RenderCartItem key={index} id={item.item} />
    return (

        <View style={styles.container}>
            {cartItem == null ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: "#777", fontSize: 20, fontWeight: "700" }}>No Cart Item Founded</Text></View>
                :
                <FlatList
                    data={cartItem ??
                        cartItem}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item._id.toString()}
                />}

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total Price:</Text>
                <Text style={styles.totalPrice}>Rs:{price}</Text>
            </View>

            <TouchableOpacity
                onPress={() => {
                    if (cartItem != null || cartItem?.length > 0) {
                        NavigationRef.current.navigate("PaymentScreen", { total: price })
                    } else {
                        ErrorAlert("Please Add One Item To Check Out");
                    }
                }}
                style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
            {loader && <View style={{ width: "100%", height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, right: 0 }}>
                <ActivityIndicator />
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 16,
    },
    cartItem: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 8,
        elevation: 10,
        marginTop: 10,
        borderRadius: 10,
        marginHorizontal: 10
    },
    itemImage: {
        width: 100,
        height: 100,
        marginRight: 8,
        borderRadius: 10,
    },
    itemName: {
        fontSize: 18,
        color: "#111",
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',

    },
    removeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 4,
    },

    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        width: "100%"
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#111",

    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
    checkoutButton: {
        backgroundColor: COLOURS.coral,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CartView;
