import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../../Utils/constants';
import { CommonPicker } from "../../../Components/Common/commonPicker"
import Entypo from 'react-native-vector-icons/Entypo';
import { PracticeScreen, RosterBannerScreen } from "../../../Components/Home/practice"
import Network from '../../../Services/Network';
import AsyncStorage from '@react-native-community/async-storage';

const sportsType = [
    {
        label: 'Cricket',
        value: 'cricket',
    },
    {
        label: 'Football',
        value: 'football',
    },
];


const practice = [
    {
        id: "1",
        title1: "Sat,May 30",
        title2: "12:00 pm GMT - 07:00",
        des: "Tournament Practice Anfield (Large Gym)",
        // img:require('../../../Assets/Home/map.png')
    },
    {
        id: "2",
        title1: "Sat,May 30",
        title2: "12:00 pm GMT - 07:00",
        des: "Tournament Practice Anfield (Large Gym)",
        // img:"require('../../../Assets/Home/map.png')"
    },
    {
        id: "3",
        title1: "Sat,May 30",
        title2: "12:00 pm GMT - 07:00",
        des: "Tournament Practice Anfield (Large Gym)",
        // img:"require('../../../Assets/Home/map.png')"
    }
]

const banner = [
    {
        id: "1",
        title: "Courage in Crisis",
        des: "Start communicating with your team by adding players to your roster.",
        // img:require('../../../Assets/Home/map.png')
    },
    {
        id: "2",
        title: "Courage in Crisis",
        des: "Start communicating with your team by adding players to your roster.",
        // img:"require('../../../Assets/Home/map.png')"
    },
    {
        id: "3",
        title: "Courage in Crisis",
        des: "Start communicating with your team by adding players to your roster.",
        // img:"require('../../../Assets/Home/map.png')"
    }
]


export default function HomeScreens(props) {

    const [sportsName, setSportsName] = useState("cricket");

    useEffect(()=>{
        listTeam()
    },[])
    const placeholderSports = {
        label: 'please select sports',
        value: 'sports',
    };

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    const listTeam = async() => {
        const user =   await AsyncStorage.getItem('@user')
        const userData = JSON.parse(user)
        console.log("useerrererer",userData)
        if (userData) {
            let header = {
                'authToken': userData.authtoken
            }
            Network('api/my-team-list?team_manager_id=' + userData._id ,'GET', header)
                .then(async (res) => {
                  console.log("hello----",res)
                    if (res.response_code == 2000) {
                       
                    } else if (res.response_code == 4000) {
                        toast.error(res.response_message)
                    }
                })
                .catch((error) => {
                    console.log("error===>", error)
                });
        }
      }

    // const cityList = this.state.citylist.map((item) => {
    //     return { label: item.state_name, value: item.state_name }
    //   })

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#2C2C2C' }}>
                <StatusBar backgroundColor={COLORS.APPCOLORS} barStyle="light-content" />
                <View style={{ flexDirection: "row", width: WIDTH, justifyContent: "space-around", paddingVertical: 10 }}>
                    <View style={{ width: "40%" }}>
                        <CommonPicker
                            selected={sportsName}
                            placeholder={placeholderSports}
                            onChange={(sportsName) => setSportsName(sportsName)}
                            items={sportsType}
                        />
                    </View>

                    <View style={{ backgroundColor: "#595959", width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                        <Entypo name="plus" size={24} color="white" />
                    </View>
                </View>


                <View style={{ height: HEIGHT, backgroundColor: '#414141' }}>
                    <View style={{paddingTop: 30, paddingHorizontal: 10 }}>
                        <View style={{ marginBottom:30 }}>
                            <FlatList
                                style={{}}
                                showsHorizontalScrollIndicator={false}
                                data={practice}
                                horizontal={true}
                                renderItem={({ item }) => {
                                    return (
                                        <PracticeScreen title1={item.title1} title2={item.title2} des={item.des} />
                                    );
                                }}
                                keyExtractor={item => item.id}

                            />
                        </View>

                        <View style={{height:HEIGHT/2.7}}>
                            <FlatList
                                style={{}}
                                showsVerticalScrollIndicator={false}
                                data={banner}
                                renderItem={({ item }) => {
                                    return (
                                        <RosterBannerScreen title={item.title} des={item.des} />
                                    );
                                }}
                                keyExtractor={item => item.id}

                            />
                        </View>


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