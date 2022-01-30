import React, { useEffect, useState } from 'react';
import { Image, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector } from 'react-redux';
import { HEIGHT, COLORS, WIDTH, FONT } from './constants';
import SignupScreen from './../Screens/AuthScreens/signup';
import Splash from '../Screens/Splash/index';
import LaunchScreen from "../Screens/LaunchScreen/index"
import LoginScreen from "./../Screens/AuthScreens/Login";
import QrcodeScreens from "./../Screens/AuthScreens/Qrcode"
import { createStackNavigator } from '@react-navigation/stack';
import ForgetScreens from "./../Screens/AuthScreens/ForgotPassword";

// player 
import Home from "./../Screens/Player/Home";
import ResetScreens from "./../Screens/AuthScreens/Reset"
import Roster from "./../Screens/Player/Roster";
import Schedule from "./../Screens/Player/Schedule";
import More from './../Screens/Player/More';

// Manger
import TeamHome from "./../Screens/Manger/Home";
import TeamRoster from "./../Screens/Manger/Roster/index";
import AddRosterScreens from "./../Screens/Manger/Roster/AddRoster"
import CreateTeam from "../Screens/Manger/Roster/createTeam"
import AddManuallyPlayer from "../Screens/Manger/Roster/addManually"
import TeamSchedule from "./../Screens/Manger/Schedule";
import TeamMore from './../Screens/Manger/More';
import AlbumScreen from "../Screens/Manger/TeamPhotos/index";
import TeamFiles from "../Screens/Manger/TeamFiles/index";
import TeamPhotoScreens from "../Screens/Manger/TeamPhotos/teamphoto";
import StatisticDetail from '../Screens/Manger/Statistic/index';
import UploadPhotoScreen from "../Screens/Manger/TeamPhotos/uploadPhoto";
import UploadFiles from "../Screens/Manger/TeamFiles/uploadFiles";
import FilesDetail from "../Screens/Manger/TeamFiles/filesDetalis";
import TeamPhotoDetails from "../Screens/Manger/TeamPhotos/photoDetails";
import TeamStore from "../Screens/Manger/TeamStore/index"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewGameScreen from "../Screens/Manger/Schedule/NewGame";
import NewEventScreen from "../Screens/Manger/Schedule/NewEvent";
import EventDetailScreen from "../Screens/Manger/Schedule/EventDetail";
import InviteTeamScreen from "../Screens/Manger/Roster/InviteTeam";
import ContactScreen from "../Screens/Manger/Roster/ContactScreen";
import ScheduleDetail from "../Screens/Manger/Schedule/ScheduleDetail/ScheduleDetail";
import Help from "../Screens/Manger/Help&Support/index";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStackNav = createStackNavigator();  //.......This stack use for Home Tab navigation.....
const RosterStack = createStackNavigator();  //.........This stack use for Point Tab navigation....
const ScheduleStack = createStackNavigator();   //........This stack use for Team tab navigation......
const MoreStack = createStackNavigator();   //........This stack use for Team tab navigation......






