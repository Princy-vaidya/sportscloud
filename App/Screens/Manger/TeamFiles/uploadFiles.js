import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid
} from 'react-native';
import {COLORS, FONT, HEIGHT, WIDTH} from '../../../Utils/constants';
import {CommonPicker} from '../../../Components/Common/commonPicker';
import Network from '../../../Services/Network';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import Loader from '../../../Components/Common/Loader';
import GalleryImage from "../../../Components/Photo/galleryImage";
import CameraRoll from "@react-native-community/cameraroll";
import * as ImagePicker from "react-native-image-picker";
import {base_url} from "../../../Utils/constants";
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';

export default function Upload(props) {
  const [sportsName, setSportsName] = useState('');
  const [sportsValue, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [singleImage, setSingleImage] = useState("");
  const [multiSelect, setMultiselect] = useState(false);
  const [cameraImage, setCameraImage] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [selectType, setSelectType] = useState('');
  const [paused, setPaused] = useState(false);
  const [showModal,setShowModal]=useState(false)
  const [Item,setItem]=useState({});
  const [newImageList,setNewImageList]=useState([]);
  const [singleFile,setSingleFile]=useState([])
  

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
    console.log('useerrererer', userData);
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

  const sportsArray = sportsValue.map((item) => {
    return {label: item.team_name, value: item};
  });

  const onChangeValue = (name) => {
    setSportsName(name);
  };


  const SingleFilePicker= async()=> {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      
      });
 
     setSingleFile(res)
 
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }
   /**************************** Get All photos intialy ********************************************************/

   
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#414141'}}>
        <StatusBar backgroundColor={'#262626'} barStyle="light-content" />
        <Loader loading={loading} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: '#2C2C2C',
          }}>
          <TouchableOpacity
            style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}
            onPress={() => props.navigation.goBack()}>
            <Image
              source={require('../../../Assets/VectorIcon/back.png')}
              resizeMode="contain"
              style={{height: 10, width: 20}}
            />

            <Text style={{color: '#FFFFFF', fontSize: 14, marginLeft: 10}}>
            Upload File
            </Text>
          </TouchableOpacity>
          <View style={{flex: 0.4, alignItems: 'flex-start'}}>
            <CommonPicker
              selected={sportsName}
              placeholder={{}}
              onChange={(sportsName) => onChangeValue(sportsName)}
              items={sportsArray}
            />
          </View>
           
        </View>
<View style={{alignItems:'center',justifyContent:'center',flex:1}}>
    {/* <View style={{width:'70%',alignSelf:'center'}}>
        <Text style={{textAlign:'center'}}>
         {singleFile.length!=0 ? singleFile[0].name : ''}
        </Text>
</View> */}
 
      
 
        <TouchableOpacity
          activeOpacity={0.5}
          style={{width:'80%',height:200,alignItems:'center',justifyContent:'center',borderWidth:1,borderRadius:10,borderColor:COLORS.TEXTCOLORS}}
          onPress={()=>SingleFilePicker()}>
          <Text style={{fontSize:16,color:COLORS.TEXTCOLORS,fontWeight:'bold',textAlign:'center',paddingHorizontal:10}}>
          {singleFile.length!=0?singleFile[0].name: 'Click Here To Pick File'}
          </Text>
          {singleFile.length!=0 &&
          <TouchableOpacity style={{marginTop:10}}
          onPress={()=>setSingleFile([])}>
              <Image source={require('../../../Assets/cross.png')}/>
          </TouchableOpacity>}
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20,alignSelf:'center',backgroundColor:COLORS.GREENCOLOR,padding:10,borderRadius:8,paddingHorizontal:'10%'}}>
           <Text style={{fontSize:16,color:COLORS.WHITE,fontWeight:'bold'}}>Upload File</Text>
       </TouchableOpacity>
       </View>

       
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: HEIGHT,
    // width: WIDTH,
  },
  upload: {
    color: 'white',
    padding: 5,
    backgroundColor: COLORS.REDCOLOR,
  },
  selectView:{
    width: "95%",
    height: 220,
    alignSelf: "center",
    margin: 10,
    alignItems:'center',
    borderRadius: 10,
    marginTop:20,
    justifyContent:'center',
    borderWidth:1,
    borderColor:COLORS.GRAY
 },
  singleImage: {
    width: "95%",
    height: 220,
    alignSelf: "center",
    margin: 10,
    borderRadius: 10,
    marginTop:20,
  },
  tabContainer: {
    flexDirection: "row",
    margin: 10,
    marginTop:20,
    justifyContent: "space-between",
    marginBottom:20,
    alignSelf:'flex-end',
  },
  multiselectTab: {
    width: 120,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: COLORS.TEXTCOLORS,
    backgroundColor:COLORS.GRAY,
    marginRight:20
  },
  galleryIcon: {
    width: 22,
    height: 15,
    resizeMode: "contain",
    tintColor: "white",
  },
  dropdownIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    tintColor: "white",
  },
  multiselectActiveTab: {
    backgroundColor: '#274FA4',
    width: "34%",
    height: 40,
    marginLeft:'10%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 8,
    marginRight:20
  },
  inactiveIcon: {
    width: 22,
    height: 15,
    resizeMode: "contain",
    tintColor: "grey",
  },
  activeIcon: {
    width: 22,
    height: 15,
    resizeMode: "contain",
    tintColor: "white",
  },
  camera: {
    width: 28,
    height: 22,
    top: 5,
   marginRight:'5%',
  },
  modalView:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
   },
   modalContainer:{
    backgroundColor: '#fff',
    width: '80%',
    alignItems: 'center',
    borderRadius: 6,
    elevation: 4,
    flexDirection: 'column',
   },
   cancelButton:{
    alignItems:'center',
    width:'100%',
    height:40,
    backgroundColor:COLORS.GREENCOLOR
   },
  
   borderModalView:{
    margin:10,
    width:'100%',
    alignItems:'center'
   }
});
