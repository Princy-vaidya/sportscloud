import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {HEIGHT, WIDTH, COLORS, FONT} from '../../../Utils/constants';
import {Button, Menu, Divider, Provider} from 'react-native-paper';

export default function MenuView(props) {
  const {visible, closeMenu, openMenu, onValueSelected} = props;
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      contentStyle={{borderRadius: 10}}
      anchor={
        <TouchableOpacity
          onPress={openMenu}
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            borderRadius: 10,
            marginTop: 10,
          }}>
          <View
            style={[
              styles.activeColor,
              selectedValue === 'Going'
                ? {backgroundColor: COLORS.GREENCOLOR}
                : selectedValue === 'May be'
                ? {backgroundColor: COLORS.PURPLECOLOR}
                : {backgroundColor: COLORS.REDCOLOR},
            ]}
          />

          <Image
            source={require('../../../Assets/VectorIcon/dropdown.png')}
            style={{width: 8, height: 10, margin: 3}}
          />
        </TouchableOpacity>
      }>
      <Menu.Item
        onPress={() => {
          onValueSelected('Going'), setSelectedValue('Going'), closeMenu();
        }}
        style={styles.activeGreenMenu}
        titleStyle={{color: 'white'}}
        title="Going"
      />
      <Menu.Item
        onPress={() => {
          onValueSelected('May be'), setSelectedValue('May be'), closeMenu();
        }}
        style={styles.activePurpleMenu}
        titleStyle={{color: 'white'}}
        title="May be"
      />
      <Menu.Item
        onPress={() => {
          onValueSelected('No'), setSelectedValue('No'), closeMenu();
        }}
        style={styles.activeRedMenu}
        titleStyle={{color: 'white'}}
        title="No"
      />
    </Menu>
  );
}
const styles = StyleSheet.create({
  container: {
    // height: HEIGHT,
    // width: WIDTH,
  },
  activeButton: {
    borderRadius: 10,
    width: '9%',
    height: '50%',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginVertical: '2%',
    flexDirection: 'row',
  },
  activeColor: {
    borderRadius: 10,
    height: 17,
    width: 15,
    alignSelf: 'center',
  },
  activeGreenMenu: {
    backgroundColor: COLORS.GREENCOLOR,
    height: 35,
    marginTop: -10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  activePurpleMenu: {
    backgroundColor: COLORS.PURPLECOLOR,
    height: 35,
  },
  activeRedMenu: {
    backgroundColor: COLORS.REDCOLOR,
    height: 35,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: -10,
  },
});
