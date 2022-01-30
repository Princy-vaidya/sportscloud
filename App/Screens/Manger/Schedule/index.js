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
import Loader from '../../../Components/Common/Loader';

export default function ScheduleScreens(props) {
  const [sportsName, setSportsName] = useState('');
  const [loading,setLoading]=useState(false);
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

  

  React.useEffect(() => {
    listTeam();
    scheduleList();
  }, []);

  const placeholderSports = {
    label: 'please select sports',
    value: 'sports',
  };
  const selectedDay = (val) => {
    console.log(val);
  };

  

  const openMenu = (item) => {
    const data=schedule;
   
    for(let i=0;i<data.length;i++){
       const scheduleList=data[i].scheduleData;
       scheduleList.forEach((ele) => {
         if (ele === item) {
             setToggle(!toggle)
           ele.visible = true;
         } else {
           ele.visible = false;
           setToggle(!toggle)
 
         }
       });
     }
 
     setSchedule(data);
     console.log('select',schedule)
 };


 const OnAddPress=()=>{
 return(
  <Menu
  visible={isvisible}
  onDismiss={()=>setIsVisible(false)}
  contentStyle={{borderRadius: 10}}
  >
    <View style={{backgroundColor:'white'}}>
  <Menu.Item
    onPress={() => props.navigation.navigate('NewGame') }
    style={styles.activeGreenMenu}
    titleStyle={{color: 'white'}}
    title="Going"
  />
  <Menu.Item
    onPress={() => props.navigation.navigate('NewGame') }
    style={styles.activeMenu}
    titleStyle={{color: 'white'}}
    title="May be"
  />
  </View>
</Menu>
 )
 }
 
 const closeMenu = (item) => {
    const data=schedule;
   
    for(let i=0;i<data.length;i++){
       const scheduleList=data[i].scheduleData;
       scheduleList.forEach((ele) => {
         if (ele === item) {
             setToggle(!toggle)
           ele.visible = false;
         } 
       });
     }
 
     setSchedule(data);
     console.log('select',schedule)
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


  const scheduleList = async () => {
    const user = await AsyncStorage.getItem('@user');
    const userData = JSON.parse(user);
    console.log('useerrererer', userData);
  
    if (userData) {
      let header = {
        authToken: userData.authtoken,
        // '60ae08acb199dc7f3b2f5948'
      };
      setLoading(true)
      Network('api/get-game-event-list?manager_id=' + userData._id + '&team_id=' + sportsName._id , 'get', header)
        .then(async (res) => {
          if (res.response_code == 2000) {
            console.log('schedule----', res.response_data);
            setLoading(false)
            let data=res.response_data.docs.map((item)=>
            {     console.log('schedule time----', );

              return{
                day:item.date?moment(item.date).format('dddd, MMMM D YYYY'):'NA',
                scheduleData: [
                  {
                    time1: item.time.startTime?item.time.startTime:'NA',
                    time2: item.time.endTime?item.time.endTime:'NA',
                    match: item.name?item.name:'NA',
                    place: item.location_details?item.location_details:'NA',
                    eventType: item.event_type?item.event_type:'NA',
                    location:item.location?item.location:'NA',
                    arrivalTime:item.arrival_time?item.arrival_time:'NA',
                    assignment:item.assignment?item.assignment:'NA',
                    day:item.date!==null?moment(item.date).format('YYYY-MM-DD'):'NA',
                    _id:item._id,
                    opponenet:item.opponent,
                    uniform:item.uniform,
                    homeaway:item.home_or_away,
                    notes:item.notes,
                    visible:false
                  },
                ]
              }
            }
           
            )

           
            
          setSchedule(data);
          console.log('schedule list----', data);

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
  const onChangeValue = (name)=>{
    setSportsName(name)
    scheduleList()
}

  const renderSubScheduleRow = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          borderBottomWidth:0.5,
          paddingBottom:10
        }}>
        <View>
          <Text style={styles.normalWhiteText}>{item.time1}</Text>
          <Text style={styles.normalWhiteText}>{item.time2}</Text>
        </View>
        <View style={{width:'50%'}}>
          <Text style={styles.normalRedText}>{item.match}</Text>
          <Text style={styles.normalWhiteText}>{item.place}</Text>
        </View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('EventDetail',{data:item})}>
          <Image
            source={require('../../../Assets/Home/edit.png')}
            style={{width: 15, height: 15, marginVertical: 10}}
          />
        </TouchableOpacity>

        <MenuView
          visible={item.visible}
          openMenu={()=>openMenu(item)}
          closeMenu={()=>closeMenu(item)}
          onValueSelected={(value) => {
            setSelectedValue(value);
          }}
        />
      </View>
    );
  };

  const renderScheduleRow = ({item, index}) => {
    return (
      <Pressable
        style={{
          backgroundColor: '#595959',
          marginHorizontal: 10,
          padding: 5,
          paddingBottom:0,
          borderRadius: 10,
          marginBottom: 10,
         
        }}
        onPress={()=>props.navigation.navigate('ScheduleDetail',{data:item.scheduleData})}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{color: 'white'}}>{(item.day).toUpperCase()}</Text>
          </View>
          {/* <View>
            <Text style={{color: 'white'}}>TODAY</Text>
          </View> */}
        </View>

        <FlatList
          style={{flex: 1}}
          data={item.scheduleData}
          renderItem={(item, index) => renderSubScheduleRow(item, index)}
        />
      </Pressable>
    );
  };

  return (
    <>
      <Provider>
        <SafeAreaView style={{flex: 1, backgroundColor: '#2C2C2C'}}>
        <Loader loading={loading} />
        <StatusBar
            backgroundColor={COLORS.APPCOLORS}
            barStyle="light-content"
          />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              paddingVertical: 10,
              justifyContent:'space-between',
              backgroundColor: '#2C2C2C',
            }}>
            <View style={{flex: 0.2, alignItems: 'flex-start'}}>
              <Text style={{color: '#FFFFFF', fontSize: 14}}>Schedule</Text>
            </View>
            <View style={{flex: 0.5, alignItems: 'flex-start'}}>
              <CommonPicker
                    selected={sportsName}
                    placeholder={{}}
                    onChange={(sportsName) => onChangeValue(sportsName)}
                    items={sportsArray}
                  />
            </View>
            <View style={{alignSelf:'flex-end'}}>
            <Menu
  visible={isvisible}
  onDismiss={()=>setIsVisible(false)}
  contentStyle={{borderRadius: 10,paddingBottom:2,backgroundColor:'#595959'}}
  anchor={
    <TouchableOpacity 
    style={{ alignItems: 'flex-end'}}
    onPress={()=>setIsVisible(true)}>
      <View
        style={{
          backgroundColor: '#595959',
          width: 30,
          height: 30,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Entypo name="plus" size={24} color="white" />
      </View>
    </TouchableOpacity>
  }
  >
    
  <Menu.Item
    onPress={() => props.navigation.navigate('NewGame') }
    style={styles.activeMenu}
    titleStyle={{color: 'white'}}
    title="New Game"
  />
  <Menu.Item
    onPress={() => props.navigation.navigate('NewEvent') }
    style={styles.activeMenu}
    titleStyle={{color: 'white'}}
    title="New Event"
  />
  
</Menu>
</View>       
          </View>

          <View
            style={{paddingHorizontal: 20, borderRadius: 10, marginBottom: 20}}>
            <CalendarStrip
              scrollable
              style={{height: 120, borderRadius: 10}}
              calendarColor={'#595959'}
              calendarHeaderStyle={{color: 'white', alignSelf: 'flex-start'}}
              render
              dateNumberStyle={{color: COLORS.TEXTCOLORS}}
              dateNameStyle={{color: COLORS.TEXTCOLORS}}
              iconContainer={{flex: 0.1}}
              highlightDateContainerStyle={{backgroundColor: COLORS.REDCOLOR}}
              highlightDateNameStyle={{color: 'white'}}
              highlightDateNumberStyle={{color: 'white'}}
            />
          </View>

          <ScrollView style={{height: HEIGHT * 0.57}}>
            <FlatList
              style={{flex: 1}}
              data={schedule}
              renderItem={(item, index) => renderScheduleRow(item, index)}
            />
          </ScrollView>
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
});
