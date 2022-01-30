import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {COLORS, FONT, HEIGHT, WIDTH} from '../../../Utils/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {CommonPicker} from '../../../Components/Common/commonPicker';
import {AlbumCard} from '../../../Components/Photo/index';
import CreateAlubmModal from '../../../Components/Photo/createAlubmModal';
import Network from '../../../Services/Network';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import Loader from '../../../Components/Common/Loader';

export default function AlbumScreen(props) {
  const [sportsName, setSportsName] = useState('');
  const [sportsValue, setSportsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [album, setAlbum] = useState([]);

  const placeholderSports = {
    label: 'select sports',
    value: 'sports',
  };

  useEffect(() => {
    listTeam();
    getAlbumList();
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
    getAlbumList();
  };

  const getAlbumList = async () => {
    const user = await AsyncStorage.getItem('@user');
    const userData = JSON.parse(user);
    console.log('useerrererer', userData);
    if (userData) {
      let header = {
        authToken: userData.authtoken,
      };

      setLoading(true);
      Network('api/get-album-list?team_id=' + sportsName._id, 'get', header)
        .then(async (res) => {
          setLoading(false);

          if (res.response_code == 2000) {
            let list = res.response_data.docs.map((item) => {
              return {
                name: item.name,
                albumId: item._id,
                teamId: item.team_id,
                managerId: item.team_manager_id,
              };
            });

            setAlbum(list);
          } else if (res.response_code == 4000) {
            setLoading(false);

            Toast.show(res.response_message);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log('error===>', error);
        });
    }
  };

  const onAddAlbum = async () => {
    const user = await AsyncStorage.getItem('@user');
    const userData = JSON.parse(user);
    setLoading(true);
    if (userData) {
      const obj = {
        name: fileName,
        team_id: sportsName._id,
        authToken: userData.authtoken,
      };
      setLoading(true);

      Network('api/add-album', 'post', obj)
        .then(async (res) => {
          setLoading(false);
          console.log('response--->', res);
          if (res.response_code == 2000) {
            Toast.show(res.response_message);
            setModalVisible(false);
            getAlbumList();
          } else {
            setLoading(false);
            Toast.show(res.response_message);
          }
        })
        .catch((error) => {
          setLoading(false);
          Toast.show('Something went wrong !');
        });
    }
  };

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
            style={{flex: 0.3, flexDirection: 'row', alignItems: 'center'}}
            onPress={() => props.navigation.goBack()}>
            <Image
              source={require('../../../Assets/VectorIcon/back.png')}
              resizeMode="contain"
              style={{height: 10, width: 20}}
            />

            <Text style={{color: '#FFFFFF', fontSize: 14, marginLeft: 20}}>
              Album
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
            {/* <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => props.navigation.navigate('TeamPhoto')}>
              <Text style={styles.upload}>View</Text>
            </TouchableOpacity> */}
            <View
              style={{
                backgroundColor: '#595959',
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo
                name="plus"
                size={24}
                color="white"
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <CreateAlubmModal
            modalVisible={modalVisible}
            modalClose={() => setModalVisible(false)}
            addAlbum={() => onAddAlbum()}
            onChangeText={(val) => setFileName(val)}
            fileValue={fileName}
          />

          {album.length == 0 ? (
            <Text style={{color: '#FFFFFF', fontSize: 16, marginTop: 20,textAlign:'center'}}>
              Not Found.
            </Text>
          ) : (
            <FlatList
              style={{}}
              showsVerticalScrollIndicator={false}
              data={album}
              renderItem={({item}) => {
                return (
                  <AlbumCard
                    item={item}
                    navigation={() => props.navigation.navigate('uploadPhoto',{albumId:item.albumId})}
                    onView={()=>props.navigation.navigate('photoDetails',{albumId:item.albumId})}
                  />
                );
              }}
              keyExtractor={(item) => item.id}
            />
          )}
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
    backgroundColor: COLORS.PURPLECOLOR,
  },
});
