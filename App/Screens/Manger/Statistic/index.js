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
  Pressable,
} from 'react-native';
import {COLORS, FONT, HEIGHT, WIDTH} from '../../../Utils/constants';
import {CommonPicker} from '../../../Components/Common/commonPicker';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  PracticeScreen,
  RosterBannerScreen,
} from '../../../Components/Home/practice';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from '../../../Redux/Actions/authAction';
import CalendarStrip from '../../../Components/Calendar/src/CalendarStrip';
import Network from '../../../Services/Network';
import Toast from 'react-native-root-toast';
import {Button, Menu, Divider, Provider} from 'react-native-paper';
import MenuView from '../../../Components/Common/Schedule/Menu';
import moment from 'moment';
import DetailsScreen from "../Schedule/ScheduleDetail/DetailsScreen"
import Stats from "../Statistic/Stats";
import Game from "../Statistic/Game";
import StatisticScreen from "../Schedule/ScheduleDetail/StatisticScreen";

export default function StatisticDetail(props) {
  const [sportsName, setSportsName] = useState('');
  const [sportsValue, setSportsData] = useState([]);
  const userdata = useSelector((state) => state.userdata);
  const [userMe, setUser] = React.useState(null);
  const dispatch = useDispatch();
  const [isvisible, setIsVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [toggle, setToggle] = useState(false);
  const [visible, setVisible]= useState(false);
  const [schedule, setSchedule] = useState([
    // {
    //   day: 'Wednessday,3 June',
    //   scheduleData: [
    //     {
    //       time1: '10AM',
    //       time2: '11AM',
    //       match: 'Pre Match',
    //       place: 'BookLynk ,NewYourk',
    //       visible:false
    //     },
    //     {
    //         time1: '12PM',
    //         time2: '1PM',
    //         match: 'Pre Match',
    //         place: 'BookLynk ,NewYourk',
    //         visible:false
    //       },
    //       {
    //         time1: '10AM',
    //         time2: '11AM',
    //         match: 'Pre Match',
    //         place: 'BookLynk ,NewYourk',
    //         visible:false
    //       },
    //   ],
    // },

    // {
    //     day: 'Friday,3 June',
    //     scheduleData: [
    //       {
    //         time1: '10AM',
    //         time2: '11AM',
    //         match: 'Pre Match',
    //         place: 'BookLynk ,NewYourk',
    //         visible:false
    //       },
    //       {
    //           time1: '12PM',
    //           time2: '1PM',
    //           match: 'Pre Match',
    //           place: 'BookLynk ,NewYourk',
    //           visible:false
    //         },
    //         {
    //           time1: '10AM',
    //           time2: '11AM',
    //           match: 'Pre Match',
    //           place: 'BookLynk ,NewYourk',
    //           visible:false
    //         },
    //     ],
    //   },
    //   {
    //     day: 'Friday,3 June',
    //     scheduleData: [
    //       {
    //         time1: '10AM',
    //         time2: '11AM',
    //         match: 'Pre Match',
    //         place: 'BookLynk ,NewYourk',
    //         visible:false
    //       },
    //       {
    //           time1: '12PM',
    //           time2: '1PM',
    //           match: 'Pre Match',
    //           place: 'BookLynk ,NewYourk',
    //           visible:false
    //         },
    //         {
    //           time1: '10AM',
    //           time2: '11AM',
    //           match: 'Pre Match',
    //           place: 'BookLynk ,NewYourk',
    //           visible:false
    //         },
    //     ],
    //   },
  ]);
  const [tabIndex, setTabIndex] = useState(0);
  
  const onChangeTab = index => {
    setTabIndex(index);
  };
  

  React.useEffect(() => {
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


 

  return (
    <>
      <Provider>
        <SafeAreaView style={{flex: 1, backgroundColor: '#2C2C2C'}}>
          <StatusBar
            backgroundColor={COLORS.APPCOLORS}
            barStyle="light-content"
          />
          <View
            style={styles.sectioncontainer}>
             <TouchableOpacity
            style={{flex: 0.6, flexDirection: 'row', alignItems: 'center'}}
            onPress={() => props.navigation.goBack()}>
            <Image
              source={require('../../../Assets/VectorIcon/back.png')}
              resizeMode="contain"
              style={{height: 10, width: 20,marginLeft:-10}}
            />

           <Text style={styles.subSectionContainer}>WednessDay,3 June</Text>
                    </TouchableOpacity>
            <View style={{flex: 0.5, alignItems: 'flex-start'}}>
              <CommonPicker
                    selected={sportsName}
                    placeholder={{}}
                    onChange={(sportsName) => setSportsName(sportsName)}
                    items={sportsArray}
                  />
            </View>
            
      
          </View>
          <View style={{flexDirection: 'row', marginTop: 0}}>
        <Pressable
          style={[tabIndex === 0 ? styles.activeTab : styles.inActiveTab,
        {borderLeftWidth:0}]}
          onPress={() => onChangeTab(0)}>
          <Text style={styles.tabText}>Game</Text>
        </Pressable>
        <Pressable
          style={[
            tabIndex === 1 ? styles.activeTab : styles.inActiveTab,
          ]}
          onPress={() => onChangeTab(1)}>
          <Text style={styles.tabText}>Player</Text>
        </Pressable>
        <Pressable
          style={[
            tabIndex === 2 ? styles.activeTab : styles.inActiveTab,
            {borderRightWidth: 0},
          ]}
          onPress={() => onChangeTab(2)}>
          <Text style={styles.tabText}>Stats</Text>
        </Pressable>
      </View>
      {tabIndex==0?
     <Game/>:
      tabIndex==1?
      <StatisticScreen/>
    :<Stats/>
    }
        </SafeAreaView>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: HEIGHT,
    // width: WIDTH,
  },
  normalWhiteText: {
    color: 'white',
    fontFamily: FONT.ROBOTO_Regular,
  },
  normalRedText: {
    color: COLORS.REDCOLOR,
    fontFamily: FONT.ROBOTO_Regular,
  },
  activeMenu: {
    backgroundColor: '#595959',
    height: 40,
    marginTop: -10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  inActiveTab: {
    flex: 0.5,
    borderBottomWidth: 1,
    borderColor:COLORS.GRAY ,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  activeTab: {
    flex: 0.5,
    // borderWidth: 1,
    // borderColor: COLORS.GRAY,
    // borderLeftWidth: 0,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    borderBottomColor:COLORS.REDCOLOR,
    borderBottomWidth: 4,
  },
  tabText:{
    color:'white',
    fontSize:16
  },
  sectioncontainer:{
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent:'space-between',
    backgroundColor: '#2C2C2C',
  },
  subSectionContainer:{
    color: "#FFFFFF", fontSize: 14, marginLeft: 20
  }
});
