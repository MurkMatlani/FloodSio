
import React, { createContext, useState } from 'react';
import { ErrorAlert } from '../../helper/ShowAlert';
import instance from '../../Api/AxiosConfig';
import { MainAppContext } from '../MainAppContext';
import { NavigationRef } from '../../../App';
import messaging from '@react-native-firebase/messaging';


const VenderContext = createContext();

const VenderContextProvider = ({ children }) => {
    const [isCategoryModal, setIsCategoryModal] = useState(false);
    const [isItemModal, setIsItemModal] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [isCategoryEdit, setIsCategoryEdit] = useState(false);
    // const [isItemEdit, setIsItemEdit] = useState(false);

    const [allCategories, setAllCategories] = useState(null);
    const [allItems, setAllItems] = useState(null);
    const [account, setAccount] = useState(null);
    const [loader, setLoader] = useState(false);
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    // Add Item Props Start
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemCategoryId, setItemCategoryId] = useState('');
    const [itemImageBs64, setItemImageBs64] = useState('');
    const [isItemEdit, setIsItemEdit] = useState(false);
    const { localUser } = React.useContext(MainAppContext);
    const [imageUri, setImageUri] = useState(null);
    const [value, setValue] = useState(null);

    const [allOrders, setAllOrders] = useState(null);

    // Add Item Props End







    React.useEffect(() => {
        getAllItems();
        getAllCategory();
        getDevicesToken();
        getAllNotification();
        getAllPlacedOrder();
        getWallet();
    }, []);



    const getWallet = async () => {
        try {
            const vendorId = localUser['_id'];
            const response = await instance.get(`/api/vendor/get-vendor-account/${vendorId}`);
            if (response.status == 200) {
                console.log(response.data);
                if (response.data['status'] == '200') {
                    setAccount(response.data['account']);
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






    const getDevicesToken = async () => {
        const token = await messaging().getToken();
        if (token != null || token != undefined) {
            try {
                const response = await instance.post(`/api/notification/save-vendor-notification-token/${localUser['_id']}`, { token: token });
                if (response.data['status'] == "200") {
                    console.log("Devices Register Success");
                } else if (response.data['status'] == '400') {
                    ErrorAlert(response.data['message']);
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

    const getAllNotification = async () => {
        //   get-all-vendor-notification-tokens
        try {
            const response = await instance.get("/api/notification/get-all-vendor-notification-tokens");
            if (response.data['status'] == "200") {
                console.log(response.data['tokens']);
            } else if (response.data['status'] == '400') {
                ErrorAlert(response.data['message']);
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


    const getAllPlacedOrder = async () => {
        try {
            const vendorId = localUser['_id'];
            const response = await instance.get(`/api/order/get-vendor-orders/${vendorId}`);
            // console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == '200') {
                    setAllOrders(response.data['vendor_orders']);
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


    const getAllCategory = async () => {
        try {
            const response = await instance.get("/api/category/get-all-categories");
            // console.log(response.data);
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
    const getAllItems = async () => {
        try {
            const response = await instance.get(`/api/item/get-all-vendor-items/${localUser['_id']}`);
            console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    setAllItems(response.data['vendorItems']);
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
    const onAddNewAdnUpdate = async (title, id) => {
        if (title == "Add New") {
            await onCreateCategory();
        } else {
            await onUpdateCategory(id)
        }
    }
    const onItemAddNewAdnUpdate = async (title, id) => {
        if (title == "Add New") {
            await onCreateItem();
        } else {
            await onUpdateItem(id)
        }
    }

    const clear = () => {
        setCategoryTitle('');
        setCategoryDescription('');
        setImageUri('');
        setIsItemEdit(false);
        setItemName('');
        setItemPrice('')
        setItemDescription('');
        setItemQuantity('');
    }

    const onCreateCategory = async () => {
        try {
            setLoader(true);
            const data = { name: categoryTitle, description: categoryDescription }
            const response = await instance.post('/api/category/create-category', data);
            console.log(response.data);
            setIsCategoryModal(false);
            setIsSuccessModal(true);
            await getAllCategory();
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
    const onUpdateCategory = async (id) => {
        try {
            setLoader(true);
            const data = { name: categoryTitle, description: categoryDescription }
            const response = await instance.put(`/api/category/update-category/${id}`, data);
            console.log(response.data);
            setIsCategoryModal(false);
            setIsSuccessModal(true);
            await getAllCategory();
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

    const onCreateItem = async () => {
        try {
            setLoader(true);
            const data = { name: itemName, description: itemDescription, price: itemPrice, quantity: itemQuantity, imageBase64: itemImageBs64, vendor: localUser["_id"], category: itemCategoryId };
            const response = await instance.post('/api/item/create-item', data);
            if (response.status == 200) {
                if (response.data['status'] == '200') {
                    setIsItemModal(false);
                    setIsSuccessModal(true);
                    await getAllItems();
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
    const onUpdateItem = async (id) => {
        try {
            setLoader(true);
            const data = {
                name: itemName, description: itemDescription, price: itemPrice, quantity: itemQuantity,
                vendor: localUser["_id"], category: itemCategoryId
            };
            const response = await instance.put(`/api/item/update-item/${id}`, data);
            console.log(response.data);
            if(response.status==200){
                if(response.data['status']=='200'){
                    setIsItemModal(false);
                    setIsSuccessModal(true);
                    await getAllItems();
                }else{
                    ErrorAlert(response.data['messages']);
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
    const onShowCategoryModal = () => setIsCategoryModal(true);
    const onShowItemModal = () => setIsItemModal(true);
    const onCategoryDelete = async (id) => { }

    const onBackHome = () => {
        clear();
        setIsSuccessModal(false);
    }


    return <VenderContext.Provider
        value={{
            isCategoryModal,
            setIsCategoryModal,
            onShowCategoryModal,
            setIsItemModal,
            isItemModal,
            onShowItemModal,
            categoryDescription,
            setCategoryDescription,
            categoryTitle,
            setCategoryTitle,
            isCategoryEdit,
            setIsCategoryEdit,
            onCategoryDelete,
            allCategories,
            onAddNewAdnUpdate,
            loader,
            setLoader,
            itemName,
            setItemName,
            itemPrice,
            setItemPrice,
            itemQuantity,
            setItemQuantity,
            itemCategoryId,
            setItemCategoryId,
            itemDescription,
            setItemDescription,
            setItemImageBs64,
            setIsItemEdit,
            isItemEdit,
            onItemAddNewAdnUpdate,
            allItems,
            imageUri,
            setImageUri,
            value, setValue,
            allOrders,
            isSuccessModal,
            onBackHome,
            clear,
            getAllPlacedOrder,
            account,
            getAllItems
        }}>{children}</VenderContext.Provider>
}

export { VenderContext, VenderContextProvider };
