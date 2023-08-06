
import { createContext, useState, useEffect, useContext } from "react";
import instance from "../../Api/AxiosConfig";
import { ErrorAlert } from "../../helper/ShowAlert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainAppContext } from "../MainAppContext";
import { NavigationRef } from "../../../App";


const DonorContext = createContext();

const DonorContextProvider = ({ children }) => {
    const [allItems, setAllItems] = useState(null);
    const [allOrders, setAllOrders] = useState(null);
    const [allCategories, setAllCategories] = useState(null);
    const [screenIndex, setScreenIndex] = useState(0);
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [itemCount, setItemCount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [loader, setLoader] = useState(false);
    const [allDonations, setAllDonations] = useState(null);
    const [cartItem, setCartItem] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const { localUser } = useContext(MainAppContext);
    const [saveAllItems, setSaveAllItems] = useState(null);
    useEffect(() => {
        getAllCategory();
        getAllItemsNecessary();
        getAllSaveItem();
        getAllPlacedOrder();
        getAllDonations();
        getCarItem();
    }, []);


    const getAllDonations = async () => {
        try {
            const response = await instance.get(`/api/donation/get-donor-donations/${localUser['_id']}`);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    console.log(response.data);
                    setAllDonations(response.data['donation']);
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

    const getAllCategory = async () => {
        try {
            const response = await instance.get("/api/category/get-all-categories");
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    setAllCategories(response.data['allCategories']);
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
    const getAllItemsNecessary = async () => {
        try {
            const response = await instance.get(`/api/item/get-all-necessary-items`);
            // console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    setAllItems(response.data['allItems']);
                } else {
                    setAllItems(null);
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
    const getAllItems = async () => {
        try {
            const response = await instance.get(`/api/item/get-all-items`);
            // console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    setAllItems(response.data['allItems']);
                } else {
                    setAllItems(null);
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
    const getAllItemsByCategory = async (categoryId) => {
        try {
            const response = await instance.get(`/api/item/get-all-items-by-category/${categoryId}`);
            // console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    setAllItems(response.data['categoryItems']);
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
    const getAllSaveItem = async () => {
        try {
            const allItems = await AsyncStorage.getItem("@AllItems");
            if (allItems == null) {
                setSaveAllItems(null);
            } else {
                const jsonAllItems = JSON.parse(allItems);
                setSaveAllItems(jsonAllItems);
            }
        } catch (error) {
            ErrorAlert("Please Restart The App");
        }
    }

    const getAllPlacedOrder = async () => {
        try {
            const donorId = localUser['_id'];
            const response = await instance.get(`/api/order/get-donor-orders/${donorId}`);
            if (response.status == 200) {
                if (response.data['status'] == '200') {
                    setAllOrders(response.data['donor_orders']);
                } else if (response.data.status == '400' || response.data.status == "404") {
                    ErrorAlert(response.data.message);
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




    const addToCartServer = async (id, quantit, items) => {
        try {
            const donorId = localUser['_id']
            const response = await instance.post("/api/donor/add-item-to-cart", { donor_id: donorId, item_id: id, quantity: quantit });
            if (response.data['status'] == '200') {
                console.log(response.data);
                await getCarItem();
                // await AsyncStorage.setItem("@AllItems", items);
            } else if (response.data['status'] == '400') {
                ErrorAlert(response.data['message'])
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


    const getCarItem = async () => {
        const donorId = localUser['_id']
        const response = await instance.get(`/api/donor/get-donor/${donorId}`);
        console.log(response.data['donor_data']['cart']);
        if (response.status == 200) {
            if (response.data['status'] == "200") {
                if (response.data['donor_data']['cart']?.length > 0) {
                    sumTotal(response.data['donor_data']['cart'])
                    setCartItem(response.data['donor_data']['cart'])
                } else {
                    setCartItem(null);
                    console.log("cart Not Founded");
                }
            }
        }
    }





    const removeToCartServer = async (id) => {
        try {
            const donorId = localUser['_id']
            const response = await instance.post("/api/donor/remove-item-from-cart", { donor_id: donorId, item_id: id });
            console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    getCarItem();
                    // await AsyncStorage.setItem("@AllItems", updatedItems);
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
    const onAddCart = async (item) => {
        try {
            setLoader(true);
            // const allItems = await AsyncStorage.getItem("@AllItems");
            // if (allItems == null || allItems.length <= 0) {
            //     console.log()
            //     const items = JSON.stringify([item]);
            //     setQuantity(1);
            await addToCartServer(item._id, quantity, item);
            await getAllSaveItem();
            // } else {
            //     let jsonAllItems = JSON.parse(allItems);
            //     jsonAllItems.push(item);
            //     let qu = quantity;
            //     qu += 1;
            //     setQuantity(qu)
            //     await addToCartServer(item._id, quantity, JSON.stringify(jsonAllItems));
            //     await getAllSaveItem();
            // }
        } catch (error) {
            ErrorAlert("Dou to some Server issue therefor please restart App")
        }
        setLoader(false);
    }
    const onRemoveCart = async (id) => {
        // onRemoveIdCart(id, allItems);
        await removeToCartServer(id);

        // setLoader(true);
        // try {
        //     const allItems = await AsyncStorage.getItem("@AllItems");
        //     if (allItems == null || allItems.length <= 0) {
        //         console.log("no Item");
        //     } else {
        //     }
        // } catch (error) {
        //     ErrorAlert("Dou to some Server issue therefor please restart App")
        // }
        // setLoader(false);
    }
    const onRemoveIdCart = async (id, allItems) => {
        try {
            let jsonAllItems = JSON.parse(allItems);
            const updatedItems = jsonAllItems.filter((item) => item._id !== id);
            console.log(updatedItems);
            await removeToCartServer(id, JSON.stringify(updatedItems));
            await getAllSaveItem();
        } catch (error) {
            ErrorAlert("Dou to some Server issue therefor please restart App")
        }
    }
    const orderCreate = async (total) => {
        setLoader(true);
        try {
            const donorId = localUser['_id'];
            const response = await instance.post("/api/order/create-order", { donorId: donorId, total_amount: total, sub_total: total });
            console.log(response.data);
            if (response.status == 200) {
                // onRemoveIdCart();
                await makePayment(response.data.order.vendor, response.data.order._id, total);
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
    const makePayment = async (vendorId, orderId, total) => {
        try {
            console.log(vendorId);
            const response = await instance.get(`/api/vendor/get-vendor/${vendorId}`);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    const accId = response.data['vendor_data']['account'];
                    const payResponse = await instance.post(`/api/payment/make-order-payment/${accId}`, {
                        order_amount: total, order_id: orderId
                    });
                    if (payResponse.status == 200) {
                        if (payResponse.data.status == '200') {
                            console.log(payResponse.data);
                            setIsSuccessModal(true);
                            await AsyncStorage.removeItem("@AllItems");
                            await getAllSaveItem();
                            setTotalPrice(0);
                            await getCarItem();
                            // NavigationRef.current.goBack();
                        } else if (payResponse.data.status == '400' || payResponse.data.status == "404") {
                            ErrorAlert(payResponse.data.message);
                        }
                    }
                } else if (response.data.status == '400' || response.data.status == "404") {
                    ErrorAlert(response.data.message);
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

        setLoader(false);

    }

    const onBackPayment = () => {
        setIsSuccessModal(false);
        setScreenIndex(1);
        NavigationRef.current.goBack();
    }


    const sumTotal = (cartIte) => {
        if (allItems != null) {
            for (let i = 0; i < allItems?.length; i++) {
                const element = allItems[i];
                for (let j = 0; j < cartIte?.length; j++) {
                    const item = cartIte[j];
                    if (element['_id'] == item.item) {
                        setTotalPrice(totalPrice + element.price)
                        console.log(totalPrice + element.price)
                    }
                }
            }
        }
    }


    return <DonorContext.Provider
        value={{
            setAllItems,
            allItems,
            onAddCart,
            onRemoveCart,
            setAllItems,
            itemCount,
            setItemCount,
            saveAllItems,
            onRemoveIdCart,
            loader,
            orderCreate,
            allOrders,
            allCategories,
            setScreenIndex,
            screenIndex,
            isSuccessModal,
            onBackPayment,
            getAllPlacedOrder,
            getAllItemsByCategory,
            getAllItems,
            getAllItemsNecessary,
            allDonations,
            cartItem,
            setTotalPrice,
            totalPrice,
            sumTotal
        }}
    >{children}</DonorContext.Provider>

};


export { DonorContext, DonorContextProvider };
