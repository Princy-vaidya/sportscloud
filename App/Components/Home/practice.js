import React, { useState, useEffect } from 'react';
import { View, StatusBar, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../Utils/constants';


export  function PracticeScreen(props) {
    return (
        <>
            <View style={{ backgroundColor: "#595959", width: 160, borderRadius: 20,marginHorizontal:10,paddingBottom:14 }}>
                <Image
                    source={require('../../Assets/Home/map.png')}
                    resizeMode="cover" style={{ height:100, width:160, borderRadius: 10 }}
                />
                <View style={{ marginTop: 10, marginLeft: 6 }}>
                    <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", marginBottom: 2 }}>{props.title1}{'\n'}{props.title2}</Text>
                    {/* <Text style={{color:"#FFFFFF",fontSize:18,fontWeight:"600",marginBottom:4}}>12:00</Text> */}
                    <Text style={{ color: "#BBBBBB", fontSize: 12, fontWeight: "normal" }}>{props.des}</Text>
                </View>
            </View>
        </>
    )
}

export  function RosterBannerScreen(props) {
    return (
        <>
            <View style={{ backgroundColor: "#595959", borderRadius: 20,marginVertical:10,paddingBottom:15 }}>
                <Image
                    source={require('../../Assets/Home/image.png')}
                    resizeMode="cover" style={{ height: HEIGHT * 0.2, width:400, borderRadius:15,alignItems:"center" }}
                />
                <View style={{ marginVertical: 10, marginLeft:10 }}>
                    <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", marginBottom: 2 }}>{props.title}</Text>
                    {/* <Text style={{color:"#FFFFFF",fontSize:18,fontWeight:"600",marginBottom:4}}>12:00</Text> */}
                    <Text style={{ color: "#BBBBBB", fontSize: 12, fontWeight: "normal" }}>{props.des}</Text>
                </View>
                <TouchableOpacity 
                     style={{ flexDirection: "row", alignItems: "center",marginLeft:10 }}
                     onPress={props.onClick}
                     >
                        <Text style={{ marginRight: 2, color: "#EC3525" }}>Add Roster</Text>
                        <Image
                            source={require('../../Assets/VectorIcon/redright.png')}
                            resizeMode="contain" style={{ height: 10, width: 20 }}
                        />
                    </TouchableOpacity>
            </View>
        </>
    )
}


const styles = StyleSheet.create({


})