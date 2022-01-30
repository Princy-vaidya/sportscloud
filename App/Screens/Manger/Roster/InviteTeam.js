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
  Modal,
} from 'react-native';
import {COLORS, FONT, HEIGHT, WIDTH, IMAGE_URL} from '../../../Utils/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {CommonPicker} from '../../../Components/Common/commonPicker';
import {MyordersComponent} from '../../../Components/TeamStore/index';
// import AddStoreModal from "../../../Components/TeamStore/AddStoreModal"
import Search from '../../../Components/Common/Search';
import Network from '../../../Services/Network';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../../Components/Common/Loader';
import InviteList from '../../../Components/Roster/InviteList';

export default function InviteTeamScreen(props) {
  const [sportsName, setSportsName] = useState('');
  const [sportsValue, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serchValue, setSearch] = useState('');
  const [inviteLists, setInviteList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const [invalid,setInvalid]=useState(false);
  const [message,setMessage]=useState('');

  useEffect(() => {
    listTeam();
    getInviteList();
  }, []);

  const placeholderSports = {
    label: 'select sports',
    value: 'sports',
  };

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

  const getInviteList = async () => {
    const user = await AsyncStorage.getItem('@user');
    const userData = JSON.parse(user);
    console.log('useerrererer', userData);
    if (userData) {
      let header = {
        authToken: userData.authtoken,
      };
      setLoading(true);
      Network(
        'api/player-list-by-team-id?team_id=' + '60aca35ff6cd6923adf9634a',
        'get',
        header,
      )
        .then(async (res) => {
          setLoading(false);

          if (res.response_code == 2000) {
            console.log('invitelist----', res);

            let data = [
              ...res.response_data.NON_PLAYER,
              ...res.response_data.PLAYER,
            ];

             let list = data.map((item) => {
              return {
                name: item.member_id.fname + ' ' + item.member_id.lname,
                select: false,
                playerId: item._id,
              };
            });
          
            setInviteList(list);

            if(data.length==0){
                setInvalid(true);
                setMessage('Not Found.')
            }
        
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

  const sportsArray = sportsValue.map((item) => {
    return {label: item.team_name, value: item};
  });

  const onMultipleSelectInvitaion = (index, item) => {
    let listArray = inviteLists;
    let newArray = [];
    setToggle(!toggle);
    listArray[index].select = !listArray[index].select;
    newArray = inviteLists.filter((item) => item.select === true);
    setInviteList(listArray);
    let players = [];
    newArray.map((item) => {
      players.push(item.playerId);
    });
    setSelectedPlayer(players);
  };

  const handleSentInvite = async () => {
    const user = await AsyncStorage.getItem('@user');
    const userData = JSON.parse(user);
    setLoading(true);
    if (userData) {
      const obj = {
        player_id: selectedPlayer,
        manager_id: userData._id,
        team_id: sportsName._id,
        authToken: userData.authtoken,
      };
      console.log('add team player', obj);
      Network('api/invite-players-to-team', 'post', obj)
        .then(async (res) => {
          setLoading(false);
          console.log('response--->', res);
          if (res.response_code == 2000) {
            Toast.show(res.response_message);
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

  const onChangeValue = (name) => {
    setSportsName(name);
    getInviteList()
  };


  const searchPlayer = inputString => {
      setSearch(inputString)
    let currentData = [];
   if (inputString === "")
    {    setInvalid(false)
        getInviteList()
    } else
    {
      currentData = inviteLists.filter(x =>
        String(x.name.toLowerCase()).includes(
          inputString.toLowerCase()
        )
      );

      if( currentData.length ==0){
        setInvalid(true)
        setMessage('Not Found.')
      }

      setInviteList(currentData)
        }
  };



  return (
    <>
      <SafeAreaView style={{height: HEIGHT, backgroundColor: '#414141'}}>
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

            <Text style={{color: '#FFFFFF', fontSize: 14, marginLeft: 20}}>
              Invite
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

        <View style={{alignItems: 'center', marginBottom: 10, marginTop: 20}}>
          <Search
            value={serchValue}
            onChange={(serchValue) => searchPlayer(serchValue)}
            placeholder={'Search '}
            inputwidth="90%"
          />
        </View>
        <View style={{width: '95%', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.sendInviteButton}
            onPress={() => handleSentInvite()}>
            <Text style={styles.sendInviteText}>Send Invite</Text>
          </TouchableOpacity>

          {invalid ?
          <Text style={{color: '#FFFFFF', fontSize: 16,marginTop:20}}>
         {message}
        </Text>
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            data={inviteLists}
            renderItem={({item, index}) => (
              <InviteList
                item={item}
                onPress={() => onMultipleSelectInvitaion(index, item)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />}

          <View></View>
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
  sendInviteButton: {
    alignItems: 'center',
    backgroundColor: COLORS.REDCOLOR,
    width: '40%',
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  sendInviteText: {
    padding: 10,
    color: 'white',
    fontSize: FONT.SIZE.MEDIUM,
  },
});
