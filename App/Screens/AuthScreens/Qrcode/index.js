import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../../Utils/constants';



export default function QrcodeScreens(props) {






    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'rgba(55, 55, 55, 0.95)' }}>
                <StatusBar backgroundColor={COLORS.APPCOLORS} barStyle="light-content" />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ alignItems: "center", marginVertical: 40 }}>
                            <Image
                                source={require('../../../Assets/LaunchScreen/Logo.png')}
                                resizeMode="contain" style={{ height: HEIGHT * 0.1, width: WIDTH * 0.6 }}
                            />
                        </View>

                        <View style={{ alignItems: "center",marginBottom:30 }}>
                            <Image
                                source={require('../../../Assets/Qrcode/qr-code.png')}
                                resizeMode="contain" style={{ height: HEIGHT * 0.25, width: WIDTH * 0.5 }}
                            />
                        </View>

                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity
                                style={{ backgroundColor: "#FFFFFF", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center", marginBottom: 25 }}
                                activeOpacity={0.7}
                            >
                                <Text style={{ color: "#595959", fontSize: 16, textAlign: "center", fontWeight: "600" }}>Events in progress</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ backgroundColor: "#FFFFFF", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center", marginBottom: 25 }}
                                activeOpacity={0.7}
                            >
                                <Text style={{ color: "#595959", fontSize: 16, textAlign: "center", fontWeight: "600" }}>Finished events</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{ backgroundColor: "#EC3525", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center", marginBottom: 25 }}
                                activeOpacity={0.7}
                                onPress={()=>props.navigation.navigate('Login')}
                            >
                                <Text style={{ color: "#FFFFFF", fontSize: 16, textAlign: "center", fontWeight: "600" }}>Back to Login</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,
        // alignItems: 'center',
    },
    formError: {
        color: COLORS.SECONDARY,
        // fontFamily: FONT.FAMILY.ROBOTO_Regular,
        textAlign: 'center',
        marginTop: 4,
        fontSize: 16,
    },

})