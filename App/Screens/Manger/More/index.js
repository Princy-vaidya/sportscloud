import React, { useState, useEffect } from 'react';
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
import { COLORS, FONT, HEIGHT, WIDTH } from '../../../Utils/constants';
import { CommonPicker } from '../../../Components/Common/commonPicker';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  PracticeScreen,
  RosterBannerScreen,
} from '../../../Components/Home/practice';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../Redux/Actions/authAction';
import MoreComponent from '../../../Components/More';
import Toast from 'react-native-root-toast';
import Network from '../../../Services/Network';


const more = [
  {
    id: '1',
    des: 'event',
    img: require('../../../Assets/VectorIcon/event.png'),
  },
  {
    id: '2',
    des: 'Settings',
    img: require('../../../Assets/VectorIcon/settings.png'),
  },
  {
    id: '3',
    des: 'Statistics',
    img: require('../../../Assets/VectorIcon/statics.png'),
  },
  {
    id: '4',
    des: 'Photos',
    img: require('../../../Assets/VectorIcon/photo.png'),
  },
  {
    id: '5',
    des: 'Files',
    img: require('../../../Assets/VectorIcon/file.png'),
  },
  {
    id: '6',
    des: 'Messages',
    img: require('../../../Assets/VectorIcon/chatting.png'),
  },
  {
    id: '7',
    des: 'Notifications',
    img: require('../../../Assets/VectorIcon/notification.png'),
  },
  {
    id: '8',
    des: 'Help & Support',
    img: require('../../../Assets/VectorIcon/notification.png'),
  },
  {
    id: '9',
    des: 'My Orders',
    img: require('../../../Assets/VectorIcon/orders.png'),
  },
  {
    id: '10',
    des: 'Team Store',
    img: require('../../../Assets/VectorIcon/store.png'),
  },
  {
    id: '11',
    des: 'About Evolution Athletics',
    img: require('../../../Assets/VectorIcon/about.png'),
  },
  {
    id: '12',
    des: 'Logout',
    img: require('../../../Assets/VectorIcon/logout.png'),
  },
];

export default function MoreScreens(props) {
  const [sportsName, setSportsName] = useState("");
  const [sportsValue, setSportsData] = useState([]);
  const userdata = useSelector((state) => state.userdata);
  const [userMe, setUser] = React.useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let user = userdata && userdata;
    console.log('user profiles data--->', user);
    setUser(user);
    listTeam()
  }, [userdata]);

  const handleLogout = async () => {
    const isSignin = await AsyncStorage.removeItem('@user');
    dispatch(logoutUser(isSignin));
  };

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

  const placeholderSports = {
    label: 'please select sports',
    value: 'sports',
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#2C2C2C' }}>
        <StatusBar
          backgroundColor={COLORS.APPCOLORS}
          barStyle="light-content"
        />

        <View style={{ flexDirection: "row", paddingHorizontal: 20, alignItems: "center", paddingVertical: 10, backgroundColor: "#2C2C2C" }}>
          <View style={{ flex: 0.2, alignItems: "flex-start" }}>
            <Text style={{ color: "#FFFFFF", fontSize: 14 }}>More</Text>
          </View>
          <View style={{ flex: 0.5, alignItems: "flex-start" }}>
            <CommonPicker
              selected={sportsName}
              placeholder={{}}
              onChange={(sportsName) => setSportsName(sportsName)}
              items={sportsArray}
            />
          </View>
          <View style={{ flex: 0.3, alignItems: "flex-end" }}>
            <View style={{ backgroundColor: "#595959", width: 30, height: 30, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
              <Entypo name="plus" size={24} color="white" />
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#414141', paddingTop: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 22,
              marginBottom: 10,
            }}>
            <Text style={{ color: 'white', fontSize: 14 }}>Record</Text>
            <Text style={{ color: 'white', fontSize: 14 }}>2-0</Text>
          </View>
          <ScrollView style={{ height: HEIGHT * 0.73, paddingVertical: 5,marginBottom:10 }}>
            <>
              <MoreComponent
                data={more}
                onClick={(val) => {
                  switch (val.id) {
                    case '1':
                       props.navigation.navigate("QrcodeScreens")
                      break;

                    case '2':
                      Toast.show("Work in Progess!")
                      break;
                    case '3':
                    props.navigation.navigate('statisticDetail')
                      break;
                    case '4':
                      props.navigation.navigate("teamPhoto")
                      break;
                    case '5':
                      props.navigation.navigate("teamFiles")
                      break;
                    case '6':
                      Toast.show("Work in Progess!")
                      break;
                    case '7':
                      Toast.show("Work in Progess!")
                      break;
                    case '8':
                      props.navigation.navigate("Help")
                      break;
                    case '9':
                      Toast.show("Work in Progess!")
                      break;
                    case '10':
                      props.navigation.navigate("teamStore")
                      break;
                      case '11':
                        Toast.show("Work in Progess!")
                        break;
                    case '12':
                      handleLogout()
                      break;
                    default:
                      Toast.show("Work in Progess!")

                  }
                }}
              />
            </>
          </ScrollView>
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
});
