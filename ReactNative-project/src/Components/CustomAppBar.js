

import { StackActions } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationRef } from '../../App';
import { MainAppContext } from '../Context/MainAppContext';
import { VenderContext } from '../Context/VenderContaxt/VenderContext';
const CustomAppBar = ({ onRefresh = () => { } }) => {
  const { userType, localUser } = useContext(MainAppContext);
  if (userType == "Vendor" && localUser != null) {
    const { onShowCategoryModal, onShowItemModal } = useContext(VenderContext);
    return (
      <View style={styles.appBar}>
        <View>
          <Text style={styles.title}>Floodsio {userType}</Text>
        </View>
        <View style={{ display: "flex", alignItems: "center", flexDirection: 'row' }}>
          {userType == "Vendor" ?
            <Menu>
              <MenuTrigger>
                {/* <MaterialIcons name="more-vert" /> */}
                <Image style={{ width: 20, height: 20, marginHorizontal: 10 }}
                  source={require("../Images/add_icon.png")} />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    backgroundColor: '#FBFCFC',
                    width: 170,
                    borderRadius: 10,
                  }
                }}
              >
                <MenuOption customStyles={{ optionText: { color: "#111", fontSize: 16, fontWeight: "600", paddingHorizontal: 10, paddingVertical: 5 } }} onSelect={() => { onShowCategoryModal() }} text='Add Category' />
                <MenuOption customStyles={{ optionText: { color: "#111", fontSize: 16, fontWeight: "600", paddingHorizontal: 10, paddingVertical: 5 } }} onSelect={() => { onShowItemModal() }} text='Add Item' />
              </MenuOptions>
            </Menu>
            : <Text></Text>}
          <MaterialIcons onPress={() => NavigationRef.current.navigate("WalletScreen")} name="account-balance-wallet" color="#111" size={25} />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.appBar}>
        <View>
          <Text style={styles.title}>Floodsio {userType}</Text>
        </View>
        <View style={{ display: "flex", alignItems: "center", flexDirection: 'row' }}>
          {userType == "Admin" ? <Menu>
            <MenuTrigger>
              <View >
                <MaterialIcons name={'more-vert'} color="#111" size={25} />

                {/* <Imag/e style={styles.image} source={require("../Images/user.png")} /> */}
              </View>
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  backgroundColor: '#FBFCFC',
                  width: 140,
                  borderRadius: 10,
                }
              }}
            >
              <MenuOption customStyles={{ optionText: { color: "#111", fontSize: 16, fontWeight: "600", paddingHorizontal: 10, paddingVertical: 5 } }} onSelect={() => { NavigationRef.current.navigate("Category") }} text='Category' />
              <MenuOption customStyles={{ optionText: { color: "#111", fontSize: 16, fontWeight: "600", paddingHorizontal: 10, paddingVertical: 5 } }} onSelect={() => { NavigationRef.current.navigate("Item") }} text='Items' />
              <MenuOption customStyles={{ optionText: { color: "#111", fontSize: 16, fontWeight: "600", paddingHorizontal: 10, paddingVertical: 5 } }} onSelect={() => { NavigationRef.current.navigate('Victim') }} text='Vitim' />
              <MenuOption customStyles={{ optionText: { color: "#111", fontSize: 16, fontWeight: "600", paddingHorizontal: 10, paddingVertical: 5 } }} onSelect={() => { NavigationRef.current.navigate('AllDonation') }} text='All Donations' />


            </MenuOptions>
          </Menu> : userType == "Donor" ? <Menu>
            <MenuTrigger>
              <View >
                <MaterialIcons name={'more-vert'} color="#111" size={25} />

                {/* <Imag/e style={styles.image} source={require("../Images/user.png")} /> */}
              </View>
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  backgroundColor: '#FBFCFC',
                  width: 140,
                  borderRadius: 10,
                }
              }}
            >
              {/* <MenuOption customStyles={{ optionText: { color: "#111", fontSize: 16, fontWeight: "600", paddingHorizontal: 10, paddingVertical: 5 } }} onSelect={() => { NavigationRef.current.navigate("Category") }} text='Category' /> */}
              <MenuOption customStyles={{ optionText: { color: "#111", fontSize: 16, fontWeight: "600", paddingHorizontal: 10, paddingVertical: 5 } }} onSelect={() => { NavigationRef.current.navigate("AllDonations") }} text='All Donations' />
              <MenuOption customStyles={{ optionText: { color: "#111", fontSize: 16, fontWeight: "600", paddingHorizontal: 10, paddingVertical: 5 } }} onSelect={() => { }} text='Notifications' />

            </MenuOptions>
          </Menu> : <Text></Text>}{
            userType == "Admin" ?
              <MaterialIcons name="notifications" color="#111" size={25} />
              : userType == "Rider" ?
                <MaterialIcons onPress={onRefresh} name="refresh" color="#111" size={25} />
                : <Text></Text>
          }
        </View>
      </View>
    )
  }
}

export default CustomAppBar






const styles = StyleSheet.create({
  appBar: {
    width: "100%",
    height: 55,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 10,
    elevation: 10,
    // position:'absolute',
    // top:0,
    zIndex: 2
  },
  userAvatar: {
    width: 45,
    height: 45,
    backgroundColor: '#D0D3D4',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  image: {
    width: 30,
    height: 30
  },
  title: {
    fontSize: 20,
    color: "#111",
    fontWeight: "600"
  }
})