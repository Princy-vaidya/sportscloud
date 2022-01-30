import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../../Utils/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import { CommonPicker } from "../../../Components/Common/commonPicker"
import { PhotoComponents } from "../../../Components/Photo/index"
import CreateAlubmModal from "../../../Components/Photo/createAlubmModal"
import Network from '../../../Services/Network';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';


export default function TeamPhotoScreens(props) {
    const [sportsName, setSportsName] = useState('');
    const [sportsValue, setSportsData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [fileName, setFileName] = useState("");
    const [photo, setPhoto] = useState([
        {
            id: "1",
            title: "First Match",
            date: "1 Jan 2020",
            img: require('../../../Assets/Home/image.png')
        },
        {
            id: "2",
            title: "Second Match",
            date: "1 Feb 2020",
            img: require('../../../Assets/Home/image.png')
        },
        {
            id: "3",
            title: "Third Match",
            date: "1 Feb 2020",
            img: require('../../../Assets/Home/image.png')
        }
    ]);


    const placeholderSports = {
        label: 'select sports',
        value: 'sports',
    };


    useEffect(() => {
        listTeam();
      }, []);


      const listTeam = async () => {
        const user = await AsyncStorage.getItem('@user');
        const userData = JSON.parse(user);
        console.log('useer rererer', userData);
        if (userData) {
          let header = {
            authToken: userData.authtoken,
          };
          Network('api/my-team-list?team_manager_id=' + userData._id, 'get', header)
            .then(async (res) => {
              if (res.response_code == 2000) {
                console.log('hello----', res);
                setSportsData(res.response_data);
              } else if (res.response_code == 4000) {
                Toast.show(res.response_message);
              }
            })
            .catch((error) => {
              console.log('error===>', error);
            });
        }
      };
    

    //   const getPhotoAlbum = async () => {
    //     const user = await AsyncStorage.getItem('@user');
    //     const userData = JSON.parse(user);
    //     console.log('useer rererer', userData);
    //     if (userData) {
    //       let header = {
    //         authToken: userData.authtoken,
    //       };
    //       Network('api/get-user-media-list?album_id='+, 'get', header)
    //         .then(async (res) => {
    //           if (res.response_code == 2000) {
    //             console.log('photo----', res);
    //             // setSportsData(res.response_data);
    //           } else if (res.response_code == 4000) {
    //             Toast.show(res.response_message);
    //           }
    //         })
    //         .catch((error) => {
    //           console.log('error===>', error);
    //         });
    //     }
    //   };
    

      const sportsArray = sportsValue.map((item) => {
        return {label: item.team_name, value: item};
      });
    
      const onChangeValue = (name) => {
        setSportsName(name);
      };

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#414141' }}>
                <StatusBar backgroundColor={"#262626"} barStyle="light-content" />
                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "#2C2C2C" }}>
                    <TouchableOpacity style={{ flex: 0.3, flexDirection: "row", alignItems: "center" }} onPress={() => props.navigation.goBack()}>
                        <Image
                            source={require('../../../Assets/VectorIcon/back.png')}
                            resizeMode="contain" style={{ height: 10, width: 20 }}
                        />

                        <Text style={{ color: "#FFFFFF", fontSize: 14, marginLeft: 20 }}>Photo</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 0.4, alignItems: "flex-start" }}>
                    <CommonPicker
                     selected={sportsName}
                    placeholder={{}}
                     onChange={(sportsName) => onChangeValue(sportsName)}
                    items={sportsArray}
                    />
                    </View>

                    {/* <View style={{ flex: 0.2, alignItems: "flex-end", position: "absolute", right: 15 }}>
                        <View style={{ backgroundColor: "#595959", width: 30, height: 30, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                            <Entypo name="plus" size={24} color="white" onPress={() => setModalVisible(true)} />
                        </View>
                    </View> */}
                </View>
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                <CreateAlubmModal
                        modalVisible={modalVisible}
                        modalClose={()=>setModalVisible(false)}
                        onChangeText={(val) => setFileName(val)}
                        fileValue={fileName}
                    />
                    <FlatList
                        style={{}}
                        showsVerticalScrollIndicator={false}
                        data={photo}
                        renderItem={({ item }) => {
                            return (
                                <PhotoComponents
                                    title={item.title}
                                    date={item.date}
                                    image={item.img}
                                    onClick={() => props.navigation.navigate("photoDetails")}
                                />
                            );
                        }}
                        keyExtractor={item => item.id}

                    />
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