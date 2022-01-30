import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from './../../Utils/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';


const inputRefs = {
    firstTextInput: null,
};

export function CommonPicker(props) {
    const { items, selected, onChange, placeholder } = props;
    return (
            <RNPickerSelect
                placeholder={placeholder}
                items={items}
                value={selected}
                placeholderTextColor='#000000'
                onValueChange={val => {
                    onChange(val);
                }
                }
                onUpArrow={() => {
                    inputRefs.firstTextInput.focus();
                }}
                onDownArrow={() => {
                    inputRefs.favYear.togglePicker();
                }}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                    return <MaterialIcons style={{ alignItems: 'center' }} name="arrow-drop-down" size={24} color="gray" />;
                }}
                ref={el => {
                    inputRefs.favYear = el;
                }}
            /> 

    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        alignItems: 'center',
        paddingVertical: 15
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 12,
        width: "100%",
        backgroundColor: "#595959",
        borderRadius: 30,
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderWidth: 1,
        borderColor: 'transparent',
        color: 'white',
        // paddingRight: '20%', // to ensure the text is never behind the icon
    },
    inputAndroid: {
        width: '100%',
        height: 40,
        marginHorizontal: 0,
        backgroundColor: "#595959",
        fontSize: 12,
        paddingLeft: 10,
        borderWidth: 0.5,
        borderColor: 'transparent',
        borderRadius: 30,
        color: 'white',
        // to ensure the text is never behind the icon

    },
    iconContainer: {
        top: 4,
        right: "5%",
    },
});