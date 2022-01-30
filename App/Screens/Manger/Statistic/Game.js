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
import StatisticScreen from "../Schedule/ScheduleDetail/StatisticScreen";

export default function Game(props) {
  const [sportsName, setSportsName] = useState('');
  const [sportsValue, setSportsData] = useState([{team_name:'Post Game'},{team_name:'Pre Game'}]);
  const userdata = useSelector((state) => state.userdata);
  const [userMe, setUser] = React.useState(null);
  const dispatch = useDispatch();
  const [isvisible, setIsVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [toggle, setToggle] = useState(false);
  const [visible, setVisible]= useState(false);
  const [game,setGame]=useState([
    {title:'Top 2 Point Shots Made',name1:'Achient Zoe',score1:'30',name2:'Asa West',score2:'30'},
    {title:'Top 2 Point Shots Percentage',name1:'Achient Zoe',score1:'30',name2:'Asa West',score2:'30'},
    {title:'Top 3 Point Shots Made',name1:'Achient Zoe',score1:'30',name2:'Asa West',score2:'30'},
    {title:'Top 3 Point Shots Percentage',name1:'Achient Zoe',score1:'30',name2:'Asa West',score2:'30'},
    {title:'Top Free Throws Made',name1:'Achient Zoe',score1:'30',name2:'Asa West',score2:'30'},
    {title:'Top Free Throws Percentage',name1:'Achient Zoe',score1:'30',name2:'Asa West',score2:'30'},
    {title:'Top Total Points',name1:'Achient Zoe',score1:'30',name2:'Asa West',score2:'30'},
    {title:'Top Offensive Rebounds',name1:'Achient Zoe',score1:'30',name2:'Asa West',score2:'30'},
    {title:'Top Defensive Rebounds',name1:'Achient Zoe',score1:'30',name2:'Asa West',score2:'30'},
  ]);
  const [tabIndex, setTabIndex] = useState(0);
  
  const onChangeTab = index => {
    setTabIndex(index);
  };
  

  React.useEffect(() => {
    // listTeam();
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
       
             
            <View style={{alignSelf:'flex-end',width:'50%',margin:15}}>
              <CommonPicker
                    selected={sportsName}
                    placeholder={{}}
                    onChange={(sportsName) => setSportsName(sportsName)}
                    items={sportsArray}
                  />
            </View>

            <FlatList
                                style={{}}
                                showsVerticalScrollIndicator={false}
                                data={game}
                                renderItem={({ item }) => {
                                    return (
                                      <View style={{width:"90%",alignSelf:'center',marginTop:10}}>
                                      <View>
                                        <Text style={styles.headingText}>{item.title}</Text>
                                      </View>
                          
                                      <ScrollView
                                      horizontal={true}
                                      style={[styles.horizontalContainer]}
                                      >
                                      <View style={[styles.boxContainer,{borderLeftWidth:0}]}>
                                 <Text style={[styles.normalText]}>{item.name1}</Text>
                                 <Text style={[styles.normalText,{marginHorizontal:10}]}>{item.score1}</Text>
                                      </View>
                                      <View style={styles.boxContainer}>
                                      <Text style={[styles.normalText,{marginLeft:10}]}>{item.name1}</Text>
                                      <Text style={[styles.normalText,{marginHorizontal:10}]}>{item.score2}</Text>
                          
                          </View>
                          <View style={styles.boxContainer}>
                          <Text style={[styles.normalText,{marginHorizontal:10}]}>-</Text>
                          
                          </View>
                          <View style={styles.boxContainer}>
                          <Text style={[styles.normalText,{marginHorizontal:10}]}>-</Text>
                          
                          </View>
                                      </ScrollView>
                                   </View>
                                    );
                                }}
                                keyExtractor={item => item.id}

                            />
          
         

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
 headingText:{
   color:COLORS.WHITE,
   fontSize:FONT.SIZE.MEDIUM,
   fontWeight:'400'
 } ,
 normalText:{
  color:COLORS.TEXTCOLORS,
  fontSize:FONT.SIZE.MEDIUM,
  fontWeight:'400'
} ,
boxContainer:{
  borderLeftWidth:1,
  flexDirection:'row',
  borderColor:COLORS.TEXTCOLORS
},
horizontalContainer:{
  flexDirection:'row',
  width:'100%',
  marginTop:10,
  borderBottomWidth:1,
  paddingBottom:10,
  borderColor:COLORS.TEXTCOLORS
}
});
