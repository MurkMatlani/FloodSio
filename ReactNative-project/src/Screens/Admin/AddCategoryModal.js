import React, { useContext } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';
import { COLOURS } from '../../Components/ThemeColours';
import { AdminContext } from '../../Context/AdminContext/AdminContext';


const AddCategoryModal = ({ visible = false, onClose, id = null }) => {
  const { width, height } = Dimensions.get("screen");
  const { categoryDescription,
    setCategoryDescription,
    categoryTitle,
    setCategoryTitle,
    isCategoryEdit, onAddNewAdnUpdate, loader } = useContext(AdminContext);
  return <View style={{
    width: width, height: height, backgroundColor: "#2e2e2e8f",
    display: visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center',
    position: 'absolute', top: 0, left: 0, zIndex: 1
  }}>
    <KeyboardAvoidingView

      behavior="padding" enabled keyboardVerticalOffset={40}>

      {/* <KeyboardAvoidingView> */}
      {/* <KeyboardAvoidingScrollView style={{ paddingHorizontal: 20 }}> */}
      {/* <View style={{ height: height * 0.3 }}></View> */}
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={{ height: height * 0.2 }}></View>
        <View style={{ width: "100%", height: height * 0.5, backgroundColor: "#fff", borderRadius: 10, elevation: 20 }}>
          <View style={{ width: "100%", height: 60, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: "#111", fontSize: 20, fontWeight: "600" }}>Add Category</Text>
            <Text onPress={onClose} style={{ color: "#111", fontWeight: '600', fontSize: 30, transform: [{ rotate: '50deg' }], position: "absolute", top: 5, right: 10 }}>+</Text>
          </View>
          <Text style={styles.pswd_name}>Name</Text>
          <View style={styles.inpt_here}>
            <TextInput
              value={categoryTitle}
              onChangeText={(e) => { setCategoryTitle(e) }}
              placeholder='Your Name' placeholderTextColor={'grey'} style={styles.inpt} />
          </View>
          <Text style={styles.pswd_name}>Description</Text>
          <View style={styles.inpt_here}>
            <TextInput
              value={categoryDescription}
              onChangeText={(e) => { setCategoryDescription(e) }}
              multiline
              placeholder='Your Description' placeholderTextColor={'grey'} style={[styles.inpt, { height: 100 }]} />
          </View>
          <TouchableOpacity
            onPress={() => { onAddNewAdnUpdate(isCategoryEdit ? "Update" : "Add New", id) }}
            style={styles.btn} activeOpacity={0.6}>
            {loader ? <ActivityIndicator /> : <Text style={styles.login_text}>{isCategoryEdit ? "Update" : "Add New"}</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    {/* </KeyboardAvoidingScrollView > */}
    {/* </KeyboardAvoidingView> */}
  </View>

}


export default AddCategoryModal;


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
    paddingHorizontal: 10,
    width: '100%',
    color: COLOURS.black,
    fontFamily: 'Ubuntu-Medium',
  },
  pswd_name: {
    fontSize: 16,
    width: '100%',
    marginTop: 10,
    letterSpacing: .5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: COLOURS.apple,
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