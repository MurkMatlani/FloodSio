
import { createContext } from "react";
import instance from "../../Api/AxiosConfig";
import { ErrorAlert, validateEmail } from "../../helper/ShowAlert";
import React, { useState } from 'react';
import { NavigationRef } from "../../../App";


const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [isCategoryModal, setIsCategoryModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [isItemModal, setIsItemModal] = useState(false);
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [isCategoryEdit, setIsCategoryEdit] = useState(false);
    const [allVenders, setAllVenders] = useState(null);
    const [allDonors, setAllDonors] = useState(null);
    const [allRiders, setAllRiders] = useState(null);
    const [allVictims, setAllVictims] = useState(null);
    const [allCategories, setAllCategories] = useState(null);
    const [allItems, setAllItems] = useState(null);
    const [allDonations, setAllDonations] = useState(null);
    const [assignedRiderId, setAssignedRiderId] = useState('')
    const [assignedVictimId, setAssignedVictimId] = useState('');


    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cnic, setCinc] = useState('');
    const [isShowAdd, setIsShowAdd] = useState(false);

    React.useEffect(() => {
        getAllVender();
        getAllDonors();
        getAllRiders();
        getAllItems();
        getAllCategory();
        getAllDonations();
        getAllVictims();
    }, []);


    const getAllDonations = async () => {
        try {
            const response = await instance.get("api/donation/get-all-donations");
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    // console.log(response.data);
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
            const response = await instance.get(`/api/item/get-all-items/`);
            // console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    setAllItems(response.data['allItems']);
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
    const getAllVender = async () => {
        try {
            const response = await instance.get("/api/vendor/get-all-vendors");
            // console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    setAllVenders(response.data['allVendors'])
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
    const getAllDonors = async () => {
        try {
            const response = await instance.get("/api/donor/get-all-donors");
            // console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    setAllDonors(response.data['allDonors'])
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
    const getAllRiders = async () => {
        try {
            const response = await instance.get("/api/rider/get-all-riders");
            // console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    setAllRiders(response.data['allRiders'])
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
    const getAllVictims = async () => {
        try {
            const response = await instance.get("/api/victim/get-all-victim");
            // console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    setAllVictims(response.data['allVictim'])
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
    const onCreateCategory = async () => {
        try {
            setLoader(true);
            const data = { name: categoryTitle, description: categoryDescription }
            const response = await instance.post('/api/category/create-category', data);
            console.log(response.data);
            setIsCategoryModal(false);
            await getAllCategory();
            setIsSuccessModal(true);
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
            await getAllCategory();
            setIsSuccessModal(true);
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
    // onRemoveItemFromNecess, onAddItemFromNecess
    const onAddItemFromNecess = async (id) => {
        try {
            const response = await instance.patch(`/api/item/add-item-to-necessities/${id}`);
            if (response.status == 200) {
                if (response.data['status'] == '200') {
                    console.log("ook")
                    await getAllItems();
                } else {
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
    const onRemoveItemFromNecess = async (id) => {
        try {
            const response = await instance.patch(`/api/item/remove-item-from-necessities/${id}`)
            if (response.status == 200) {
                if (response.data['status'] == '200') {
                    console.log("ook")
                    await getAllItems();
                } else {
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


    const onConfirm = async (donationId) => {
        setLoader(true);
        try {
            const response = await instance.post(`/api/donation/assign-donation-to-rider/${donationId}`, { victim_id: assignedVictimId, rider_id: assignedRiderId });
            // console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == "200") {
                    setIsSuccessModal(true);
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


    const onBackCategory = () => {
        setCategoryTitle("");
        setCategoryDescription("");
        setIsSuccessModal(false);
    }

    const onBackDonation = () => {
        setIsSuccessModal(false);
        setAssignedVictimId('');
        setAssignedRiderId('');
    }

    const onCreateVictim = async () => {
        if (emailRegister == '' && passwordRegister == "" && fullName == "" && phoneNumber == "" && gender == "" && cnic == "") {
            ErrorAlert("Please Fill All Fields");
        } else if (fullName == "") {
            ErrorAlert("Please Enter Full Name");
        }
        else if (emailRegister == "") {
            ErrorAlert("Please Enter Email");
        } else if (passwordRegister == "") {
            ErrorAlert("Please Enter Password");
        } else if (!validateEmail(emailRegister)) {
            ErrorAlert("Please Enter valid Email");
        } else if (phoneNumber == "") {
            ErrorAlert("Please Enter Phone Number");
        } else if (cnic == "") {
            ErrorAlert("Please Enter Cnic Number");
        } else {
            setLoader(true);
            const data = {
                "email_address": emailRegister,
                "password": passwordRegister,
                "full_name": fullName,
                "gender": gender,
                "phone_no": phoneNumber,
                "cnic": cnic,
            };
            try {
                const response = await instance.post(`/api/victim/create-victim`, data);
                if (response.status == 201 || response.status == 200) {
                    if (response.data['status'] == '200' || response.data['status'] == '201') {
                        setIsShowAdd(false);
                        setIsSuccessModal(true);
                        await getAllVictims();
                    } else {
                        ErrorAlert(response.data['message']);

                    }
                }
            } catch (error) {
                const err = JSON.parse(JSON.stringify(error));
                ErrorAlert(err.message);
            }
        }
    }
    const onBackHome = () => {
        setEmailRegister("");
        setPasswordRegister("");
        setFullName('');
        setGender('');
        setPhoneNumber("");
        setCinc("");
        setIsSuccessModal(false);
    }
    return <AdminContext.Provider
        value={{
            getAllVender,
            setAllVenders,
            allVenders,
            allDonors,
            allRiders,
            allItems,
            allCategories,
            isCategoryEdit,
            setIsCategoryEdit,
            isCategoryModal,
            setIsCategoryModal,
            categoryTitle,
            setCategoryTitle,
            setCategoryDescription,
            categoryDescription,
            loader,
            setLoader,
            onAddNewAdnUpdate,
            allDonations,
            onBackCategory,
            isSuccessModal,
            setAssignedRiderId,
            assignedRiderId,
            allVictims,
            setAssignedVictimId,
            assignedVictimId,
            onConfirm,
            onBackDonation,
            getAllDonors,
            getAllVender,
            getAllRiders,
            getAllDonations,
            onRemoveItemFromNecess, onAddItemFromNecess,
            getAllItems,
            setEmailRegister,
            emailRegister,
            setPasswordRegister,
            passwordRegister,
            fullName,
            setFullName,
            setGender,
            gender,
            setPhoneNumber,
            phoneNumber,
            setCinc,
            cnic,
            setIsShowAdd,
            isShowAdd,
            onCreateVictim,
            onBackHome

        }}
    >{children}</AdminContext.Provider>

};


export { AdminContext, AdminContextProvider };
