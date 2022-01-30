import React, { useState, useEffect } from 'react';
import { View, StatusBar, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../Utils/constants';


export function MyordersComponent(props) {
    return (
        <>
            <View style={{ borderRadius: 10, marginVertical: 5, paddingBottom: 15, marginHorizontal: 15, height: 165, width: 150, backgroundColor: "#595959" }}>
                <View style={{ alignItems: "center" ,marginTop:10}}>
                    <Image
                        source={{uri:props.image}}
                        resizeMode="contain"
                        style={{ height: 80, width:150, borderRadius: 10, alignItems: "center" }}
                    />
                </View>

                <Text style={{ textAlign: "center", marginBottom: 5, color: "#A8A8A8",marginTop:5 ,fontSize:16,color:'white'}}>{props.title}</Text>
                <Text style={{ marginLeft: 10, marginBottom: 2, color: "#A8A8A8" }}>price:{props.price}</Text>
                <Text style={{ marginLeft: 10, color: "#A8A8A8" }}>Size:{props.size}</Text>
            </View>
        </>
    )
}