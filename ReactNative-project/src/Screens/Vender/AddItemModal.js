import React, { useContext, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLOURS } from '../../Components/ThemeColours';
import { VenderContext } from '../../Context/VenderContaxt/VenderContext';
import { launchImageLibrary } from 'react-native-image-picker';
import { ErrorAlert } from '../../helper/ShowAlert';
import instance from '../../Api/AxiosConfig';


const AddItemModal = ({ visible = false, onClose, id = null }) => {
  const { allCategories,
    itemName,
    setItemName,
    itemPrice,
    setItemPrice,
    itemQuantity,
    setItemQuantity,
    setItemCategoryId,
    itemDescription,
    setItemDescription, imageUri, clear,
    setImageUri, loader, setItemImageBs64, isItemEdit, onItemAddNewAdnUpdate, value, setValue, getAllItems } = useContext(VenderContext);
  const { width, height } = Dimensions.get("screen");
  const [open, setOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [items, setItems] = useState([]);


  const openGallery = async () => {
    try {
      const images = await launchImageLibrary({ includeBase64: true, mediaType: "photo", selectionLimit: 1 });
      if (images != null) {
        if (isItemEdit) {
          await onUpdateImage("data:image/png;base64," + images.assets[0].base64)
          setItemImageBs64("data:image/png;base64," + images.assets[0].base64);
        } else {
          setImageUri(images.assets[0].uri);
          setItemImageBs64("data:image/png;base64," + images.assets[0].base64);
        }
      }
    } catch (error) {
      ErrorAlert(JSON.stringify(error));
    }
  }


  const onUpdateImage = async (image) => {
    setIsLoader(true);
    try {
      const response = await instance.patch(`/api/item/update-item-image/${id}`, { imageBase64: image });
      if (response.status == 200) {
        if (response.data['status'] == '200') {

          setImageUri(response.data['updatedImage']);
          await getAllItems()
          setIsLoader(false);
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
    setIsLoader(false);
  }



  return <View style={{
    width: width, height: height, backgroundColor: "#2e2e2e8f",
    display: visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center',
    position: 'absolute', top: 40, left: 0, zIndex: 1
  }}>
    <KeyboardAvoidingView

      behavior="padding" enabled keyboardVerticalOffset={40}>

      <View style={{ height: height * 0.03 }}></View>

      <View style={{ width: "100%", height: "auto", backgroundColor: "#fff", borderRadius: 10, elevation: 20 }}>
        <ScrollView nestedScrollEnabled style={{ paddingHorizontal: 20 }}>
          <View style={{ width: "100%", height: 60, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: "#111", fontSize: 20, fontWeight: "600" }}>{isItemEdit ? "Edit Item" : "Add Item"}</Text>
            <Text onPress={onClose} style={{ color: "#111", fontWeight: '600', fontSize: 30, transform: [{ rotate: '50deg' }], position: "absolute", top: 5, right: 10 }}>+</Text>
          </View>
          {isItemEdit ?
            <TouchableOpacity onPress={openGallery} style={{ width: "90%", alignItems: 'center', justifyContent: 'center', marginHorizontal: 18, height: height * 0.2, backgroundColor: '#777', borderRadius: 10 }}>
              {
                isLoader ? <ActivityIndicator />
                  : <>
                    {
                      imageUri == null ?
                        <Image source={require("../../Images/image-icon.png")} style={{ width: 40, height: 40 }} tintColor={COLOURS.apple} />
                        : <Image source={{ uri: imageUri }} resizeMethod='resize' resizeMode='stretch' style={{ width: "100%", height: "100%", borderRadius: 10 }} />}</>
              }
            </TouchableOpacity> :
            <TouchableOpacity onPress={openGallery} style={{ width: "90%", alignItems: 'center', justifyContent: 'center', marginHorizontal: 18, height: height * 0.2, backgroundColor: '#777', borderRadius: 10 }}>
              {
                imageUri == null ?
                  <Image source={require("../../Images/image-icon.png")} style={{ width: 40, height: 40 }} tintColor={COLOURS.apple} />
                  : <Image source={{ uri: imageUri }} resizeMethod='resize' resizeMode='stretch' style={{ width: "100%", height: "100%", borderRadius: 10 }} />}
            </TouchableOpacity>}
          <Text style={styles.pswd_name}>Name</Text>
          <View style={styles.inpt_here}>
            <TextInput
              onChangeText={(e) => { setItemName(e) }}
              value={itemName}

              placeholder='Your Name' placeholderTextColor={'grey'} style={styles.inpt} />
          </View>
          <Text style={styles.pswd_name}>Price</Text>
          <View style={styles.inpt_here}>
            <TextInput
              onChangeText={(e) => setItemPrice(e)}
              value={itemPrice}
              keyboardType={"numeric"}

              placeholder='Your Price'
              placeholderTextColor={'grey'} style={styles.inpt} />
          </View>
          <Text style={styles.pswd_name}>quantity</Text>
          <View style={styles.inpt_here}>
            <TextInput
              onChangeText={(e) => { setItemQuantity(e) }}
              value={itemQuantity.toString()}
              keyboardType={"numeric"}
              placeholder='Your quantity'
              placeholderTextColor={'grey'} style={styles.inpt} />
          </View>
          <Text style={styles.pswd_name}>Category</Text>
          <DropDownPicker
            listMode='MODAL'
            schema={{
              label: 'name',
              value: '_id'
            }}
            searchable
            style={{ width: "90%", marginHorizontal: 16, borderRadius: 5, borderColor: COLOURS.peach }}
            zIndex={1000}
            addCustomItem={true}
            open={open}
            value={value}

            items={allCategories == null ? [] : allCategories}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={(e) => {

              setItemCategoryId(e);
            }}
          />

          <Text style={styles.pswd_name}>Description</Text>
          <View style={styles.inpt_here}>
            <TextInput
              onChangeText={(e) => { setItemDescription(e) }}
              value={itemDescription}
              multiline


              placeholder='Your Description' placeholderTextColor={'grey'} style={[styles.inpt, { height: 100 }]} />
          </View>
          <TouchableOpacity onPress={() => { onItemAddNewAdnUpdate(isItemEdit ? "Update" : "Add New", id) }} style={styles.btn} activeOpacity={0.6}>
            {loader ? <ActivityIndicator /> : <Text style={styles.login_text}>{isItemEdit ? "Update" : "Add New"}</Text>}
          </TouchableOpacity>
          <View style={{ height: 30 }}></View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  </View>
}


export default AddItemModal;


const styles = StyleSheet.create({
  inpt_here: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    letterSpacing: .3,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    fontFamily: 'Ubuntu-Regular',
    borderColor: COLOURS.peach,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inpt: {
    width: '100%',
    color: COLOURS.black,
    fontFamily: 'Ubuntu-Medium',
  },
  pswd_name: {
    fontSize: 16,
    width: '100%',
    marginTop: 10,
    letterSpacing: .5,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: COLOURS.apple,

    // paddingHorizontal: 30,
    fontFamily: 'Ubuntu-Medium'
  },
  btn: {
    width: "90%",
    marginTop: 30,
    borderRadius: 5,
    marginHorizontal: 16,

    backgroundColor: COLOURS.apple,
  },
  login_text: {
    fontSize: 12,
    letterSpacing: 1,
    paddingVertical: 15,
    textAlign: 'center',
    color: COLOURS.white,
    fontFamily: 'Ubuntu-Bold',
    textTransform: 'uppercase',
  },
})