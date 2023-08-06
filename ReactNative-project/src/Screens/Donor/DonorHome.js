import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import CustomAppBar from '../../Components/CustomAppBar'
import ReanimatedCurvedTabBar from "react-native-curved-bottom-tabbar"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavigationRef } from '../../../App'
import { MainAppContext } from '../../Context/MainAppContext'
import ItemView from './ItemView'
import CartView from './CartView'

import AllOrders from './AllOrders'
import { DonorContext } from '../../Context/DonorContext/DonorContext'
const bottomNavData = [
  {
    "id": 1,
    "title": "Items",
    "icon": "category",
  },
  {
    "id": 2,
    "title": "Cart",
    "icon": "shopping-cart",
  },
  {
    "id": 3,
    "title": "All Order",
    "icon": "shopping-bag",
  },
  {
    "id": 4,
    "title": "Profile",
    "icon": "user",
  }
];
const DonorHome = () => {
  const { width, height } = Dimensions.get("screen");
  const { userType } = useContext(MainAppContext);
  const { setScreenIndex,
    screenIndex } = useContext(DonorContext)


  const screens = [
    <ItemView />,
    <CartView />,
    <AllOrders />,
    <View></View>
  ];
  return (
    <View
      style={{ width: width, height: height * 0.97, backgroundColor: "#fff" }}
    >
      <CustomAppBar />
      <View style={{ width: width, height: height * 0.8, zIndex: 1, backgroundColor: '#fff' }}>
        {
          screens[screenIndex]
        }

      </View>
      <ReanimatedCurvedTabBar
        height={140}
        iconsArray={bottomNavData.map((item, index) => (
          <View style={{ alignItems: 'center', }}>
            {item.icon == "shopping-cart" ? <Entypo name={item.icon} color="#111" size={20} /> :
              item.icon == "category" || item.icon == "shopping-bag" ? <MaterialIcons name={item.icon} color="#111" size={20} /> :
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

export default DonorHome

