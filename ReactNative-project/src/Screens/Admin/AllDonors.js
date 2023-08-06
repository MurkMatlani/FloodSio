import { StyleSheet, Text, View, TextInput, Image, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native'
import React from 'react'
import { AdminContext } from '../../Context/AdminContext/AdminContext'

const AllDonors = ({ onEdit }) => {
  const { allDonors, getAllDonors } = React.useContext(AdminContext);
  const [search, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await getAllDonors();
    setRefreshing(false);
  }
  React.useEffect(() => { setFilteredDataSource(allDonors) }, [allDonors])

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = allDonors.filter(
        function (item) {
          const itemData = item.full_name
            ? item.full_name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(allDonors);
      setSearch(text);
    }
  };



  const Item = ({ item, backgroundColor, textColor }) => (
    <View style={[styles.item, { backgroundColor }]}>
      <View style={{ flexDirection: 'row' }}>
        {item.profile_picture.url != '' ? <Image
          style={{ width: 70, height: 70, borderRadius: 10 }}
          source={{ uri: item.profile_picture.url }} /> : <Image
          style={{ width: 70, height: 70, }}
          source={require("../../Images/user.png")} />}
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={[styles.title, { color: textColor }]}>{item.full_name}</Text>
          <Text style={[styles.description, { color: textColor }]} numberOfLines={2}>Email: {item.email_address}</Text>
          <Text style={[styles.description, { color: textColor }]} numberOfLines={2}>Phone Number: {item.phone_no}</Text>
        </View>
      </View>
      <View style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => { onEdit(item) }}><Image source={require("../../Images/eye.png")} style={{ width: 20, height: 20 }} /></TouchableOpacity>
        <View style={{ width: 10 }}></View>
        {/* <TouchableOpacity onPress={() => { onDelete(item.id) }}>
          <Image source={require("../../Images/delete-icon.png")} style={{ width: 20, height: 20 }} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
  const renderItem = ({ item }) => {
    // console.log(item)
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
    <View style={{ width: '100%', height: '94%', backgroundColor: "#fff" }}>
      <Text style={{ color: "#111", paddingHorizontal: 10, paddingVertical: 20, fontSize: 15, fontWeight: '600' }}>All Donors</Text>
      <View style={{ width: "90%", height: 50, backgroundColor: '#D0D3D4', marginHorizontal: 20, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignContent: "center", alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          onChangeText={searchFilterFunction}
          value={search}
          style={{ width: "80%", paddingHorizontal: 10, color: "#111" }} placeholder='Search here...' placeholderTextColor={"#777"} />
        <View style={{ width: 10 }}></View>
        <Image source={require("../../Images/search-icon.png")} style={{ width: 25, height: 25, }} />
      </View>
      <View style={{ flex:1 }}>
        {filteredDataSource == null ? <ActivityIndicator /> :
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            nestedScrollEnabled
            data={filteredDataSource}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            ListEmptyComponent={() => {
              return <View style={{ paddingHorizontal: 70, paddingVertical: 100 }}><Text style={{ color: "#777", fontSize: 20, fontWeight: '600' }}>Donors is Not Available</Text></View>
            }}
          // extraData={selectedId}
          />
        }
      </View>
    </View>
  )
}

export default AllDonors

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
    fontSize: 15,
    paddingVertical: 2,
    fontWeight: "700",
  },
  description: {
    fontSize: 12,
    paddingVertical: 2,
    fontWeight: "500",
  },
})