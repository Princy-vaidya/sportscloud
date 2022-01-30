import React, { useState, useEffect } from 'react';
import { View, StatusBar, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../Utils/constants';
import ImageLoad from 'react-native-image-placeholder';


export function PhotoComponents(props) {
    return (
        <>
            <View style={{ backgroundColor: "#595959", borderRadius: 20, marginVertical: 10, paddingBottom: 15 }}>
                <Image
                    source={props.image}
                    resizeMode="cover" style={{ height: HEIGHT * 0.2, width: 373, borderRadius: 10 }}
                />
                <View style={{ flexDirection: "row", marginTop: 10, marginHorizontal: 10, justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600", marginBottom: 2 }}>{props.title}</Text>
                        <Text style={{ color: "#BBBBBB", fontSize: 14, fontWeight: "normal" }}>{props.date}</Text>
                    </View>
                    

                    <TouchableOpacity 
                     style={{ flexDirection: "row", alignItems: "center" }}
                     onPress={props.onClick}
                     >
                        <Text style={{ marginRight: 2, color: "#EC3525" }}>View All</Text>
                        <Image
                            source={require('../../Assets/VectorIcon/redright.png')}
                            resizeMode="contain" style={{ height: 10, width: 20 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}


export function PhotoDetails(props) {
    return (
        <>
            <View style={{  borderRadius: 20, marginVertical: 10, paddingBottom: 15,marginLeft:10 }}>
                  <ImageLoad
            style={{height: HEIGHT * 0.16, width: HEIGHT * 0.16, borderRadius: 10}}
        borderRadius={10}
        loadingStyle={{size:'large', color:'green'}}
        source={{uri:props.image}}
        />
            </View>
        </>
    )
}


export function AlbumCard(props) {

    const {item,navigation,onView}=props;
    return (
        <>
            <View style={styles.AlbumCard}>
               <Text style={styles.title}>{item.name}</Text>
              <View style={{flexDirection:'row'}}>
              

               <TouchableOpacity style={{marginRight:15}}
               onPress={navigation}>
                   <Text style={styles.upload}>Upload</Text>
               </TouchableOpacity>
               <TouchableOpacity
              style={{marginRight: 10}}
              onPress={onView}>
              <Text style={styles.view}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: 10}}
              >
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
               </View>
            </View>
        </>
    )
}





const styles = StyleSheet.create({
AlbumCard:{
    borderRadius: 20, 
    marginVertical: 10, 
    paddingBottom: 15,
    borderBottomWidth:0.5,
    flexDirection:'row',
    justifyContent:'space-between'
},
title:{
    marginLeft:15,
    color:'white',
    fontSize:FONT.SIZE.MEDIUM
},
upload:{
    color:'white',
    padding:5,
    backgroundColor:COLORS.GREENCOLOR
},
view:{
    color:'white',
    padding:5,
    backgroundColor:COLORS.PURPLECOLOR
},
delete:{
    color:'white',
    padding:5,
    backgroundColor:COLORS.REDCOLOR
},

})