import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, Switch, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../../Utils/constants';
import { NormalTextInput, PickerComponent, DatePickerComponent } from "../../../Components/Common/InputText"
import { CommonPicker } from "../../../Components/Common/commonPicker"
import { Formik } from 'formik';
import * as Yup from 'yup';
import Loader from "../../../Components/Common/Loader"
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import moment from 'moment'
import Network from "../../../Services/Network"
import Entypo from 'react-native-vector-icons/Entypo';
import {RosterList} from "../../../Components/Roster/rosterList"


export default function RosterScreens(props) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dobValue, setDob] = useState("YYYY-MM-DD");
    const [sportsName, setSportsName] = useState("");
    const [sportsValue, setSportsData] = useState([]);
    const [listValue, setPlayerList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        listTeam()
        playerList()
    }, [])


    const listTeam = async () => {
        const user = await AsyncStorage.getItem('@user')
        const userData = JSON.parse(user)
        console.log("useerrererer", userData)
        if (userData) {
            let header = {
                'authToken': userData.authtoken
            }
            Network('api/my-team-list?team_manager_id=' + userData._id, 'get', header)
                .then(async (res) => {
                    if (res.response_code == 2000) {
                        console.log("hello----", res)
                        setSportsData(res.response_data)
                    } else if (res.response_code == 4000) {
                        Toast.show(res.response_message)
                    }
                })
                .catch((error) => {
                    console.log("error===>", error)
                });
        }
    }

    const sportsArray = sportsValue.map((item) => {
        return { label: item.team_name, value: item }
    })

    const playerList = async () => {
        const user = await AsyncStorage.getItem('@user')
        const userData = JSON.parse(user)
        console.log("useerrererer", userData)
        if (userData) {
            let header = {
                'authToken': userData.authtoken
            }
            Network('api/all-player-list-by-team-id?team_id=' + sportsName._id, 'get', header)
                .then(async (res) => {
                    if (res.response_code == 2000) {
                        console.log("playList---", res.response_data.length)
                        setPlayerList(res.response_data)
                    } else if (res.response_code == 4000) {
                        Toast.show(res.response_message)
                    }
                })
                .catch((error) => {
                    console.log("error===>", error)
                });
        }
    }

    const onChangeValue = (name)=>{
        setSportsName(name)
        playerList()
    }


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#414141' }}>
                <StatusBar backgroundColor={"#262626"} barStyle="light-content" />
                <Loader loading={loading} />
                <View style={{ flexDirection: "row", paddingHorizontal: 20, alignItems: "center", paddingVertical: 10, backgroundColor: "#2C2C2C" }}>
                    <View style={{ flex: 0.2, alignItems: "flex-start" }}>
                        <Text style={{ color: "#FFFFFF", fontSize: 14 }}>Players</Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: "flex-start" }}>
                        <CommonPicker
                            selected={sportsName}
                            placeholder={{}}
                            onChange={(sportsName)=>onChangeValue(sportsName)}
                            items={sportsArray}
                        />
                    </View>
                    <View style={{ flex: 0.3, alignItems: "flex-end" }}>
                        <View style={{ backgroundColor: "#595959", width: 30, height: 30, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                            <Entypo name="plus" size={24} color="white" />
                        </View>
                    </View>

                </View>
                <View style={{ marginTop: 20 }}>
                    {/* <View style={{ alignItems: "center", marginBottom: 10, marginHorizontal: 20 }}>
                        <CommonPicker
                            selected={sportsName}
                            placeholder={{}}
                            onChange={(sportsName) => setSportsName(sportsName)}
                            items={sportsArray}
                        />
                    </View> */}

                    {/* <View style={{ backgroundColor: "#595959", borderRadius: 10, marginHorizontal: 10, paddingVertical: 10 }}>
                        <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                            <Image
                                source={require('../../../Assets/roster/person.png')}
                                resizeMode="contain" style={{ height: 50, width: 50, borderRadius: 25, borderWidth: 2, borderColor: "#ffffff" }}
                            />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 14, marginBottom: 2 }}>Robins Kumar</Text>
                                <Text style={{ color: "#FFFFFF", fontWeight: "400", fontSize: 12 }}>Manger</Text>
                            </View>
                        </View>
                    </View> */}
                    <View>
                        {
                            listValue.length >0 ? 
                            listValue.map((item)=>{
                                return(
                                    <RosterList
                                      image={item.member_id.profile_image}
                                      name={`${item.member_id.fname}${item.member_id.lname}`}
                                      position={"player"}
                                    />
                                )
                            })
                            :
                            <Text style={{color:"white",textAlign:"center",fontSize:14}}>No list found!</Text>
                        }
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
    formError: {
        color: COLORS.SECONDARY,
        // fontFamily: FONT.FAMILY.ROBOTO_Regular,
        textAlign: 'center',
        marginTop: 4,
        fontSize: 16,
    },

})
