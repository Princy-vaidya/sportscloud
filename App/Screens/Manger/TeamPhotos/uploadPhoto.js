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


export default function UploadPhotoScreen(props) {
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
  const [newImageList,setNewImageList]=useState([])
  

  const placeholderSports = {
    label: 'select sports',
    value: 'sports',
  };

  useEffect(() => {
    listTeam();
    askPermission();
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


   /**************************** Get All photos intialy ********************************************************/

   const getPhotos = () => {
    setLoading(true)
    CameraRoll.getPhotos({
      first: 200,
      assetType: "All",
    })
      .then(async(res) => {
        console.log("photo", res);
        setLoading(false)
        setData(res.edges);
        const image=res.edges[0].node.image.uri;
        await setSingleImage(image);
        console.log('singleSelect',singleImage)
        await setItem(res.edges[0].node)
      })
      .catch((error) => {
        console.log(error);
      });
  };

    /**************************** Get photo according to selection ********************************************************/



  const askPermission = async () => {
    if (Platform.OS === "android") {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Permission Explanation",
          message: "ReactNativeForYou would like to access your photos!",
        }
      );
      if (result !== "granted") {
        console.log("Access to pictures was denied");
        return;
      } else {
        getPhotos();
    }
    } else {
      getPhotos();
    }
  };

 

  /**************************** Multiple select photo ********************************************************/

  const onMultipleImageSelect = (index,item) => {
    let listArray = data;
    let newArray=[];
    setShowImage(!showImage)
    listArray[index].select = !listArray[index].select;
    setSingleImage(item.node.image.uri)
  
   console.log('data',)
   newArray = data.filter((item) => item.select === true);
   console.log('newArray',newArray)
   setData(listArray);
   setNewImageList(newArray)
  };

    /**************************** Single select photo ********************************************************/

  const onSingleSelect=(item)=>{ 
 
   setCameraImage(false)
    setSingleImage(item.node.image.uri);
    setSelectType(item.node.type)
   setItem(item.node)
  
    console.log('image',Item)
  }


  
    /**************************** Tab Container ********************************************************/

  const TabContainer=()=>{
      return(
        <View style={styles.tabContainer}>
    
        <TouchableOpacity
          style={
            multiSelect
             ? styles.multiselectActiveTab 
             : styles.multiselectTab
          }
          onPress={() => setMultiselect(!multiSelect)}
        >
          <Text
            style={
            {fontSize:16,color:'white'}
            }
          >
            Multiselect
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onCameraClicked()}>
          <Image source={require('../../../Assets/Album/camera.png')} style={styles.camera} />
        </TouchableOpacity>
      </View>
      )
  }

   /**************************** Select photo by camera ********************************************************/


  const onCameraClicked = async () => {
    ImagePicker.launchCamera(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        setCameraImage(true)
       setSingleImage(response.uri);
       setItem(response)
      }
    );
  };


 const onUploadPhoto=async()=>{
      
console.log('upload',Item.image)
     
    const user = await AsyncStorage.getItem('@user');
    const userData = JSON.parse(user);
    setLoading(true);
    
   

        let formdata = new FormData();
  
        formdata.append("album_id", props.route.params.albumId);
        if(multiSelect){
        data.map((item) =>
          formdata.append("file",
          {
            uri: item.node.image.uri,
            name: 'image1',
            type:"image/jpeg"
          } 
          ));
        }else{
          formdata.append("file",
          {
            uri: Item.image.uri,
            name: 'image1',
            type:"image/jpeg"
          } 
          )
        }
        
    axios({
        method: "POST",
        url:`${base_url}api/add-photo-to-album`,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userData.authtoken,
        },
        data: formdata,
      })
        .then((res) => {
            setLoading(false);
            console.log('response--->', res.data.response_message);
            if (res.data.response_code == 2000) {
              Toast.show(res.data.response_message);
              props.navigation.navigate('photoDetails')
            } else {
              setLoading(false);
              Toast.show(res.data.response_message);
            }
          })
          .catch((error) => {
            setLoading(false);
            // Toast.show('Something went wrong !');
          });
       
  
  } 
  


  
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
            Upload Photo
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
           
          <View
            style={{
              flex: 0.2,
              alignItems: 'flex-end',
              position: 'absolute',
              right: 15,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => onUploadPhoto()}>
              <Text style={styles.upload}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>

        {singleImage===""?
        <View style={styles.selectView}>
        <Text style={[{textAlign:'center',color:'white'}]}>
         Select Photo
          </Text>
        </View>:
        (selectType==="video/mp4")?
    //     
    <View></View>
      :
        <Image style={styles.singleImage} 
        source={{ uri: singleImage }} />
        }
        
        <TabContainer/>
        {data.length!=0?
        <FlatList
          data={data}
          numColumns={3}
          renderItem={({ item,index }) => (
              <GalleryImage
                 onPress={()=>multiSelect ?
                 onMultipleImageSelect(index,item):
                onSingleSelect(item)}
              multiSelect={multiSelect}
              item={item}
              />
            
          )}
        />:<Text style={[{alignSelf:'center',color:'red'}]}>
          Not Found.
          </Text>
              }
       
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
