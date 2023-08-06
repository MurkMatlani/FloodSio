import React, { useContext, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import ReanimatedCurvedTabBar from "react-native-curved-bottom-tabbar"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavigationRef } from '../../../App'
import CustomAppBar from '../../Components/CustomAppBar'
import SuccessModal from '../../Components/SuccessModal'
import { MainAppContext } from '../../Context/MainAppContext'
import { VenderContext } from '../../Context/VenderContaxt/VenderContext'
import AddCategoryModal from './AddCategoryModal'
import AddItemModal from './AddItemModal'
import AllOrders from './AllOrders'
import CategoryView from './CategoryView'
import ItemView from './ItemView'
import ItemViewModal from './ItemViewModal'





const bottomNavData = [
  {
    "id": 1,
    "title": "Item",
    "icon": "ios-grid",
  },
  {
    "id": 2,
    "title": "Category",
    "icon": "category",
  },

  {
    "id": 3,
    "title": "All Orders",
    "icon": "shopping-bag",
  },
  {
    "id": 4,
    "title": "Profile",
    "icon": "user",
  }
];
const VenderHome = () => {
  const { isCategoryModal,
    setIsCategoryModal, setIsItemModal,
    isItemModal,
    setCategoryDescription,
    setCategoryTitle,
    setIsCategoryEdit,
    setItemName,
    setItemPrice,
    setItemQuantity,
    setItemCategoryId,
    setItemDescription, setImageUri, setValue, setIsItemEdit,
    isSuccessModal,
    onBackHome,
    clear
  } = useContext(VenderContext);
  const { userType } = useContext(MainAppContext);
  const { width, height } = Dimensions.get("screen");
  const [screenIndex, setScreenIndex] = useState(0);
  const [isViewModal, setIsViewModal] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [item, setItem] = useState(null);
  const screens = [
    <ItemView
      onView={
        (item) => {
          setItem(item),
            setIsViewModal(true);
        }
      }
      onEdit={(item) => {
        setItemId(item._id)
        setIsItemEdit(true);
        setItemName(item.name)
        setItemDescription(item.description);
        setItemPrice(JSON.stringify(item.price));
        setItemQuantity(JSON.stringify(item.quantity));
        setItemCategoryId(item.category._id);
        setImageUri(item.image.url)
        setValue(item.category._id)
        setIsItemModal(true);
      }}
    />,
    <CategoryView
      onDelete={(id) => {
        setItemId(id);
      }}
      onEdit={(item) => {
        setItemId(item._id)
        setIsCategoryEdit(true);
        setCategoryTitle(item.name);
        setCategoryDescription(item.description);
        setIsCategoryModal(true);
      }}
    />,

    <AllOrders />,
    <View></View>
  ];
  return (
    <View style={{ width: width, height: height * 0.97, backgroundColor: "#fff" }}>
      <CustomAppBar />
      <View style={{ width: width, height: height * 0.82, zIndex: 1 }}>
        {
          screens[screenIndex]
        }

      </View>
      <ReanimatedCurvedTabBar
        height={140}
        iconsArray={bottomNavData.map((item, index) => (
          <View style={{ alignItems: 'center', }}>
            {item.icon == "ios-grid" ? <Ionicons name={item.icon} color="#111" size={20} /> :
              item.icon == "category" || item.icon == "shopping-bag" ? <MaterialIcons name={item.icon} color="#111" size={20} /> :
                // item.icon == "notification" ? <FontAwesome5 name={item.icon} color="#111" size={20} />
                <FontAwesome name={item.icon} color="#111" size={20} />}
            <Text style={{ color: "#111", fontSize: 7, fontWeight: '700' }}>{item.title}</Text>
          </View>
        ))}
        reactNaviagtionBar={true}
        iconTranslateY={-10}
        lockTranslateYAnime={true}
        backgroundColor="#ccc"
        onPress={(btnNum) => {
          if (btnNum == 4) {
            NavigationRef.current.navigate("Profile", { params: { userType: userType } })
          } else { setScreenIndex(btnNum - 1) }
        }}
        allowDropAnime={true}
      />
      <AddCategoryModal id={itemId} visible={isCategoryModal} onClose={() => {
        setCategoryDescription('')
        setCategoryTitle('')
        setIsCategoryEdit(false)
        setIsCategoryModal(false)
        clear();
      }} />
      <AddItemModal id={itemId} visible={isItemModal} onClose={() => {
        setIsItemModal(false);
        clear();
      }} />
      <ItemViewModal item={item} isOpen={isViewModal} onClose={() => {
        setItem(null);
        setIsViewModal(false);
      }} />
      <SuccessModal isVisible={isSuccessModal} onBackHome={onBackHome} />

    </View>
  )
}

export default VenderHome



const styles = StyleSheet.create({
  btn: {
    width: "45%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff"
  }
})

