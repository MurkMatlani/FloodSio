import { Dimensions, View, Text, TouchableOpacity, StyleSheet } from 'react-native';




export const DeleteModal = ({ visible = true, onClose,onDelete }) => {
    const { width, height } = Dimensions.get("screen");
    return <View
        style={{
            width: width, height: height, backgroundColor: "#2e2e2e8f",
            display: visible ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center',
            position: 'absolute', top: 0, left: 0, zIndex: 1
        }}
    >
        <View style={{ width: "90%", height: height * 0.25, backgroundColor: "#fff", borderRadius: 10, elevation: 20 }}>
            <View style={{ width: "100%", height: 60, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: "#111", fontSize: 20, fontWeight: "600" }}>Confirm</Text>
                <Text onPress={onClose} style={{ color: "#111", fontWeight: '600', fontSize: 30, transform: [{ rotate: '50deg' }], position: "absolute", top: 5, right: 10 }}>+</Text>
            </View>
            <Text style={{ color: "#111", paddingHorizontal: 20, fontSize: 18, fontWeight: "600" }}>Do You want to delete This?</Text>
            <View style={{ marginTop: 50, flexDirection: 'row', justifyContent: "center", alignContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={onClose} style={[styles.btn, { backgroundColor: '#D0D3D4' }]}><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
                <View style={{ width: 20 }}></View>
                <TouchableOpacity onPress={onDelete} style={[styles.btn, { backgroundColor: 'red' }]}><Text style={styles.btnText}>Delete</Text></TouchableOpacity>
            </View>
        </View>
    </View>
}


const styles = StyleSheet.create({
    btn: {
        width: "40%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 50,
    },
    btnText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff"
    }
})