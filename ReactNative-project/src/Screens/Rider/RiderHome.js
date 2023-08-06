import React, { useContext, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import ReanimatedCurvedTabBar from "react-native-curved-bottom-tabbar"
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavigationRef } from '../../../App'
import CustomAppBar from '../../Components/CustomAppBar'
import { MainAppContext } from '../../Context/MainAppContext'
import CurrentDonation from './CurrentDonation'
import AllCompletedDonations from './AllCompletedDonations'
import { RiderContext } from '../../Context/RiderContext/RiderContext'
const bottomNavData = [
  {
    "id": 1,
    "title": "Items",
    "icon": "category",
  },
  {
    "id": 2,
    "title": "All Donations",
    "icon": "history",
  },
  {
    "id": 3,
    "title": "Notification",
    "icon": "notifications",
  },
  {
    "id": 4,
    "title": "Profile",
    "icon": "user",
  }
];
const RiderHome = () => {
  const [screenIndex, setScreenIndex] = useState(0);
  const { width, height } = Dimensions.get("screen");
  const { userType } = useContext(MainAppContext);
  const { getCurrentDonation } = useContext(RiderContext);


  const screens = [
    <CurrentDonation />,
    <AllCompletedDonations />,
    <View></View>,
    <View></View>
  ];

  return (
    <View style={{ width: width, height: height * 0.97, backgroundColor: "#fff" }}>
      <CustomAppBar
        onRefresh={() => { getCurrentDonation() }}
      />
      <View style={{ width: width, height: height * 0.87, zIndex: 1 }}>
        {
          screens[screenIndex]
        }

      </View>
      <ReanimatedCurvedTabBar
        height={140}
        iconsArray={bottomNavData.map((item, index) => (
          <View style={{ alignItems: 'center', }}>
            {
              item.icon == "category" || item.icon == "history" || item.icon == 'notifications' ? <MaterialIcons name={item.icon} color="#111" size={20} /> :
                <FontAwesome name={item.icon} color="#111" size={20} />}
            <Text style={{ color: "#111", fontSize: 7, fontWeight: '700' }}>{item.title}</Text>
          </View>
        ))}
        reactNaviagtionBar={true}
        iconTranslateY={-15}
        lockTranslateYAnime={true}
        backgroundColor="#ccc"
        onPress={(btnNum) => {
          if (btnNum == 4) {
            NavigationRef.current.navigate("Profile", { params: { userType: userType } })
          } else { setScreenIndex(btnNum - 1) }
        }}
        allowDropAnime={true}
      />
    </View>
  )
}

export default RiderHome

const styles = StyleSheet.create({})