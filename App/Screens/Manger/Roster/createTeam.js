import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../../Utils/constants';
import { TextInputComponent, PickerComponent } from "../../../Components/Common/InputText"
import { Formik } from 'formik';
import * as Yup from 'yup';
import Loader from "../../../Components/Common/Loader"
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import Network from "../../../Services/Network"
const Language = [
    {
        label: 'English',
        value: 'english',
    },
    {
        label: 'Hindi',
        value: 'hindi',
    },
];

const Country = [
    {
        label: 'India',
        value: 'india',
    },
    {
        label: 'Napal',
        value: 'napal',
    },
];

;

export default function CreateTeam(props) {
    const [language, setLanguage] = useState("english");
    const [country, setCountry] = useState("India");
    const [loading, setLoading] = useState(false);


   
    const placeholderLanguage = {
        label: 'Select Language',
        value: 'language',
    };

    const placeholderCountry = {
        label: 'select Country',
        value: 'country',
    }

    const handleCreateTeam = async(values) => {
        const user =   await AsyncStorage.getItem('@user')
        const userData = JSON.parse(user)
        setLoading(true);
        if (userData) {
        const obj = {
            "team_name": values.teamName,
            "team_manager_id": userData._id,
            "sports": values.sportsName,
            "time_zone": values.timeZone,
            "country": country,
            "zip": values.zipCode,
            "language": language,
            'authToken': userData.authtoken
          } 
          console.log("ui8888888888",obj,userData.authtoken)
          Network('api/create-team', 'post',obj)
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
        teamName: Yup.string()
            .required('Team name is required!'),
        sportsName: Yup.string()
            .required('sports name is required!'),
        timeZone: Yup.string()
            .required('Time zone is required!'),
            zipCode: Yup.string()
            .required('Zip code is required!'),
        parentName: Yup.string()
           
    });
    

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#414141' }}>
                <StatusBar backgroundColor={"#262626"} barStyle="light-content" />
                <Loader loading={loading} />
                <View style={{ marginTop: 30 }}>
                    <Formik
                        initialValues={{ teamName: '', sportsName: '', timeZone: '', zipCode: '' }}
                        onSubmit={(values) => handleCreateTeam(values)}
                        validationSchema={Validate}
                    >
                        {({
                            values,
                            handleChange,
                            errors,
                            handleSubmit,
                            setFieldTouched,
                            touched,
                        }) => (
                                <>
                                    <ScrollView>
                                        <>
                                            <View style={{ marginLeft: 25, marginBottom: 20 }}>
                                                <Text style={{ color: COLORS.WHITE, fontWeight: "600", fontStyle: "normal", fontSize: 18, marginBottom: 2 }}>Create a new team</Text>
                                            </View>

                                            <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
                                                <PickerComponent
                                                    selected={language}
                                                    placeholder={placeholderLanguage}
                                                    onChange={(language) => setLanguage(language)}
                                                    items={Language}
                                                    leftImage={require('../../../Assets/VectorIcon/sports.png')}
                                                    title={"Language"}

                                                />
                                            </View>

                                            <View style={{ marginBottom: 30, marginHorizontal: 30 }}>
                                                <TextInputComponent
                                                    value={values.teamName}
                                                    onChangeText={handleChange('teamName')}
                                                    onBlur={() => setFieldTouched('teamName')}
                                                    placeholder="Enter team name"
                                                    placeholderTextColor="#868686"
                                                    keyboardType={'default'}
                                                    autoCorrect={false}
                                                    autoCompleteType='off'
                                                    editable={true}
                                                    autoCapitalize={'none'}
                                                    leftImage={require('../../../Assets/VectorIcon/customer.png')}
                                                    title={"Team Name"}
                                                    imageWidth={20}
                                                    imageHeight={20}
                                                />
                                                  {touched.teamName && errors.teamName && (
                                                    <Text style={styles.formError}>{errors.teamName}</Text>
                                                )}
                                            </View>
                                            <View style={{ marginBottom: 30, marginHorizontal: 30 }}>
                                                <TextInputComponent
                                                    value={values.sportsName}
                                                    onChangeText={handleChange('sportsName')}
                                                    onBlur={() => setFieldTouched('sportsName')}
                                                    placeholder="Enter sports name"
                                                    placeholderTextColor="#868686"
                                                    keyboardType={'default'}
                                                    autoCorrect={false}
                                                    autoCompleteType='off'
                                                    editable={true}
                                                    autoCapitalize={'none'}
                                                    leftImage={require('../../../Assets/VectorIcon/customer.png')}
                                                    title={"Sports"}
                                                    imageWidth={20}
                                                    imageHeight={20}
                                                />
                                                 {touched.sportsName && errors.sportsName && (
                                                    <Text style={styles.formError}>{errors.sportsName}</Text>
                                                )}
                                            </View>
                                            <View style={{ marginBottom: 30, marginHorizontal: 30 }}>
                                                <TextInputComponent
                                                    value={values.timeZone}
                                                    onChangeText={handleChange('timeZone')}
                                                    onBlur={() => setFieldTouched('timeZone')}
                                                    placeholder="Enter time zone"
                                                    placeholderTextColor="#868686"
                                                    keyboardType={'default'}
                                                    autoCorrect={false}
                                                    autoCompleteType='off'
                                                    editable={true}
                                                    autoCapitalize={'none'}
                                                    leftImage={require('../../../Assets/VectorIcon/customer.png')}
                                                    title={"Time Zone"}
                                                    imageWidth={20}
                                                    imageHeight={20}
                                                />
                                                 {touched.timeZone && errors.timeZone && (
                                                    <Text style={styles.formError}>{errors.timeZone}</Text>
                                                )}
                                            </View>
                                            <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
                                                <PickerComponent
                                                    selected={country}
                                                    placeholder={placeholderCountry}
                                                    onChange={(country) => setCountry(country)}
                                                    items={Country}
                                                    leftImage={require('../../../Assets/VectorIcon/sports.png')}
                                                    title={"Country"}

                                                />
                                            </View>
                                            <View style={{ marginBottom: 30, marginHorizontal: 30 }}>
                                                <TextInputComponent
                                                    value={values.zipCode}
                                                    onChangeText={handleChange('zipCode')}
                                                    onBlur={() => setFieldTouched('zipCode')}
                                                    placeholder="Enter zip code"
                                                    placeholderTextColor="#868686"
                                                    keyboardType={'default'}
                                                    autoCorrect={false}
                                                    autoCompleteType='off'
                                                    editable={true}
                                                    autoCapitalize={'none'}
                                                    leftImage={require('../../../Assets/VectorIcon/customer.png')}
                                                    title={"Zip Code"}
                                                    imageWidth={20}
                                                    imageHeight={20}
                                                />
                                                {touched.zipCode && errors.zipCode && (
                                                    <Text style={styles.formError}>{errors.zipCode}</Text>
                                                )}
                                            </View>
                                            <TouchableOpacity
                                                style={{ backgroundColor: "#EC3525", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center", alignItems: "center", marginBottom: 30, alignSelf: "center" }}
                                                activeOpacity={0.7}
                                                onPress={handleSubmit}
                                            >
                                                <Text style={{ color: "#FFFFFF", fontSize: 14, textAlign: "center", fontWeight: "600" }}>Create Team</Text>
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
        marginTop:4,
        fontSize: 16,
    },

})