const { View, Text, StyleSheet, TouchableOpacity } = require("react-native")
import { useContext } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { MainAppContext } from '../Context/MainAppContext'
import { COLOURS } from '../Components/ThemeColours'
const VictimScreen = () => {
    const { onLogOut } = useContext(MainAppContext)
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
        <Text style={{ color: "#111" }}>Victim Created Success</Text>
        <TouchableOpacity style={[styles.btn_align, { right: 5 }]} activeOpacity={0.6} onPress={() => { onLogOut() }}>
            <MaterialIcons name='logout' style={styles.name} />
        </TouchableOpacity>
    </View>
}


export default VictimScreen;

const styles = StyleSheet.create({
    btn_align: {
        top: 7,
        position: 'absolute',
        marginHorizontal: 20,
        alignSelf: 'flex-start',
    },
    name: {
        width: 40,
        padding: 5,
        fontSize: 30,
        marginTop: 0,
        borderRadius: 7,
        letterSpacing: .5,
        textAlign: 'center',
        color: COLOURS.apple,
        fontFamily: 'Roboto-Bold',
        backgroundColor: COLOURS.peach,
    },
});