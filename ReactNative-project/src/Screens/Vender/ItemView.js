import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { VenderContext } from '../../Context/VenderContaxt/VenderContext';
import { FlatGrid } from 'react-native-super-grid';

const { width, height } = Dimensions.get("screen")
const ItemView = ({ onEdit, onView }) => {
  const { allItems } = useContext(VenderContext);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(null);


  useEffect(() => { setFilteredDataSource(allItems) }, [allItems])

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = allItems.filter(
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
      setFilteredDataSource(allItems);
      setSearch(text);
    }
  };
  const Item = ({ item, backgroundColor, textColor }) => (
    <View style={[styles.item, { backgroundColor, paddingHorizontal: 0, borderRadius: 10, elevation: 10 }]}>
      <View style={{ width: "100%", height: height * 0.15 }}>
        <Image source={{ uri: item.image.url }} style={{ width: "100%", height: height * 0.15, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingVertical: 6, paddingHorizontal: 10 }}>
        <Text style={{ color: textColor, fontSize: 16, fontWeight: '700', width: "70%" }}  >{item.name}</Text>
        <Text style={{ color: textColor, fontSize: 12, fontWeight: '700', width: "30%", textAlign: "right" }}>Rs:{item.price}</Text>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: '#ccc', fontSize: 15, fontWeight: '700', width: "100%" }} numberOfLines={2}>{item.description}</Text>
      </View>
      <View style={{
        position: 'absolute', top: 5, right: 5, alignItems: 'center',
        justifyContent: 'center', flexDirection: 'row', backgroundColor: '#fff', width: 60, height: 30, borderRadius: 5
      }}>
        <TouchableOpacity onPress={() => { onView(item) }}><Image source={require("../../Images/eye.png")} style={{ width: 20, height: 20 }} /></TouchableOpacity>
        <View style={{ width: 10 }}></View>
        <TouchableOpacity onPress={() => { onEdit(item) }}>
          <Image source={require("../../Images/edit-icon.png")} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
  );


  const renderItem = ({ item }) => {
    // console.log(item.vendor)
    return (
      <Item
        item={item}
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
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}><Text style={{ color: "#111", fontSize: 18, fontWeight: '600' }}>All Items</Text></View>
      <View style={{ height: "79%", }}>

        {filteredDataSource == null ? <ActivityIndicator /> :
          <FlatGrid
            itemDimension={150}
            data={filteredDataSource}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            ListEmptyComponent={() => {
              return <View style={{ paddingHorizontal: 90, paddingVertical: 100 }}><Text style={{ color: "#777", fontSize: 20, fontWeight: '600' }}>Items is Not Available</Text></View>
            }}
          />
        }
      </View>
    </View>
  )
}

export default ItemView

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 15,
    paddingBottom: 10,
    elevation: 10,
    marginVertical: 5,
    position: 'relative'
  }
})