import React, { useState, useEffect } from 'react';
import { View, StatusBar, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../Utils/constants';


export function RosterList(props) {
    return (
        <>
            <View style={{ backgroundColor: "#595959", borderRadius: 10, marginHorizontal: 10, paddingVertical: 10,marginBottom:10 }}>
                <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                    {
                        props.image !== null ?
                            <Image
                                source={{ uri: props.image }}
                                resizeMode="contain" style={{ height: 50, width: 50, borderRadius: 25, borderWidth: 2, borderColor: "#ffffff" }}
                            />
                            :
                            <Image
                                source={require('../../Assets/roster/person.png')}
                                resizeMode="contain" style={{ height: 50, width: 50, borderRadius: 25, borderWidth: 2, borderColor: "#ffffff" }}
                            />
                    }

                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 14, marginBottom: 2 }}>{props.name}</Text>
                        <Text style={{ color: "#FFFFFF", fontWeight: "400", fontSize: 12 }}>{props.position}</Text>
                    </View>
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({


})