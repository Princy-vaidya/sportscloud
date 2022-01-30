import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity,Image } from "react-native";
import { HEIGHT, WIDTH, COLORS, FONT } from "../../Utils/constants";
import AntDesign from 'react-native-vector-icons/AntDesign';



const AddStoreModal = (props) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={{ width: WIDTH * 0.86, flexDirection: 'row', justifyContent: 'flex-end', padding: 15 }} onPress={() => props.modalClose()}>
                            <AntDesign name="close" size={30} color={COLORS.HEADERCOLOR} />
                        </TouchableOpacity>

                        
                        <View style={{ alignItems: "center" ,marginTop:10,borderWidth:1,borderRadius:10}}>
                    <Image
                        source={{uri:'data:image/png;base64,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'}}
                        resizeMode="contain"
                        style={{ height: 120, width:120, borderRadius: 10, alignItems: "center" }}
                    />
                    <TouchableOpacity style={{backgroundColor:'#595959',width:'100%',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                        <Text style={{paddingHorizontal:30,padding:5,textAlignVertical:'center',color:'white'}}>Add Photo</Text>
                    </TouchableOpacity>
                </View>
                        <View style={{}}>
                            <Text style={{ color: "#868686", fontSize: 18, fontWeight: "600" }}>hello</Text>
                            <View style={{ flexDirection: "row", borderBottomColor: "#4F4F4F", borderBottomWidth: 2, alignItems: "center" }}>
                                <View>
                                    <TextInput
                                        style={{ height: 40, borderRadius: 5, fontSize: 18, color: COLORS.WHITE }}
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
                        </View>

                        <Pressable onPress={() => props.modalClose()} style={{ width: WIDTH * 0.7, marginTop: 30, height: HEIGHT * 0.07, backgroundColor: COLORS.ACTIVECOLORS, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: COLORS.WHITE, fontSize: FONT.SIZE.MEDIUM }}>Save</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: WIDTH * 0.86,
        height: HEIGHT * 0.9
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 3,
        fontSize: FONT.SIZE.MEDIUM
    }
});

export default AddStoreModal;