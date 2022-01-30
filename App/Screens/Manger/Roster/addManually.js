import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, Switch, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../../Utils/constants';
import { NormalTextInput, PickerComponent, DatePickerComponent } from "../../../Components/Common/InputText"
import { CommonPicker } from "../../../Components/Common/commonPicker"
import { Formik } from 'formik';
import * as Yup from 'yup';
import Loader from "../../../Components/Common/Loader"
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import moment from 'moment'
import Network from "../../../Services/Network"


export default function AddManuallyPlayer(props) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dobValue, setDob] = useState("YYYY-MM-DD");
    const [sportsName, setSportsName] = useState("");
    const [sportsValue, setSportsData] = useState([]);
    const [tab, setTab] = useState("1");
    const [loading, setLoading] = useState(false);
    const [isEnabledManger, setIsEnabledManger] = useState(false);
    const [isEnabledPlayer, setIsEnabledPlayer] = useState(false);
    const toggleSwitchManger = () => setIsEnabledManger(previousState => !previousState);
    const toggleSwitchPlayer = () => setIsEnabledPlayer(previousState => !previousState);

    useEffect(() => {
        listTeam()
    }, [])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDob(moment(date).format("YYYY-MM-DD"))
        hideDatePicker();
    };

    const changeTab = (tab) => {
        setTab(tab)
    }

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



    const handleAddManuallyPlayer = async (values) => {
        console.log("enter", values)
        const user = await AsyncStorage.getItem('@user')
        const userData = JSON.parse(user)
        setLoading(true);
        if (userData) {
            const obj = {
                "fname": values.fName,
                "lname": values.lName,
                "email": values.email,
                "phone": values.phoneNumber,
                "address": values.address,
                "city": values.city,
                "state": values.state,
                "zip": values.zipCode,
                'dob': dobValue,
                'gender': tab == '1' ? "MALE" : "FEMALE",
                'jersey_number': values.jerseyName,
                'position': values.position,
                'member_type': isEnabledPlayer == true ? "PLAYER" : "NON-PLAYER",
                "manager_access": isEnabledManger,
                "manager_id": userData._id,
                "team_id": sportsName._id,
                'authToken': userData.authtoken,
                "family_member":[]
            }
            console.log("add team player", obj)
            Network('api/add-player-roster', 'post', obj)
                .then(async (res) => {
                    setLoading(false);
                    console.log("response--->", res);
                    if (res.response_code == 2000) {
                        Toast.show(res.response_message)
                    } else {
                        setLoading(false);
                        Toast.show(res.response_message)
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    Toast.show("Something went wrong !");
                });
        }
    }

    const Validate = Yup.object().shape({
        fName: Yup.string()
            .required('First name is required!'),
        lName: Yup.string()
            .required('Last name is required!'),
        email: Yup.string()
            .email('Not a valid email')
            .required('Email is required!'),
        phoneNumber: Yup.string()
            .required('phone is required!'),
        address: Yup.string()
            .required('address is required!'),
        city: Yup.string()
            .required('City is required!'),
        state: Yup.string()
            .required('State is required!'),
        zipCode: Yup.string()
            .required('Zip code is required!'),
        // dobValue: Yup.string()
        //     .required('dob is required!'),
      
        jerseyName: Yup.string()
            .required('jersey name is required!'),
        position: Yup.string()
            .required('postion is required!'),

    });


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#414141' }}>
                <StatusBar backgroundColor={"#262626"} barStyle="light-content" />
                <Loader loading={loading} />
                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "#2C2C2C" }}>
                    <TouchableOpacity style={{ flex: 0.4, flexDirection: "row", alignItems: "center" }} onPress={() => props.navigation.goBack()}>
                        <Image
                            source={require('../../../Assets/VectorIcon/back.png')}
                            resizeMode="contain" style={{ height: 10, width: 20 }}
                        />

                        <Text style={{ color: "#FFFFFF", fontSize: 14, marginLeft: 20 }}>Add Player</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 0.5, alignItems: "flex-start" }}>
                        <CommonPicker
                            selected={sportsName}
                            placeholder={{}}
                            onChange={(sportsName) => setSportsName(sportsName)}
                            items={sportsArray}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Formik
                        initialValues={{ fName: '', lName: '', email: '', phoneNumber: '', address: '', city: '', state: '', zipCode: '', jerseyName: '', position: '' }}
                        onSubmit={(values)=>handleAddManuallyPlayer(values)}
                        validationSchema={Validate}
                    >
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
                                            <View style={{ backgroundColor: "#595959", marginHorizontal: 10, borderRadius: 10, padding: 15, marginBottom: 15 }}>
                                                <Text style={{ color: "#FFFFFF", fontSize: 16, marginBottom: 15 }}>Player Name</Text>
                                                <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                                    <NormalTextInput
                                                        value={values.fName}
                                                        onChangeText={handleChange('fName')}
                                                        onBlur={() => setFieldTouched('fName')}
                                                        placeholder="Enter first name"
                                                        placeholderTextColor="#868686"
                                                        keyboardType={'default'}
                                                        autoCorrect={false}
                                                        autoCompleteType='off'
                                                        editable={true}
                                                        autoCapitalize={'none'}
                                                        title={"First Name"}
                                                    />
                                                      {touched.fName && errors.fName && (
                                                    <Text style={styles.formError}>{errors.fName}</Text>
                                                )}
                                                </View>

                                                <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                                    <NormalTextInput
                                                        value={values.lName}
                                                        onChangeText={handleChange('lName')}
                                                        onBlur={() => setFieldTouched('lName')}
                                                        placeholder="Enter last name"
                                                        placeholderTextColor="#868686"
                                                        keyboardType={'default'}
                                                        autoCorrect={false}
                                                        autoCompleteType='off'
                                                        editable={true}
                                                        autoCapitalize={'none'}
                                                        title={"Last Name"}
                                                    />
                                                      {touched.lName && errors.lName && (
                                                    <Text style={styles.formError}>{errors.lName}</Text>
                                                )}
                                                </View>
                                            </View>


                                            <View style={{ backgroundColor: "#595959", marginHorizontal: 10, borderRadius: 10, padding: 15 }}>
                                                <Text style={{ color: "#FFFFFF", fontSize: 16, marginBottom: 15 }}>Contact Information</Text>
                                                <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                                    <NormalTextInput
                                                        value={values.email}
                                                        onChangeText={handleChange('email')}
                                                        onBlur={() => setFieldTouched('email')}
                                                        placeholder="Enter email address"
                                                        placeholderTextColor="#868686"
                                                        keyboardType={'default'}
                                                        autoCorrect={false}
                                                        autoCompleteType='off'
                                                        editable={true}
                                                        autoCapitalize={'none'}
                                                        title={"Email Address"}
                                                    />
                                                      {touched.email && errors.email && (
                                                    <Text style={styles.formError}>{errors.email}</Text>
                                                )}
                                                </View>

                                                <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                                    <NormalTextInput
                                                        value={values.phoneNumber}
                                                        onChangeText={handleChange('phoneNumber')}
                                                        onBlur={() => setFieldTouched('phoneNumber')}
                                                        placeholder="Enter phone number"
                                                        placeholderTextColor="#868686"
                                                        keyboardType={'default'}
                                                        autoCorrect={false}
                                                        autoCompleteType='off'
                                                        editable={true}
                                                        autoCapitalize={'none'}
                                                        title={"Phone Number"}
                                                    />
                                                      {touched.phoneNumber && errors.phoneNumber && (
                                                    <Text style={styles.formError}>{errors.phoneNumber}</Text>
                                                )}
                                                </View>

                                                <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                                    <NormalTextInput
                                                        value={values.address}
                                                        onChangeText={handleChange('address')}
                                                        onBlur={() => setFieldTouched('address')}
                                                        placeholder="Enter address"
                                                        placeholderTextColor="#868686"
                                                        keyboardType={'default'}
                                                        autoCorrect={false}
                                                        autoCompleteType='off'
                                                        editable={true}
                                                        autoCapitalize={'none'}
                                                        title={"Address"}
                                                    />
                                                      {touched.fName && errors.fName && (
                                                    <Text style={styles.formError}>{errors.fName}</Text>
                                                )}
                                                </View>
                                                <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                                    <NormalTextInput
                                                        value={values.city}
                                                        onChangeText={handleChange('city')}
                                                        onBlur={() => setFieldTouched('city')}
                                                        placeholder="Enter city"
                                                        placeholderTextColor="#868686"
                                                        keyboardType={'default'}
                                                        autoCorrect={false}
                                                        autoCompleteType='off'
                                                        editable={true}
                                                        autoCapitalize={'none'}
                                                        title={"City"}
                                                    />
                                                      {touched.city && errors.city && (
                                                    <Text style={styles.formError}>{errors.city}</Text>
                                                )}
                                                </View>
                                                <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                                    <NormalTextInput
                                                        value={values.state}
                                                        onChangeText={handleChange('state')}
                                                        onBlur={() => setFieldTouched('state')}
                                                        placeholder="Enter state"
                                                        placeholderTextColor="#868686"
                                                        keyboardType={'default'}
                                                        autoCorrect={false}
                                                        autoCompleteType='off'
                                                        editable={true}
                                                        autoCapitalize={'none'}
                                                        title={"State"}
                                                    />
                                                      {touched.state && errors.state && (
                                                    <Text style={styles.formError}>{errors.state}</Text>
                                                )}
                                                </View>
                                                <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                                    <NormalTextInput
                                                        value={values.zipCode}
                                                        onChangeText={handleChange('zipCode')}
                                                        onBlur={() => setFieldTouched('zipCode')}
                                                        placeholder="Enter zipcode"
                                                        placeholderTextColor="#868686"
                                                        keyboardType={'default'}
                                                        autoCorrect={false}
                                                        autoCompleteType='off'
                                                        editable={true}
                                                        autoCapitalize={'none'}
                                                        title={"Zip Code"}
                                                    />
                                                      {touched.zipCode && errors.zipCode && (
                                                    <Text style={styles.formError}>{errors.zipCode}</Text>
                                                )}
                                                </View>
                                            </View>

                                            <View style={{ backgroundColor: "#595959", marginHorizontal: 10, borderRadius: 10, padding: 15, marginBottom: 20 }}>
                                                <Text style={{ color: "#FFFFFF", fontSize: 16, marginBottom: 15 }}>Player Details</Text>
                                                <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                                    <DatePickerComponent
                                                        titleName="Birthday"
                                                        visible={isDatePickerVisible}
                                                        confirm={handleConfirm}
                                                        cancel={hideDatePicker}
                                                        dob={dobValue}
                                                        changeField={(dobValue)=>setDob(dobValue)}
                                                        // onBlur={() => setFieldTouched('dobValue')}
                                                        show={showDatePicker}
                                                    />
                                                      {/* {touched.dobValue && errors.dobValue && (
                                                    <Text style={styles.formError}>{errors.dobValue}</Text>
                                                )} */}
                                                </View>

                                                <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <View style={{ marginRight: 10 }}>
                                                            <TouchableOpacity
                                                                onPress={() => changeTab(1)}
                                                                activeOpacity={0.7}
                                                            >
                                                                {tab == 1 ?
                                                                    <View style={{ alignItems: 'center', marginBottom: 20, }}>
                                                                        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 5, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 30, justifyContent: 'center', marginBottom: 4 }}>
                                                                            <Text>Male</Text>
                                                                        </View>
                                                                    </View>
                                                                    :
                                                                    <View style={{ alignItems: 'center', marginBottom: 20, }}>
                                                                        <View style={{ backgroundColor: "#414141", borderRadius: 5, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 30, justifyContent: 'center', marginBottom: 4 }}>
                                                                            <Text style={{ color: "#606060" }}>Male</Text>
                                                                        </View>
                                                                    </View>
                                                                }
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View>
                                                            <TouchableOpacity
                                                                onPress={() => changeTab(2)}
                                                                activeOpacity={0.7}
                                                            >
                                                                {tab == 2 ?
                                                                    <View style={{ alignItems: 'center', marginBottom: 20, }}>
                                                                        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 5, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 30, justifyContent: 'center', marginBottom: 4 }}>
                                                                            <Text>Female</Text>
                                                                        </View>
                                                                    </View>
                                                                    :
                                                                    <View style={{ alignItems: 'center', marginBottom: 20, }}>
                                                                        <View style={{ backgroundColor: "#414141", borderRadius: 5, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 30, justifyContent: 'center', marginBottom: 4 }}>
                                                                            <Text style={{ color: "#606060" }}>Female</Text>
                                                                        </View>
                                                                    </View>
                                                                }
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>

                                                <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                                    <NormalTextInput
                                                        value={values.jerseyName}
                                                        onChangeText={handleChange('jerseyName')}
                                                        onBlur={() => setFieldTouched('jerseyName')}
                                                        placeholder="Enter Jersey number"
                                                        placeholderTextColor="#868686"
                                                        keyboardType={'default'}
                                                        autoCorrect={false}
                                                        autoCompleteType='off'
                                                        editable={true}
                                                        autoCapitalize={'none'}
                                                        title={"Jersey Name"}
                                                    />
                                                      {touched.jerseyName && errors.jerseyName && (
                                                    <Text style={styles.formError}>{errors.jerseyName}</Text>
                                                )}

                                                </View>
                                                <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                                    <NormalTextInput
                                                        value={values.position}
                                                        onChangeText={handleChange('position')}
                                                        onBlur={() => setFieldTouched('position')}
                                                        placeholder="Enter position"
                                                        placeholderTextColor="#868686"
                                                        keyboardType={'default'}
                                                        autoCorrect={false}
                                                        autoCompleteType='off'
                                                        editable={true}
                                                        autoCapitalize={'none'}
                                                        title={"Position(s)"}
                                                    />
                                                      {touched.position && errors.position && (
                                                    <Text style={styles.formError}>{errors.position}</Text>
                                                )}
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginBottom: 15 }}>
                                                    <View>
                                                        <Text style={{ color: "#FFFFFF", fontSize: 14 }}>Manger Access</Text>
                                                        <Text style={{ color: "#B7B7B7", fontSize: 12 }}>Grant member manger rights</Text>
                                                    </View>

                                                    <Switch
                                                        trackColor={{ false: "#767577", true: "#ffffff" }}
                                                        thumbColor={isEnabledManger ? "#1FD83C" : "#AEAEAE"}
                                                        ios_backgroundColor="#3e3e3e"
                                                        onValueChange={toggleSwitchManger}
                                                        value={isEnabledManger}
                                                    />
                                                </View>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                                                    <Text style={{ color: "#FFFFFF", fontSize: 14 }}>Non-Player</Text>
                                                    <Switch
                                                        trackColor={{ false: "#767577", true: "#ffffff" }}
                                                        thumbColor={isEnabledPlayer ? "#1FD83C" : "#AEAEAE"}
                                                        ios_backgroundColor="#3e3e3e"
                                                        onValueChange={toggleSwitchPlayer}
                                                        value={isEnabledPlayer}
                                                    />
                                                </View>

                                            </View>

                                            <TouchableOpacity
                                                style={{ backgroundColor: "#EC3525", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center", alignItems: "center", marginBottom: 100, alignSelf: "center" }}
                                                activeOpacity={0.7}
                                                onPress={handleSubmit}
                                            >
                                                <Text style={{ color: "#FFFFFF", fontSize: 14, textAlign: "center", fontWeight: "600" }}>Save</Text>
                                            </TouchableOpacity>
                                        </>
                                    </ScrollView>
                                </>
                            )}
                    </Formik>
                </View>
            </SafeAreaView>
        </>
    )
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
        fontSize: 16,
    },

})