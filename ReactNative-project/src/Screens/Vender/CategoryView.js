import { StyleSheet, Text, View, TextInput, Image, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import { VenderContext } from '../../Context/VenderContaxt/VenderContext';

const CategoryView = ({ onEdit, onDelete }) => {
  const { allCategories } = useContext(VenderContext);


  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(allCategories);


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
        <TouchableOpacity onPress={() => { onEdit(item) }}><Image source={require("../../Images/edit-icon.png")} style={{ width: 20, height: 20 }} /></TouchableOpacity>
        <View style={{ width: 10 }}></View>
        {/* <TouchableOpacity onPress={() => { onDelete(item.id) }}>
          <Image source={require("../../Images/delete-icon.png")} style={{ width: 20, height: 20 }} />
        </TouchableOpacity> */}
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
     <View style={{height:"81%"}}>
     {allCategories == null ? <ActivityIndicator /> : <FlatList
        nestedScrollEnabled
        data={filteredDataSource}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={() => {
          return <View style={{ paddingHorizontal: 70, paddingVertical: 100 }}><Text style={{ color: "#777", fontSize: 20, fontWeight: '600' }}>Category is Not Available</Text></View>
        }}
      // extraData={selectedId}
      />}
     </View>
    </View>
  )
}

export default CategoryView

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
});
