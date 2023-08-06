
import { createContext, useContext, useEffect, useState } from "react";
import { ErrorAlert } from "../../helper/ShowAlert";
import instance from "../../Api/AxiosConfig";
import { MainAppContext } from "../MainAppContext";


const RiderContext = createContext();

const RiderContextProvider = ({ children }) => {
    const { localUser } = useContext(MainAppContext);
    const [assignedDonation, setAssignedDonation] = useState(null);
    const [loader, setLoader] = useState(false);
    const [allCompletedDonations,setAllCompletedDonations] = useState(null);
    useEffect(() => { getCurrentDonation() }, [])
    const getCurrentDonation = async () => {
        try {
            setLoader(true);
            const riderId = localUser['_id'];
            const response = await instance.get(`/api/rider/get-rider/${riderId}`);
            // console.log(response.data);
            if (response.status == 200) {
                if (response.data['status'] == '200') {
                  setAllCompletedDonations(response.data['rider_data']['completedDonations']);
                    if (response.data['rider_data']['current_assgined_donation'] == null) {
                        setAssignedDonation(null)
                    } else {
                        const donationResponse = await instance.get(`/api/donation/get-donation/${response.data['rider_data']['current_assgined_donation']}`);
                        console.log(donationResponse.data)
                        if (donationResponse.status == 200) {
                            if (donationResponse.data['status'] == '200') {
                                setAssignedDonation(donationResponse.data['donation']);
                            } else if (donationResponse.data['status'] == '400' || donationResponse.data['status'] == '404') {
                                ErrorAlert(donationResponse.data['message']);
                            }
                        }
                    }
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




    return <RiderContext.Provider
        value={{
            getCurrentDonation,
            loader,
            assignedDonation,
            setAssignedDonation,
            allCompletedDonations
        }}
    >{children}</RiderContext.Provider>

};


export { RiderContext, RiderContextProvider };
