import React, { useState, useEffect } from 'react';
import { View, TouchableHighlight, Clipboard, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from './../../Utils/constants';
import OtpInputs from 'react-native-otp-inputs';
import Button from "./../../Components/Common/button"

export default function VerificationScreens(props) {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.onRequestClose()
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ textAlign: "center", color: COLORS.PRIMARY, fontSize: FONT.SIZE.EXTRALARGE }}>Verification code</Text>

                    <View style={{ justifyContent: 'center', height: HEIGHT * 0.27, alignItems: "center", justifyContent: "center" }}>
                        <OtpInputs
                            handleChange={(code) => props.handleChange(code)}
                            numberOfInputs={4}
                            keyboardType={"phone-pad"}
                            inputContainerStyles={{ borderWidth: 2, borderRadius: 10, margin: 5, borderColor: "grey", height: HEIGHT * 0.1, width: WIDTH * 0.14, alignItems: "center", justifyContent: "center" }}
                            style={{ flexDirection: "row", padding: 5 }}
                            inputStyles={{fontSize: 30 }}
                        />
                    </View>

                    <TouchableOpacity
                        style={{ backgroundColor: "#EC3525", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center", marginBottom: 25 }}
                        activeOpacity={0.7}
                        onPress={props.handleSubmit}
                    >
                        <Text style={{ color: "#FFFFFF", fontSize: 20, textAlign: "center", fontWeight: "600" }}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: WIDTH * 0.8,
        height: HEIGHT * 0.4
    },
})