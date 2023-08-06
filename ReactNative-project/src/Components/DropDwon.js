import React, { FC, ReactElement, useRef, useState, LegacyRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image
} from 'react-native';
import { COLOURS } from './ThemeColours';
// import { Icon } from 'react-native-elements';

// interface Props {
//   label: string;
//   data: Array<{ label: string; value: string }>;
//   onSelect: (item: { label: string; value: string }) => void;
// }


const Dropdown = ({ label, data, onSelect,width="90%",value=undefined,marginHorizontal=0}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(value);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={{ color: "#111" }}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={[styles.inpt_here,{width,marginHorizontal}]}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {(selected && selected.label) || label}
      </Text>
      <Image source={require('../Images/drop_down_icon.png')} style={{ width: 30, height: 30 }} tintColor={COLOURS.apple} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    zIndex: 1,
  },
  inpt_here: {
    width: '90%',
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    marginVertical: 5,
    letterSpacing: .3,
    paddingHorizontal: 10,
    fontFamily: 'Ubuntu-Regular',
    borderColor: COLOURS.peach,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonText: {
    flex: 1,
    // textAlign: 'center',
    color: "#111"
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    marginHorizontal: 20,
    borderRadius: 5
  },
  overlay: {
    width: '90%',
    height: '100%',
    color: "#111"
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    color: "#111",

  },
});

export default Dropdown;