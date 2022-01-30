import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, FONT, HEIGHT, WIDTH } from './../../Utils/constants';


export default function ModalButton(props) {
  const { onClick,title} = props;
  return (

    <TouchableOpacity style={styles.borderModal}
    onPress={onClick} >
        <Text style={{padding:7}}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    borderModal:{
        borderBottomWidth:1,
        alignItems:'center',
        width:'90%',
        borderColor:COLORS.TEXTCOLORS
       },
});