export default Navigation = () => {

  const userdata = useSelector((state) => state.userdata);
  const [userMe, setUser] = useState(null);
  const [userType, setUserType] = useState("")

  useEffect(() => {
    let user = userdata && userdata._id ? true : false
    setUser(user);
    getLocalData()
  }, [userdata]);

 const  getLocalData = async()=>{
   const userValue =   await AsyncStorage.getItem('@user')
   const userLocal = JSON.parse(userValue)
   let userTy = userLocal && userLocal.user_type == 'player' ? true : false
   setUserType(userTy)
  }

  //player start .........
  // .............................Home stack navigation.............................

  const HomeTabStack = () => {
    return (
      <HomeStackNav.Navigator initialRouteName='Home'>
        <HomeStackNav.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </HomeStackNav.Navigator>
    )
  }

  // ..............................................................................

  const RosterTabStack = () => {
    return (
      <RosterStack.Navigator initialRouteName='RosterTab'>
        <RosterStack.Screen name='RosterTab' component={Roster} options={{ headerShown: false }} />
      </RosterStack.Navigator>
    )
  }

  // ..............................................................................

  const ScheduleTabStack = () => {
    return (
      <ScheduleStack.Navigator initialRouteName='Schedule'>
        <ScheduleStack.Screen name='ScheduleTab' component={Schedule} options={{ headerShown: false }} />
      </ScheduleStack.Navigator>
    )
  }

  // ..............................................................................


  const MoreTabScreen = () => {
    return (
      <MoreStack.Navigator initialRouteName='More'>
        <MoreStack.Screen name='MoreTab' component={More} options={{ headerShown: false }} />
      </MoreStack.Navigator>
    )
  }

  // ........................................................................

  const HomeStack = () => {
    return (
      <Tab.Navigator initialRouteName="HomeScreen"
        tabBarOptions={{
          style: {
            height: HEIGHT * 0.10,
            justifyContent: "center",
            backgroundColor: '#2C2C2C',
            paddingBottom: 5
          },
          labelStyle: {
            fontSize: 14,
          },
          activeTintColor: COLORS.ACTIVECOLORS,
          inactiveTintColor: COLORS.TEXTCOLORS
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home1') {
              iconName = focused
                ? require('./../Assets/BottomTab/redHome.png')
                : require('./../Assets/BottomTab/home.png');
            } else if (route.name === 'Roster') {
              iconName = focused
                ? require('./../Assets/BottomTab/redRoster.png')
                : require('./../Assets/BottomTab/roster.png');
            } else if (route.name === 'Schedule') {
              iconName = focused
                ? require('./../Assets/BottomTab/redSchedule.png')
                : require('./../Assets/BottomTab/Schedule.png');
            } else if (route.name === 'More') {
              iconName = focused
                ? require('./../Assets/BottomTab/redmore.png')
                : require('./../Assets/BottomTab/more.png');
            }
            // You can return any component that you like here!
            return (
              <>
                <Image source={iconName} style={{ width: 30, height: 30 }} resizeMode='contain' />
              </>
            );
          },
        })}
      >

        {/* ********************************************************* */}

        <Tab.Screen
          name="Home1"
          component={HomeTabStack}
          options={{
            tabBarLabel: 'Home',
            headerShown: false
          }}
        />

        {/* *******************************Points************************************* */}

        <Stack.Screen
          name="Roster"
          component={RosterTabStack}
          options={{
            tabBarLabel: 'Roster',
          }}
        />

        {/* *****************************Team *************************************** */}

        <Tab.Screen
          name="Schedule"
          component={ScheduleTabStack}
          options={{
            tabBarLabel: 'Schedule',
          }}
        />

        {/* *************************************************************************** */}

        <Tab.Screen
          name="More"
          component={MoreTabScreen}
          options={{
            tabBarLabel: 'More',
          }}
        />
      </Tab.Navigator>
    );
  };

   //player end .........

// Manger ....................

const TeamHomeTabStack = () => {
  return (
    <HomeStackNav.Navigator initialRouteName='Home'>
      <HomeStackNav.Screen name="Home" component={TeamHome} options={{ headerShown: false }} />
    </HomeStackNav.Navigator>
  )
}

// ..............................................................................

const TeamRosterTabStack = () => {
  return (
    <RosterStack.Navigator initialRouteName='Roster'>
        <RosterStack.Screen name='addRoster' component={AddRosterScreens} options={{ headerShown: false }} />
        <RosterStack.Screen name='InviteTeam' component={InviteTeamScreen} options={{ headerShown: false }} />
        <RosterStack.Screen name='Contacts' component={ContactScreen} options={{ headerShown: false }} />

      <RosterStack.Screen name='Roster' component={TeamRoster} options={{ headerShown: false }} />
      <MoreStack.Screen name='createTeam'  component={CreateTeam} 
       options={{
        headerShown: true,
        headerTitle: 'Create Team',
        headerStyle: {
          backgroundColor: "#2C2C2C",
        },
        headerTitleStyle: {
          color: COLORS.WHITE,
        },
        headerTintColor: COLORS.WHITE,
      }}
    />
       <MoreStack.Screen name='addManually'  component={AddManuallyPlayer} 
      options={{ headerShown: false }}
    />
    </RosterStack.Navigator>
  )
}

// ..............................................................................

const TeamScheduleTabStack = () => {
  return (
    <ScheduleStack.Navigator initialRouteName='Schedule'>
      <ScheduleStack.Screen name='ScheduleTab' component={TeamSchedule} options={{ headerShown: false }} />
      <ScheduleStack.Screen name='NewGame' component={NewGameScreen} options={{ headerShown: false }} />
      <ScheduleStack.Screen name='NewEvent' component={NewEventScreen} options={{ headerShown: false }} />
      <ScheduleStack.Screen name='EventDetail' component={EventDetailScreen} options={{ headerShown: false }} />
      <ScheduleStack.Screen name='ScheduleDetail' component={ScheduleDetail} options={{ headerShown: false }} />
    </ScheduleStack.Navigator>
  )
}

// ..............................................................................


