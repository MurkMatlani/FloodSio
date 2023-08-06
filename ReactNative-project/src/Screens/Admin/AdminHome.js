import React, { useContext, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import ReanimatedCurvedTabBar from "react-native-curved-bottom-tabbar"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavigationRef } from '../../../App'
import CustomAppBar from '../../Components/CustomAppBar'
import { MainAppContext } from '../../Context/MainAppContext'
import AllDonors from './AllDonors'
import AllRiders from './AllRiders'
import AllVenders from './AllVenders'
const bottomNavData = [
  {
    "id": 1,
    "title": "All Vender",
    "icon": "category",
  },
  {
    "id": 2,
    "title": "All Donor",
    "icon": "users",
  },
  {
    "id": 3,
    "title": "All Rider",
    "icon": "motorbike",
  },
  {
    "id": 4,
    "title": "Profile",
    "icon": "user",
  },
  // {
  //   "id": 5,
  //   "title": "Profile",
  //   "icon": "user",
  // }
];

const AdminHome = () => {
  const { width, height } = Dimensions.get("screen");
  const [screenIndex, setScreenIndex] = useState(0);
  const { userType } = useContext(MainAppContext);
  const screens = [
    <AllVenders
      onEdit={(item) => {
        NavigationRef.current.navigate("UserView", { params: { item, userType: "Vender" } });
      }}
    />,
    <AllDonors 
    onEdit={(item) => {
      NavigationRef.current.navigate("UserView", { params: { item, userType: "Donor" } });
    }}/>,
    <AllRiders 
    onEdit={(item) => {
      NavigationRef.current.navigate("UserView", { params: { item, userType: "Rider" } });
    }}/>,
    <View></View>
  ];
  return (
    <View style={{ width: width, height: height*0.97, backgroundColor: "#fff" }}>
      <CustomAppBar />
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
              item.icon == "motorbike" ?
                <MaterialCommunityIcons name={item.icon} color="#111" size={25} />
                : item.icon == "category" ?
                  <MaterialIcons name={item.icon} color="#111" size={25} /> :
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

export default AdminHome

const styles = StyleSheet.create({})