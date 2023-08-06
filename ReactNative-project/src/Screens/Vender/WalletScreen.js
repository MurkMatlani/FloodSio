import { StyleSheet, Text, View, Dimensions, FlatList, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationRef } from '../../../App'
import { VenderContext } from '../../Context/VenderContaxt/VenderContext'
const WalletScreen = () => {
    const { height } = Dimensions.get("screen")
    const { account } = useContext(VenderContext)
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: height * 0.06, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                <Ionicons onPress={() => { NavigationRef.current.goBack() }} name="ios-chevron-back-outline" color="#111" size={25} style={{ paddingHorizontal: 15 }} />
                <Text style={{ color: "#111", fontSize: 17, fontWeight: "600", paddingHorizontal: 10 }}>Wallet</Text>
            </View>
            <View style={{ width: "100%", alignItems: 'center', marginVertical: 20 }}>
                <View style={{
                    width: "80%", height: height * 0.2, backgroundColor: '#fff', elevation: 10, borderRadius: 10,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{ color: "#111", fontSize: 18, fontWeight: "700", paddingVertical: 0 }}>Current Balance:</Text>
                    <Text style={{ color: "#111", fontSize: 30, fontWeight: "700", paddingVertical: 5 }}>{account.current_balance}Rs</Text>
                    <Text style={{ color: "#111", fontSize: 14, fontWeight: "700", paddingVertical: 0 }}>Account Holder Name:{account.account_holder_name}</Text>
                    <Text style={{ color: "#111", fontSize: 14, fontWeight: "700", paddingVertical: 5 }}>Account number:{account.account_number}</Text>
                </View>
            </View>
            <View style={{height:height*0.68}}>
                <FlatList
                
                    data={account.transactions}
                    renderItem={({ item, index }) => {
                        return <View key={index} style={{
                            width: "90%", marginHorizontal: 20,
                            marginVertical: 10,
                            backgroundColor: "#fff", elevation: 10,
                            paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10
                        }}>
                            <Text style={{ color: "#111",fontSize:16,fontWeight:"600" }}>Account: {item.account}</Text>
                            <Text style={{ color: "#111",fontSize:16,fontWeight:"600",paddingVertical:5 }}>Amount: {item.amount}$</Text>
                            <Text style={{ color: "#111" ,fontSize:14,fontWeight:"600"}}>Date: {item.date.split("T")[0]}</Text>
                        </View>
                    }}

                />
            </View>
        </View>
    )
}

export default WalletScreen

const styles = StyleSheet.create({})