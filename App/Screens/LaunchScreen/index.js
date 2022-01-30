import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, ScrollView, SafeAreaView,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { COLORS, HEIGHT, WIDTH } from '../../Utils/constants';
import { loginUser, setLocation } from '../../Redux/Actions/authAction'
import { useSelector, useDispatch } from 'react-redux'


// const HAS_LAUNCHED = 'hasLaunched';

export default function LaunchScreen(props) {


    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'rgba(55, 55, 55, 0.95)' }}>
                <StatusBar backgroundColor={COLORS.APPCOLORS} barStyle="light-content" />
                <ScrollView>
                    <View style={styles.container}>
                        <Image
                            source={require('../../Assets/LaunchScreen/Logo.png')}
                            resizeMode="contain" style={{ height: HEIGHT * 0.1, width: WIDTH * 0.6,marginTop:35 }}
                        />

                        <Image
                            source={require('../../Assets/LaunchScreen/download.png')}
                            resizeMode="contain" style={{ height: HEIGHT * 0.3, width: WIDTH * 0.5,marginTop:20 }}
                        />

                        <TouchableOpacity
                          style={{backgroundColor:"#EC3525",borderRadius:25,width:WIDTH * 0.8,height: HEIGHT * 0.06,justifyContent:"center",marginBottom:25}}
                          activeOpacity={0.7}
                          onPress={()=>props.navigation.navigate("Login")}
                        >
                         <Text style={{color:"#FFFFFF",fontSize:20,textAlign:"center",fontWeight:"600"}}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{backgroundColor:"#FFFFFF",borderRadius:25,width:WIDTH * 0.8,height: HEIGHT * 0.06,justifyContent:"center",marginBottom:25}}
                          activeOpacity={0.7}
                          onPress={()=>{props.navigation.navigate("QrcodeScreens")}}
                        >
                         <Text style={{color:"#595959",fontSize:20,textAlign:"center",fontWeight:"600"}}>Attent and Event</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{backgroundColor:"#FFFFFF",borderRadius:25,width:WIDTH * 0.8,height: HEIGHT * 0.06,justifyContent:"center"}}
                          activeOpacity={0.7}
                          onPress={()=>props.navigation.navigate("Signup")}
                        >
                         <Text style={{color:"#595959",fontSize:20,textAlign:"center",fontWeight:"600"}}>Create a New Account</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,
        alignItems: 'center',
    }
})