import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from './../../Utils/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from "react-native-modal-datetime-picker";
import VerificationScreens from "../../Screens/AuthScreens/Verified"


const inputRefs = {
    firstTextInput: null,
};

export function TextInputComponent(props) {
    const { title, value, onChangeText, rightImage, leftImage, imageWidth, imageHeight, placeholder, capitalize, editable, onBlur, keyboard, placeholderTextColor, screenwidth, secureTextEntry } = props;
    return (
        <View style={{}}>
            <Text style={{ color: "#868686", fontSize: 16, fontWeight: "600" }}>{title}</Text>
            <View style={{ flexDirection: "row", borderBottomColor: "#4F4F4F", borderBottomWidth: 2, alignItems: "center" }}>
                <View style={{ flex: 0.1 }}>
                    <Image
                        source={leftImage}
                        resizeMode="contain" style={{ width: imageWidth, height: imageHeight }}
                    />
                </View>
                <View style={{ flex: 0.85 }}>
                    <TextInput
                        style={{ height: 40, borderRadius: 5, fontSize: 16, color: COLORS.WHITE }}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        value={value}
                        keyboardType={keyboard ? keyboard : 'default'}
                        autoCorrect={false}
                        autoCompleteType='off'
                        editable={editable}
                        autoCapitalize={capitalize && 'none'}
                        secureTextEntry={secureTextEntry}
                        onBlur={onBlur}
                    />
                </View>
                {
                    rightImage &&

                    <View style={{ flex: 0.15 }}>
                        <Image
                            source={rightImage}
                            resizeMode="contain" style={{ width: 25, height: 26 }}
                        />
                    </View>
                }

            </View>
        </View>
    )
}

export function NormalTextInput(props) {
    const { title, value, onChangeText, placeholder, capitalize, editable, onBlur, keyboard, placeholderTextColor, screenwidth, secureTextEntry } = props;
    return (
        <View style={{}}>
            <Text style={{ color: "#868686", fontSize: 16,fontWeight:"normal" }}>{title}</Text>
            <View style={{}}>
                <TextInput
                    style={{ height:35, borderRadius: 5, fontSize: 14, color: COLORS.WHITE,borderBottomColor:"#4F4F4F",borderBottomWidth:1 }}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    value={value}
                    keyboardType={keyboard ? keyboard : 'default'}
                    autoCorrect={false}
                    autoCompleteType='off'
                    editable={editable}
                    autoCapitalize={capitalize && 'none'}
                    secureTextEntry={secureTextEntry}
                    onBlur={onBlur}
                />
            </View>
        </View>
    )
}

export function StoreTextInput(props) {
    const { title, value, onChangeText, placeholder, capitalize, editable, onBlur, keyboard, placeholderTextColor, screenwidth, secureTextEntry } = props;
    return (
        <View style={{}}>
            <Text style={{ color: "#868686", fontSize: 16,fontWeight:"normal" }}>{title}</Text>
            <View style={{}}>
                <TextInput
                    style={{ height:35, borderRadius: 5, fontSize: 14, color: COLORS.PRIMARY,borderBottomColor:"#4F4F4F",borderBottomWidth:1 }}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    value={value}
                    keyboardType={keyboard ? keyboard : 'default'}
                    autoCorrect={false}
                    autoCompleteType='off'
                    editable={editable}
                    autoCapitalize={capitalize && 'none'}
                    secureTextEntry={secureTextEntry}
                    onBlur={onBlur}
                />
            </View>
        </View>
    )
}

export function PickerComponent(props) {
    const { title, items, selected, onChange, leftImage, placeholder, capitalize, editable, onBlur, keyboard, placeholderTextColor, screenwidth, secureTextEntry } = props;
    return (
        <View style={{}}>
            <Text style={{ color: "#868686", fontSize: 20 }}>{title}</Text>
            <View style={{ flexDirection: "row", borderBottomColor: "#4F4F4F", borderBottomWidth: 2, alignItems: "center" }}>
                <View style={{ flex: 0.1 }}>
                    <Image
                        source={leftImage}
                        resizeMode="contain" style={{ width: 20, height: 22 }}
                    />
                </View>
                <View style={{ flex: 0.85 }}>
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
                            this.inputRefs.firstTextInput.focus();
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
                </View>
            </View>
        </View>
    )
}

export const DatePickerComponent = ({ titleName, dob,onBlur, editable, returnKeyType, name, confirm, visible, cancel, show, changeField }) => {
    return (
        <View style={{ borderBottomWidth: 0.8, borderBottomColor: '#494848', marginHorizontal:5,paddingVertical:10}}>
          <Text style={{  color: "#868686", fontSize: 14, marginBottom:2 }}>{titleName}</Text>
          <View style={{width:"100%",height:10 }}>
            <TextInput
              style={styles.user}
              value={dob}
              onChangeText={changeField}
              returnKeyType={returnKeyType}
              enablesReturnKeyAutomatically
              selectTextOnFocus
              spellCheck={false}
             editable={false}
             onBlur={onBlur}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: 10, bottom: -4 }}
              onPress={show}
              activeOpacity={0.7}
            >
              <EvilIcons
                name="calendar"
                size={25}
                color="#fff"
              />
            </TouchableOpacity>
  
            <DateTimePicker
              isVisible={visible}
              onConfirm={(val) => {
                confirm(val)
              }}
              onCancel={(val) => {
                cancel(val)
              }}
            />
          </View>
        </View >
    );
  }






const styles = StyleSheet.create({
    container: {
        width:"100%",
        alignItems: 'center',
        paddingVertical: 15
    },
    user: {
        width:WIDTH ,
        height:20,
        color: "#a1a1a1",
        fontSize: 14,
      },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 4,
        color: 'white',
        // paddingRight: '20%', // to ensure the text is never behind the icon
    },
    inputAndroid: {
        alignSelf: 'flex-start',
        width: '100%',
        marginHorizontal: 0,
        alignItems: 'flex-start',
        fontSize: 15,
        paddingLeft: 10,
        paddingVertical: 10,
        borderWidth: 0.5,
        borderColor: 'transparent',
        borderRadius: 8,
        color: '#000',
        paddingRight: '50%',
        // to ensure the text is never behind the icon

    },
    iconContainer: {
        top: 10,
        left: '80%',
    },
});