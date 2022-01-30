import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../../Utils/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import { CommonPicker } from "../../../Components/Common/commonPicker"
import {PhotoDetails} from "../../../Components/Photo/index";
import Network from '../../../Services/Network';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import Loader from '../../../Components/Common/Loader';




export default function TeamPhotoDetails(props) {

    const [photo,setPhoto]=useState([]);
    const [loading,setLoading]=useState(false);

   
    useEffect(() => {
        getPhotoAlbum();
      }, []);


    const getPhotoAlbum = async () => {
        const user = await AsyncStorage.getItem('@user');
        const userData = JSON.parse(user);
        console.log('useer rererer', userData);
        if (userData) {
          let header = {
            authToken: userData.authtoken,
          };

          setLoading(true)
          Network('api/get-user-media-list?album_id='+props.route.params.albumId, 'get', header)
            .then(async (res) => {
                setLoading(false)

              if (res.response_code == 2000) {
                console.log('photo----', res);
                let list = res.response_data.docs.map((item) => {
                    return {
                      photoId: item._id,
                      img: item.file
                    };
                  });
      
                  setPhoto(list);
        console.log('photo...',photo)
                // setSportsData(res.response_data);
              } else if (res.response_code == 4000) {
                setLoading(false)
                Toast.show(res.response_message);
              }
            })
            .catch((error) => {
                setLoading(false)
              console.log('error===>', error);
            });
        }
      };
    


    return (
        <>
            <SafeAreaView style={{ flex:1, backgroundColor: '#414141' }}>
                <StatusBar backgroundColor={"#262626"} barStyle="light-content" />
                <Loader loading={loading}/>
                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "#2C2C2C" }}>
                    <TouchableOpacity style={{ flex: 0.8, flexDirection: "row", alignItems: "center" }} onPress={()=>props.navigation.goBack()}>
                        <Image
                            source={require('../../../Assets/VectorIcon/back.png')}
                            resizeMode="contain" style={{ height: 10, width: 20 }}
                        />

                        <Text style={{ color: "#FFFFFF", fontSize: 14, marginLeft: 20 }}>Photo</Text>
                    </TouchableOpacity>
                   
                    <View style={{ flex: 0.2, alignItems: "flex-end",position:"absolute",right:15 }}>
                    <View style={{ backgroundColor: "#595959", width: 30, height: 30, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                    <Image
                            source={require('../../../Assets/VectorIcon/pencil.png')}
                            resizeMode="contain" style={{ height: 10, width: 20 }}
                        />
                    </View>
                    </View>
                </View>
                <View style={{flex:1,marginHorizontal:10}}>
                {photo.length == 0 ? (
                <Text style={{color: '#FFFFFF', fontSize: 16, marginTop: 20,textAlign:'center'}}>
                  Not Found.
                </Text>
                    ) : (
                            <FlatList
                                style={{}}
                                showsVerticalScrollIndicator={false}
                                data={photo}
                                numColumns={3}
                                renderItem={({item}) => {
                                    return (
                                        <PhotoDetails 
                                        image={item.img} 
                                        photoId={item.photoId}
                                        />
                                    );
                                }}
                                keyExtractor={item => item.id}

                            />)}

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