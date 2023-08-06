import React, { useContext, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationRef } from '../../../App';
import { AdminContext } from '../../Context/AdminContext/AdminContext';
import AddCategoryModal from './AddCategoryModal';
import { DeleteModal } from '../../Components/DeleteModal';
import SuccessModal from '../../Components/SuccessModal';
const { width, height } = Dimensions.get("screen")
const Category = () => {
    const [itemId, setItemId] = useState(null);
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const onEdit = async (item) => {
        setCategoryDescription(item.description);
        setCategoryTitle(item.name);
        setIsCategoryEdit(true);
        setIsCategoryModal(true);
    }
    
    const { allCategories, isCategoryModal,onBackCategory,isSuccessModal, setIsCategoryModal, setCategoryDescription, setCategoryTitle, setIsCategoryEdit } = useContext(AdminContext);


    const [search, setSearch] = React.useState('');
    const [filteredDataSource, setFilteredDataSource] = React.useState(null);
    
    React.useEffect(()=>{setFilteredDataSource(allCategories)},[allCategories])
  
    const searchFilterFunction = (text) => {
      if (text) {
        const newData = allCategories.filter(
          function (item) {
            const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          }
        );
        setFilteredDataSource(newData);
        setSearch(text);
      } else {
        setFilteredDataSource(allCategories);
        setSearch(text);
      }
    };
  
  

    const Item = ({ item, backgroundColor, textColor }) => (
        <View style={[styles.item, { backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>{item.name}</Text>
            <Text style={[styles.description, { color: textColor }]} numberOfLines={2}>{item.description}</Text>
            <View style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { onEdit(item); setItemId(item._id); }}><Image source={require("../../Images/edit-icon.png")} style={{ width: 20, height: 20 }} /></TouchableOpacity>
                <View style={{ width: 10 }}></View>
                <TouchableOpacity onPress={() => { setIsDeleteModal(true); setItemId(item._id); }}>
                    <Image source={require("../../Images/delete-icon.png")} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            </View>
        </View >
    );


    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                // onPress={() => setSelectedId(item.id)}
                backgroundColor={"#fff"}
                textColor={"#111"}
            />
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: height * 0.06, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                <Ionicons onPress={() => { NavigationRef.current.goBack() }} name="ios-chevron-back-outline" color="#111" size={25} style={{ paddingHorizontal: 15 }} />
                <Text style={{ color: "#111", fontSize: 17, fontWeight: "700", paddingHorizontal: 10 }}>All Categories</Text>
                <TouchableOpacity onPress={() => { setIsCategoryModal(true) }} style={{ paddingHorizontal: 10 }}>
                    <Image

                        source={require('../../Images/add_icon.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: "90%", height: 50, backgroundColor: '#D0D3D4', marginHorizontal: 20, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
                <TextInput 
                onChangeText={searchFilterFunction}
                value={search}
                style={{ width: "80%", paddingHorizontal: 10, color: "#111" }} placeholder='Search here...' placeholderTextColor={"#777"} />
                <View style={{ width: 10 }}></View>
                <Image source={require("../../Images/search-icon.png")} style={{ width: 25, height: 25, }} />
            </View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ color: "#111", fontSize: 18, fontWeight: '600' }}>All Categories</Text></View>
            <View style={{ height: "79%" }}>
                {filteredDataSource == null ? <ActivityIndicator /> : <FlatList
                    nestedScrollEnabled
                    data={filteredDataSource}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    ListEmptyComponent={() => {
                        return <View style={{ paddingHorizontal: 70, paddingVertical: 100 }}><Text style={{ color: "#777", fontSize: 20, fontWeight: '600' }}>Category is Not Available</Text></View>
                    }}
                />}
            </View>
            <AddCategoryModal id={itemId} visible={isCategoryModal} onClose={() => {
                setCategoryDescription('')
                setCategoryTitle('')
                setIsCategoryEdit(false)
                setIsCategoryModal(false)
            }} />
            <DeleteModal visible={isDeleteModal}
                onDelete={async () => {
                    // await onCategoryDelete(itemId);
                    setIsDeleteModal(false);
                }}
                onClose={() => { setIsDeleteModal(false) }} />
                <SuccessModal isVisible={isSuccessModal} onBackHome={onBackCategory}/>
        </View>
    )
}

export default Category

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 10
    },
    title: {
        fontSize: 18,
        paddingVertical: 5,
        fontWeight: "700",
    },
    description: {
        fontSize: 15,
        paddingVertical: 5,
        fontWeight: "500",
    },
})