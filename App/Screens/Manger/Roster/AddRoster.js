import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../../Utils/constants';


export default function AddRosterScreens(props) {

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'rgba(55, 55, 55, 0.95)' }}>
                <StatusBar backgroundColor={COLORS.APPCOLORS} barStyle="light-content" />
                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "#2C2C2C" }}>
                    <TouchableOpacity style={{ flex: 0.7, flexDirection: "row", alignItems: "center" }} onPress={() => props.navigation.navigate("Roster")}>
                        <Image
                            source={require('../../../Assets/VectorIcon/back.png')}
                            resizeMode="contain" style={{ height: 10, width: 20 }}
                        />

                        <Text style={{ color: "#FFFFFF", fontSize: 14, marginLeft: 20 }}>Add your Roster</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 0.3, alignItems: "flex-end" }} onPress={() => props.navigation.navigate("Home1")}>
                        <Text style={{ color: "#FFFFFF", fontSize: 14 }}>Skip</Text>
                    </TouchableOpacity>
                </View>

                <View style={{height:HEIGHT,backgroundColor: "#414141", }}>
                    <View style={{ paddingVertical: 10, alignItems: "center" }}>
                        <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Add your Roster</Text>
                    </View>

                    <View style={{ alignItems: "center",marginBottom:25 }}>
                        <Text style={{ color: "#FFFFFF", fontSize: 12, textAlign: "center" }}>Invite your players to track availability and{"\n"} stay connected with the team.</Text>
                    </View>


                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            style={{ backgroundColor: "#FFFFFF", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center",alignItems:"center",marginBottom:10 }}
                            activeOpacity={0.7}
                            onPress={()=>props.navigation.navigate("Contacts")}

                        >
                            <Text style={{ color: "#595959", fontSize: 14, textAlign: "center", fontWeight: "600" }}>Import From Contacts</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ backgroundColor: "#FFFFFF", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center",alignItems:"center",marginBottom:10 }}
                            activeOpacity={0.7}
                        >
                            <Text style={{ color: "#595959", fontSize: 14, textAlign: "center", fontWeight: "600" }}>Import From Another Team</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ backgroundColor: "#EC3525", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center",alignItems:"center",marginBottom:10 }}
                            activeOpacity={0.7}
                            onPress={()=>props.navigation.navigate("addManually")}
                        >
                            <Text style={{ color: "#FFFFFF", fontSize: 14, textAlign: "center", fontWeight: "600" }}>Add Manually</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ backgroundColor: "#EC3525", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center",alignItems:"center",marginBottom:10 }}
                            activeOpacity={0.7}
                            onPress={()=>props.navigation.navigate("InviteTeam")}
                        >
                            <Text style={{ color: "#FFFFFF", fontSize: 14, textAlign: "center", fontWeight: "600" }}>Invite to Team</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: "#EC3525", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center",alignItems:"center",marginBottom:30 }}
                            activeOpacity={0.7}
                            onPress={()=>props.navigation.navigate("createTeam")}
                        >
                            <Text style={{ color: "#FFFFFF", fontSize: 14, textAlign: "center", fontWeight: "600" }}>Create Team</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        // height: HEIGHT,
        // width: WIDTH,

    },


})