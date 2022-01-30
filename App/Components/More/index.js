import React, { useState, useEffect } from 'react';
import { View, StatusBar, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../Utils/constants';



export default function MoreComponent(props) {
    return (
        <>
            {
                props.data.map((val) => {
                    return (
                        <TouchableOpacity
                            style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#595959", marginHorizontal: 20, paddingVertical: 8, borderRadius: 15, marginBottom: 12 }}
                            onPress={()=> props.onClick(val)}
                            activeOpacity={0.7}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}>
                                <Image
                                    source={val.img}
                                    resizeMode="contain" style={{ height: 30, width: 20 }}
                                />

                                <Text style={{ color: "white", marginLeft: 15 }}>{val.des}</Text>
                            </View>

                            <View style={{ paddingRight: 10 }}>
                                <Image
                                    source={require('../../Assets/VectorIcon/right.png')}
                                    resizeMode="contain" style={{ height: 30, width: 20 }}
                                />

                            </View>
                        </TouchableOpacity>
                    )
                })
            }

        </>
    )
}




const styles = StyleSheet.create({


})