const TeamMoreTabScreen = () => {
  return (
    <MoreStack.Navigator initialRouteName='More'>
      <MoreStack.Screen name='MoreTab' component={TeamMore} options={{ headerShown: false }} />
      <Stack.Screen 
        name="QrcodeScreens" 
        component={QrcodeScreens} 
        options={{
          headerShown: true,
          headerTitle: 'Event',
          headerStyle: {
            backgroundColor: "#2C2C2C",
          },
          headerTitleStyle: {
            color: COLORS.WHITE,
          },
          headerTintColor: COLORS.WHITE,
        }}
         />
      <MoreStack.Screen 
       name='teamPhoto' 
       component={AlbumScreen} 
       options={{ headerShown: false }} />
        <MoreStack.Screen name='TeamPhoto'  component={TeamPhotoScreens} options={{ headerShown: false }} />
        <MoreStack.Screen name='photoDetails'  component={TeamPhotoDetails} options={{ headerShown: false }} />
        {/* <MoreStack.Screen name='uploadPhoto'  component={UploadPhotoScreen} options={{ headerShown: false }} /> */}
       <MoreStack.Screen name='teamStore'  component={TeamStore} options={{ headerShown: false }} />
       <MoreStack.Screen name='teamFiles'  component={TeamFiles} options={{ headerShown: false }} />
       <MoreStack.Screen name='uploadFiles'  component={UploadFiles} options={{ headerShown: false }} />
       <MoreStack.Screen name='filesDetail'  component={FilesDetail} options={{ headerShown: false }} />


       <MoreStack.Screen name='Help'  component={Help} options={{
          headerShown: true,
          headerTitle: 'Help & Support',
          headerStyle: {
            backgroundColor: "#2C2C2C",
          },
          headerTitleStyle: {
            color: COLORS.WHITE,
          },
          headerTintColor: COLORS.WHITE,
        }} />
       <MoreStack.Screen name='statisticDetail'  component={StatisticDetail} options={{ headerShown: false }} />

    </MoreStack.Navigator>
  )
}

// ........................................................................

const TeamHomeStack = () => {
  return (
    <Tab.Navigator initialRouteName="HomeScreen"
      tabBarOptions={{
        style: {
          height: HEIGHT * 0.10,
          justifyContent: "center",
          backgroundColor: '#2C2C2C',
          paddingBottom: 5
        },
        labelStyle: {
          fontSize: 14,
        },
        activeTintColor: COLORS.ACTIVECOLORS,
        inactiveTintColor: COLORS.TEXTCOLORS
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home1') {
            iconName = focused
              ? require('./../Assets/BottomTab/redHome.png')
              : require('./../Assets/BottomTab/home.png');
          } else if (route.name === 'Roster') {
            iconName = focused
              ? require('./../Assets/BottomTab/redRoster.png')
              : require('./../Assets/BottomTab/roster.png');
          } else if (route.name === 'Schedule') {
            iconName = focused
              ? require('./../Assets/BottomTab/redSchedule.png')
              : require('./../Assets/BottomTab/Schedule.png');
          } else if (route.name === 'More') {
            iconName = focused
              ? require('./../Assets/BottomTab/redmore.png')
              : require('./../Assets/BottomTab/more.png');
          }
          // You can return any component that you like here!
          return (
            <>
              <Image source={iconName} style={{ width: 30, height: 30 }} resizeMode='contain' />
            </>
          );
        },
      })}
    >

      {/* ********************************************************* */}

      <Tab.Screen
        name="Home1"
        component={TeamHomeTabStack}
        options={{
          tabBarLabel: 'Home',
          headerShown: false
        }}
      />

      {/* *******************************Points************************************* */}

      <Stack.Screen
        name="Roster"
        component={TeamRosterTabStack}
        options={{
          tabBarLabel: 'Roster',
        }}
      />

      {/* *****************************Team *************************************** */}

      <Tab.Screen
        name="Schedule"
        component={TeamScheduleTabStack}
        options={{
          tabBarLabel: 'Schedule',
        }}
      />

      {/* *************************************************************************** */}

      <Tab.Screen
        name="More"
        component={TeamMoreTabScreen}
        options={{
          tabBarLabel: 'More',
        }}
      />
    </Tab.Navigator>
  );
};
// Manger end ................

  return (
    <>
      {userMe ? (
        <>
          {
            userType ?
              <>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Home"}>
                  <Stack.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
                  <Stack.Screen name="uploadPhoto" component={UploadPhotoScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
              </>
              :
              <>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Home"}>
                  <Stack.Screen name="Home" component={TeamHomeStack} options={{ headerShown: false }} />
                  <Stack.Screen name="uploadPhoto" component={UploadPhotoScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
              </>
          }

        </>
      ) : (
          <>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Splash"}>
              <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
              <Stack.Screen name="launchscreen" component={LaunchScreen} options={{ headerShown: false }} />
              <Stack.Screen name="QrcodeScreens" component={QrcodeScreens} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ForgotPass" component={ForgetScreens} options={{ headerShown: false }} />
              <Stack.Screen name="ResetPassword" component={ResetScreens} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </>
        )}
    </>
  );
};
