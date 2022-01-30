import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  Switch,
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
import {
  NormalTextInput,
  PickerComponent,
  DatePickerComponent,
} from '../../../Components/Common/InputText';
import {CommonPicker} from '../../../Components/Common/commonPicker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Loader from '../../../Components/Common/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import moment from 'moment';
import Network from '../../../Services/Network';
import {TimePickerModal} from 'react-native-paper-dates';


export default function NewEvent(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dobValue, setDob] = useState('YYYY-MM-DD');
  const [sportsName, setSportsName] = useState('');
  const [sportsValue, setSportsData] = useState([]);
  const [tab, setTab] = useState('1');
  const [loading, setLoading] = useState(false);
  const [isEnabledManger, setIsEnabledManger] = useState(false);
  const [isStanding, setIsStanding] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isEnabledPlayer, setIsEnabledPlayer] = useState(false);
  const [timeZone, setTimeZone] = useState('');
  const [timeZoneArray, setTimeZoneArray] = useState([
    {lable: 'Chicago(GMT-5)', value: 'Chicago(GMT-5)'},
    {lable: 'Denver(GMT-6)', value: 'Denver(GMT-6)'},
    {lable: 'Phoenix(GMT-7)', value: 'Phoenix(GMT-7)'},
  ]);
  const [opponent, setOpponent] = useState('');
  const [opponentArray, setOppoenetArray] = useState([]);
  const [location, setLocation] = useState('');
  const [locationArray, setLocationArray] = useState([
    {lable: 'New York', value: 'New York'},
    {lable: 'Chicago', value: 'Chicago'},
    {lable: 'Washington', value: 'Washington'},
  ]);
  const [duration, setDuration] = useState('');
  const [durationArray, setDurationArray] = useState([
    {lable: '30 Min', value: '30 Min'},
    {lable: '60 Min', value: '60 Mino'},
    {lable: '90 Min', value: '90 Min'},
  ]);
  const [arrive, setArrive] = useState('');
  const [arriveArray, setArriveArray] = useState([
    {lable: '15 Min', value: '15 Min'},
    {lable: '30 Min', value: '30 Mino'},
  ]);
  const [flagcolor, setFlagColor] = useState('');
  const [flagcolorArray, setFlagColorArray] = useState([]);
  const [visibleStartTime, setVisibleStartTime] = useState(false);
  const [visibleEndTime, setVisibleEndTime] = useState(false);

  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');

  const toggleSwitchManger = () =>
    setIsEnabledManger((previousState) => !previousState);
  const toggleSwitchStanding = () =>
    setIsStanding((previousState) => !previousState);
  const toggleSwitchCanceled = () =>
    setIsCanceled((previousState) => !previousState);

  useEffect(() => {
    listTeam();
    getFlagList();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    setDob(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const changeTab = (tab) => {
    setTab(tab);
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
            setOppoenetArray(res.response_data);
          } else if (res.response_code == 4000) {
            Toast.show(res.response_message);
          }
        })
        .catch((error) => {
          console.log('error===>', error);
        });
    }
  };

  const getFlagList = async () => {
    const user = await AsyncStorage.getItem('@user');
    const userData = JSON.parse(user);
    console.log('useerrererer', userData);
    if (userData) {
      let header = {
        authToken: userData.authtoken,
      };
      Network('api/all-flag-list', 'get', header)
        .then(async (res) => {
          if (res.response_code == 2000) {
            console.log('hello----', res);
            setFlagColorArray(res.response_data);
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

  const timeZoneList = timeZoneArray.map((item) => {
    return {label: item.lable, value: item.value};
  });

  const opponentList = opponentArray.map((item) => {
    return {label: item.team_name, value: item};
  });

  const locationList = locationArray.map((item) => {
    return {label: item.lable, value: item.value};
  });

  const durationList = durationArray.map((item) => {
    return {label: item.lable, value: item.value};
  });

  const arriveList = arriveArray.map((item) => {
    return {label: item.lable, value: item.value};
  });

  const flagcolorList = flagcolorArray.map((item) => {
    return {label: item.name, value: item};
  });

  const onDismissStartTime = React.useCallback(() => {
    setVisibleStartTime(false);
  }, [setVisibleStartTime]);

  const onDismissEndTime = React.useCallback(() => {
    setVisibleEndTime(false);
  }, [setVisibleEndTime]);

  const onConfirmStartTime = React.useCallback(
    ({hours, minutes}) => {
      setVisibleStartTime(false);

      let TimeType = '';

      if (hours <= 11) {
        TimeType = 'AM';
      } else {
        TimeType = 'PM';
      }

      if (hours > 12) {
        hours = hours - 12;
      }
      if (hours == 0) {
        hours = 12;
      }

      const s = `${hours}:${minutes} ${TimeType}`;
      setStartTime(s);
    },
    [setVisibleStartTime],
  );

  const onConfirmEndTime = React.useCallback(
    ({hours, minutes}) => {
      setVisibleEndTime(false);

      let TimeType = '';

      if (hours <= 11) {
        TimeType = 'AM';
      } else {
        TimeType = 'PM';
      }

      if (hours > 12) {
        hours = hours - 12;
      }
      if (hours == 0) {
        hours = 12;
      }

      const s = `${hours}:${minutes} ${TimeType}`;
      setEndTime(s);
    },
    [setVisibleEndTime],
  );

  const Validate = Yup.object().shape({
    
    locationDetail: Yup.string().required('Location Detail is required!'),
    Assignments: Yup.string().required('Assignment is required!'),
    uniform: Yup.string().required('Uniform is required!'),
    note: Yup.string().required('Note is required!'),
  });

  const addNewGame = async (values) => {
    
    console.log('enter', values);
    const user = await AsyncStorage.getItem('@user');
    const userData = JSON.parse(user);
    setLoading(true);
    if (userData) {
      const obj = {
        name: sportsName,
        short_label: '',
        team_id: sportsName._id,
        opponent: opponent._id,
        manager_id: userData._id,
        event_type: 'EVENT',
        date: dobValue,
        time: {startTime: startTime, endTime: endTime},
        location: location,
        location_details: values.locationDetail,
        home_or_away: tab == '1' ? 'HOME' : 'AWAY',
        uniform: values.uniform,
        arrival_time: arrive,
        extra_label: tab == '1' ? 'HOME' : 'AWAY',
        notes: values.uniform,
        assignment: values.assignment,
        notify_team: true,
        display_icon: flagcolor._id,
        authToken: userData.authtoken
      };
      console.log('add team player', obj);
      Network('api/add-game-event', 'post', obj)
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

            <Text style={{color: '#FFFFFF', fontSize: 14, marginLeft: 20}}>
              New Event
            </Text>
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
        <View style={{marginTop: 30}}>
          <Formik
            initialValues={{
              uniform: '',
              note: '',
              locationDetail: '',
              Assignments: '',
            }}
            onSubmit={(values)=>addNewGame(values)}
            validationSchema={Validate}>
            {({
              values,
              handleChange,
              errors,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              touched,
            }) => (
              <>
                <ScrollView>
                  <>
                    <View
                      style={{
                        backgroundColor: '#595959',
                        marginHorizontal: 10,
                        borderRadius: 10,
                        padding: 15,
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 16,
                          marginBottom: 15,
                        }}>
                        Game Info
                      </Text>
                      <View style={{marginBottom: 20, marginHorizontal: 10}}>
                        <DatePickerComponent
                          titleName="Date"
                          visible={isDatePickerVisible}
                          confirm={handleConfirm}
                          cancel={hideDatePicker}
                          dob={dobValue}
                          changeField={(dobValue) => setDob(dobValue)}
                          // onBlur={() => setFieldTouched('dobValue')}
                          show={showDatePicker}
                        />
                        {/* {touched.dobValue && errors.dobValue && (
                                                    <Text style={styles.formError}>{errors.dobValue}</Text>
                                                )} */}
                      </View>

                      <Text style={styles.dropdownTitle}>Time Zone</Text>
                      <View style={styles.dropDownContainer}>
                        <CommonPicker
                          selected={timeZone}
                          placeholder={{}}
                          onChange={(timeZone) => setTimeZone(timeZone)}
                          items={timeZoneList}
                        />
                      </View>

                      <Text style={styles.dropdownTitle}>
                        Time (Leave blank for TBD)
                      </Text>

                      <View style={styles.dropDownContainer}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}>
                          <Text
                            style={[
                              {
                                fontSize: 14,
                                color: 'white',
                                textAlign: 'center',
                                margin: 8,
                              },
                            ]}
                            onPress={() => setVisibleStartTime(true)}>
                            {startTime}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setVisibleStartTime(true)}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: 'white',
                                textAlign: 'center',
                                margin: 8,
                              }}>
                              Start Time
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <TimePickerModal
                        visible={visibleStartTime}
                        onDismiss={onDismissStartTime}
                        onConfirm={onConfirmStartTime}
                        // hours={12} // default: current hours
                        // minutes={14} // default: current minutes
                        label="Select time" // optional, default 'Select time'
                        cancelLabel="Cancel" // optional, default: 'Cancel'
                        confirmLabel="Ok" // optional, default: 'Ok'
                        animationType="fade" // optional, default is 'none'
                        locale={'en'}
                        style={{color: 'red'}}
                      />

                      <View style={styles.dropDownContainer}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}>
                          <Text
                            style={[
                              {
                                fontSize: 14,
                                color: 'white',
                                textAlign: 'center',
                                margin: 8,
                              },
                            ]}
                            onPress={() => setVisibleEndTime(true)}>
                            {endTime}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setVisibleEndTime(true)}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: 'white',
                                textAlign: 'center',
                                margin: 8,
                              }}>
                              End Time
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <TimePickerModal
                        visible={visibleEndTime}
                        onDismiss={onDismissEndTime}
                        onConfirm={onConfirmEndTime}
                        // hours={12} // default: current hours
                        // minutes={14} // default: current minutes
                        label="Select time" // optional, default 'Select time'
                        cancelLabel="Cancel" // optional, default: 'Cancel'
                        confirmLabel="Ok" // optional, default: 'Ok'
                        animationType="fade" // optional, default is 'none'
                        locale={'en'}
                        style={{color: 'red'}}
                      />

                      <Text style={styles.dropdownTitle}>Oppoenent</Text>
                      <View style={styles.dropDownContainer}>
                        <CommonPicker
                          selected={opponent}
                          placeholder={{}}
                          onChange={(opponent) => setOpponent(opponent)}
                          items={opponentList}
                        />
                      </View>

                      <Text style={styles.dropdownTitle}>Location</Text>
                      <View style={styles.dropDownContainer}>
                        <CommonPicker
                          selected={location}
                          placeholder={{}}
                          onChange={(location) => setLocation(location)}
                          items={locationList}
                        />
                      </View>

                      <View style={{marginBottom: 20, marginHorizontal: 15}}>
                        <NormalTextInput
                          value={values.locationDetail}
                          onChangeText={handleChange('locationDetail')}
                          onBlur={() => setFieldTouched('locationDetail')}
                          placeholder="Enter Location Detail"
                          placeholderTextColor="#868686"
                          keyboardType={'default'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Location Detail'}
                        />
                        {touched.locationDetail && errors.locationDetail && (
                          <Text style={styles.formError}>
                            {errors.locationDetail}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View
                      style={{
                        backgroundColor: '#595959',
                        marginHorizontal: 10,
                        borderRadius: 10,
                        padding: 15,
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 16,
                          marginBottom: 15,
                        }}>
                        Volunteer Assignments
                      </Text>

                      <View style={{marginBottom: 20, marginHorizontal: 10}}>
                        <NormalTextInput
                          value={values.Assignments}
                          onChangeText={handleChange('Assignments')}
                          onBlur={() => setFieldTouched('Assignments')}
                          placeholder="Enter Assignments"
                          placeholderTextColor="#868686"
                          keyboardType={'default'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Assignments'}
                        />
                        {touched.Assignments && errors.Assignments && (
                          <Text style={styles.formError}>
                            {errors.Assignments}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View
                      style={{
                        backgroundColor: '#595959',
                        marginHorizontal: 10,
                        borderRadius: 10,
                        padding: 15,
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 16,
                          marginBottom: 15,
                        }}>
                        Game Details(Optional)
                      </Text>

                      <Text style={styles.dropdownTitle}>Duration</Text>
                      <View style={styles.dropDownContainer}>
                        <CommonPicker
                          selected={duration}
                          placeholder={{}}
                          onChange={(duration) => setTimeZone(duration)}
                          items={durationList}
                        />
                      </View>

                      <Text style={styles.dropdownTitle}>Arrive Early</Text>
                      <View style={styles.dropDownContainer}>
                        <CommonPicker
                          selected={arrive}
                          placeholder={{}}
                          onChange={(arrive) => setArrive(arrive)}
                          items={arriveList}
                        />
                      </View>

                      {/* <View style={{marginBottom: 20, marginHorizontal: 15}}>
                        <NormalTextInput
                          value={values.extralabel}
                          onChangeText={handleChange('extralabel')}
                          onBlur={() => setFieldTouched('extralabel')}
                          placeholder="Enter extra label"
                          placeholderTextColor="#868686"
                          keyboardType={'default'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Extra Lable'}
                        />
                        {touched.extralabel && errors.extralabel && (
                          <Text style={styles.formError}>{errors.extralabel}</Text>
                        )}
                      </View> */}

                      <Text style={styles.dropdownTitle}>Extra Label</Text>
                      <View style={{marginHorizontal: 10, marginTop: 15}}>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{marginRight: 10}}>
                            <TouchableOpacity
                              onPress={() => changeTab(1)}
                              activeOpacity={0.7}>
                              {tab == 1 ? (
                                <View
                                  style={{
                                    alignItems: 'center',
                                    marginBottom: 20,
                                  }}>
                                  <View
                                    style={{
                                      backgroundColor: '#FFFFFF',
                                      borderRadius: 5,
                                      alignItems: 'center',
                                      paddingVertical: 10,
                                      paddingHorizontal: 30,
                                      justifyContent: 'center',
                                      marginBottom: 4,
                                    }}>
                                    <Text>Home</Text>
                                  </View>
                                </View>
                              ) : (
                                <View
                                  style={{
                                    alignItems: 'center',
                                    marginBottom: 20,
                                  }}>
                                  <View
                                    style={{
                                      backgroundColor: '#414141',
                                      borderRadius: 5,
                                      alignItems: 'center',
                                      paddingVertical: 10,
                                      paddingHorizontal: 30,
                                      justifyContent: 'center',
                                      marginBottom: 4,
                                    }}>
                                    <Text style={{color: '#606060'}}>Home</Text>
                                  </View>
                                </View>
                              )}
                            </TouchableOpacity>
                          </View>
                          <View>
                            <TouchableOpacity
                              onPress={() => changeTab(2)}
                              activeOpacity={0.7}>
                              {tab == 2 ? (
                                <View
                                  style={{
                                    alignItems: 'center',
                                    marginBottom: 20,
                                  }}>
                                  <View
                                    style={{
                                      backgroundColor: '#FFFFFF',
                                      borderRadius: 5,
                                      alignItems: 'center',
                                      paddingVertical: 10,
                                      paddingHorizontal: 30,
                                      justifyContent: 'center',
                                      marginBottom: 4,
                                    }}>
                                    <Text>Away</Text>
                                  </View>
                                </View>
                              ) : (
                                <View
                                  style={{
                                    alignItems: 'center',
                                    marginBottom: 20,
                                  }}>
                                  <View
                                    style={{
                                      backgroundColor: '#414141',
                                      borderRadius: 5,
                                      alignItems: 'center',
                                      paddingVertical: 10,
                                      paddingHorizontal: 30,
                                      justifyContent: 'center',
                                      marginBottom: 4,
                                    }}>
                                    <Text style={{color: '#606060'}}>aWAY</Text>
                                  </View>
                                </View>
                              )}
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                      <View style={{marginBottom: 20, marginHorizontal: 15}}>
                        <NormalTextInput
                          value={values.uniform}
                          onChangeText={handleChange('uniform')}
                          onBlur={() => setFieldTouched('uniform')}
                          placeholder="Enter Uniform"
                          placeholderTextColor="#868686"
                          keyboardType={'default'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Uniform'}
                        />
                        {touched.uniform && errors.uniform && (
                          <Text style={styles.formError}>{errors.uniform}</Text>
                        )}
                      </View>

                      <Text style={styles.dropdownTitle}>Flag Color</Text>
                      <View style={styles.dropDownContainer}>
                        <CommonPicker
                          selected={flagcolor}
                          placeholder={{}}
                          onChange={(flagcolor) => setFlagColor(flagcolor)}
                          items={flagcolorList}
                        />
                      </View>

                      <View style={{marginBottom: 20, marginHorizontal: 15}}>
                        <NormalTextInput
                          value={values.note}
                          onChangeText={handleChange('note')}
                          onBlur={() => setFieldTouched('note')}
                          placeholder="Enter Note"
                          placeholderTextColor="#868686"
                          keyboardType={'default'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Note'}
                        />
                        {touched.note && errors.note && (
                          <Text style={styles.formError}>{errors.note}</Text>
                        )}
                      </View>
                    </View>

                    <View
                      style={{
                        backgroundColor: '#595959',
                        marginHorizontal: 10,
                        borderRadius: 10,
                        padding: 15,
                        marginBottom: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 10,
                        }}>
                        <Text style={{color: '#FFFFFF', fontSize: 16}}>
                          Track Availability
                        </Text>
                        <Switch
                          trackColor={{false: '#767577', true: '#ffffff'}}
                          thumbColor={isEnabledManger ? '#1FD83C' : '#AEAEAE'}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleSwitchManger}
                          value={isEnabledManger}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 10,
                        }}>
                        <Text style={{color: '#FFFFFF', fontSize: 16}}>
                          Not For Standings
                        </Text>
                        <Switch
                          trackColor={{false: '#767577', true: '#ffffff'}}
                          thumbColor={isStanding ? '#1FD83C' : '#AEAEAE'}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleSwitchStanding}
                          value={isStanding}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 10,
                        }}>
                        <Text style={{color: '#FFFFFF', fontSize: 16}}>
                          Canceled
                        </Text>
                        <Switch
                          trackColor={{false: '#767577', true: '#ffffff'}}
                          thumbColor={isCanceled ? '#1FD83C' : '#AEAEAE'}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleSwitchCanceled}
                          value={isCanceled}
                        />
                      </View>
                    </View>

                    <TouchableOpacity
                      style={{
                        backgroundColor: '#EC3525',
                        borderRadius: 25,
                        width: WIDTH * 0.8,
                        height: HEIGHT * 0.06,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 100,
                        alignSelf: 'center',
                      }}
                      activeOpacity={0.7}
                      onPress={handleSubmit}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 14,
                          textAlign: 'center',
                          fontWeight: '600',
                        }}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </>
                </ScrollView>
              </>
            )}
          </Formik>
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
  formError: {
    color: COLORS.SECONDARY,
    // fontFamily: FONT.FAMILY.ROBOTO_Regular,
    textAlign: 'center',
    marginTop: 4,
    fontSize: 14,
  },

  dropDownContainer: {
    //  flex: 0.5,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#4F4F4F',
    margin: 10,
  },

  dropdownTitle: {
    color: '#868686',
    fontSize: 16,
    width: '90%',
    alignSelf: 'center',
    marginBottom: -10,
  },
});
