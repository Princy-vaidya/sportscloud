import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from './../../Utils/constants';
import { TextInputComponent, PickerComponent } from "../../Components/Common/InputText"
import VerificationScreens from "../../Screens/AuthScreens/Verified"
import Loader from "../../Components/Common/Loader"
import Toast from 'react-native-root-toast';
import { loginUser } from '../../Redux/Actions/authAction';
import { useDispatch } from 'react-redux';
import Network from '../../Services/Network';
import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

const sportsType = [
    {
        label: 'Cricket',
        value: 'cricket',
    },
    {
        label: 'Football',
        value: 'football',
    },
];

const userType = [
    {
        label: 'player',
        value: 'player',
    },
    {
        label: 'manager',
        value: 'manager',
    },
];

const placeholderSports = {
    label: 'please select sports',
    value: 'sports',
};

const placeholderUserType = {
    label: 'please select usertype',
    value: 'sports',
};

export default function SignUpScreens(props) {

    const [sportsName, setSportsName] = useState("cricket");
    const [userValue, setUserType] = useState("player");
    const [emailID, setEmailId] = useState("");
    const [otp, setOtp] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSignUp = (values) => {
        setLoading(true);
        const obj = {
            "email": values.email,
            "password": values.password,
            "apptype": "IOS",
            "fname": values.fName,
            "lname": values.lName,
            "sports": sportsName,
            "Parent_name": values.parentName,
            "user_type": userValue,
            "team_name": values.teamName,
            "gender":"MALE"
          }
          console.log("ui8888888888",obj,emailID)
          Network('api/register', 'post', obj)
            .then(async (res) => {
                setLoading(false);
                // console.log("res success register--->", res);
                if (res.response_code == 2000) {
                    Toast.show(res.response_message)
                  generateOtp(values.email)
                  setModalVisible(true)
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

    const generateOtp  = (val) => {
        setEmailId(val)
        var obj = {
          "email":val,
          'otp_type': "email_verification"
        }
        console.log("generateOtp--->", obj);
        Network('api/generate-otp', 'post', obj)
          .then(async (res) => {
            console.log("res success verify otp--->", res);
            if (res.response_code == 2000) {
                Toast.show(res.response_message)
            } else {
                Toast.show(res.response_message)
            }
          })
          .catch((error) => {
            console.log("error===>", error)
          });
      }

     
      const handleVerify = () => {
        setLoading(true);
            var obj = {
                "email":emailID ? emailID :'',
                "otp": otp ? otp :'',
                "otp_type": "email_verification"
              }
            console.log("verifyotp",obj)
            Network('api/verify-otp', 'post', obj)
                .then((res) => {
                    console.log("res success verify otp--->", res);
                    if (res.response_code == 2000) {
                        setLoading(false);
                        setModalVisible(false)
                        props.navigation.navigate("Login")
                        Toast.show(res.response_message)
                    } else {
                        Toast.show(res.response_message)
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    Toast.show("Something went wrong !");
                });  
    }


    const Validate = Yup.object().shape({
        email: Yup.string()
            .email('Not a valid email')
            .required('Email is required!'),
        fName: Yup.string()
            .required('First name is required!'),
        lName: Yup.string()
            .required('Last name is required!'),
            teamName: Yup.string()
            .required('Team name is required!'),
            parentName: Yup.string()
            .required('Parent name is required!'),
        password: Yup.string().required('Password is required!'),
        cnfPassword: Yup.string().required('Confirm Password is required!'),
        cnfPassword: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });
    

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'rgba(55, 55, 55, 0.95)' }}>
                <StatusBar backgroundColor={COLORS.APPCOLORS} barStyle="light-content" />
                <Loader loading={loading} />
                <ScrollView>
                    <KeyboardAvoidingView
                        style={styles.container}
                        keyboardVerticalOffset={HEIGHT}
                        behavior="padding">
                        <View style={styles.container}>
                            <View style={{ alignItems: "center", marginVertical: 40 }}>
                                <Image
                                    source={require('../../Assets/LaunchScreen/Logo.png')}
                                    resizeMode="contain" style={{ height: HEIGHT * 0.1, width: WIDTH * 0.6 }}
                                />
                            </View>

                            <View style={{ marginLeft: 25, marginBottom: 40 }}>
                                <Text style={{ color: COLORS.WHITE, fontWeight: "600", fontStyle: "normal", fontSize: 26, marginBottom: 2 }}>Welcome!</Text>
                            </View>
                            <Formik
                                initialValues={{ email: '',fName: '',lName: '',parentName: '', teamName: '',password: '', confirmpassword: '' }}
                                onSubmit={(values) => handleSignUp(values)}
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
                                            <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
                                                <TextInputComponent
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
                                                    leftImage={require('../../Assets/VectorIcon/user.png')}
                                                    title={"First Name"}
                                                    imageWidth={22}
                                                    imageHeight={18}
                                                />
                                                {touched.fName && errors.fName && (
                                                    <Text style={styles.formError}>{errors.fName}</Text>
                                                )}
                                            </View>

                                            <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
                                                <TextInputComponent
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
                                                    leftImage={require('../../Assets/VectorIcon/user.png')}
                                                    title={"Last Name"}
                                                    imageWidth={20}
                                                    imageHeight={20}
                                                />
                                                {touched.lName && errors.lName && (
                                                    <Text style={styles.formError}>{errors.lName}</Text>
                                                )}
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
                                                    leftImage={require('../../Assets/VectorIcon/customer.png')}
                                                    title={"Team Name"}
                                                    imageWidth={20}
                                                    imageHeight={20}
                                                />
                                                {touched.teamName && errors.teamName && (
                                                    <Text style={styles.formError}>{errors.teamName}</Text>
                                                )}
                                            </View>

                                            <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
                                                <PickerComponent
                                                    selected={sportsName}
                                                    placeholder={placeholderSports}
                                                    onChange={(sportsName) => setSportsName(sportsName)}
                                                    items={sportsType}
                                                    leftImage={require('../../Assets/VectorIcon/sports.png')}
                                                    title={"Sports"}

                                                />
                                            </View>

                                            <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
                                                <PickerComponent
                                                    selected={userValue}
                                                    placeholder={placeholderUserType}
                                                    onChange={(userValue) => setUserType(userValue)}
                                                    items={userType}
                                                    leftImage={require('../../Assets/VectorIcon/user.png')}
                                                    title={"User Type"}

                                                />
                                            </View>


                                            <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
                                                <TextInputComponent
                                                 value={values.parentName}
                                                 onChangeText={handleChange('parentName')}
                                                 onBlur={() => setFieldTouched('parentName')}
                                                    placeholder="Enter Parent/Guardian Name"
                                                    placeholderTextColor="#868686"
                                                    keyboardType={'default'}
                                                    autoCorrect={false}
                                                    autoCompleteType='off'
                                                    editable={true}
                                                    autoCapitalize={'none'}
                                                    leftImage={require('../../Assets/VectorIcon/user.png')}
                                                    title={"Parent/Guardian Name"}
                                                    imageWidth={20}
                                                    imageHeight={20}
                                                />
                                                {touched.parentName && errors.parentName && (
                                                    <Text style={styles.formError}>{errors.parentName}</Text>
                                                )}
                                            </View>

                                            <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
                                                <TextInputComponent
                                                   value={values.email}
                                                    onChangeText={handleChange('email')}
                                                   onBlur={() => setFieldTouched('email')}
                                                    placeholder="Enter your email"
                                                    placeholderTextColor="#868686"
                                                    keyboardType={'default'}
                                                    autoCorrect={false}
                                                    autoCompleteType='off'
                                                    editable={true}
                                                    autoCapitalize={'none'}
                                                    leftImage={require('../../Assets/VectorIcon/email.png')}
                                                    title={"Email"}
                                                    imageWidth={20}
                                                    imageHeight={20}
                                                />
                                                {touched.email && errors.email && (
                                                    <Text style={styles.formError}>{errors.email}</Text>
                                                )}
                                            </View>

                                            <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
                                                <TextInputComponent
                                                 value={values.password}
                                                 onChangeText={handleChange('password')}
                                                 onBlur={() => setFieldTouched('password')}
                                                    placeholder="Enter your password"
                                                    placeholderTextColor="#868686"
                                                    keyboardType={'default'}
                                                    autoCorrect={false}
                                                    autoCompleteType='off'
                                                    editable={true}
                                                    autoCapitalize={'none'}
                                                    secureTextEntry={true}
                                                    rightImage={require('../../Assets/VectorIcon/eye.png')}
                                                    leftImage={require('../../Assets/VectorIcon/lock.png')}
                                                    title={"Password"}
                                                    imageWidth={20}
                                                    imageHeight={20}
                                                />
                                                {touched.password && errors.password && (
                                                    <Text style={styles.formError}>{errors.password}</Text>
                                                )}
                                            </View>

                                            <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
                                                <TextInputComponent
                                                   value={values.cnfPassword}
                                                   onChangeText={handleChange('cnfPassword')}
                                                   onBlur={() => setFieldTouched('cnfPassword')}
                                                    placeholder="Enter your password"
                                                    placeholderTextColor="#868686"
                                                    keyboardType={'default'}
                                                    autoCorrect={false}
                                                    autoCompleteType='off'
                                                    editable={true}
                                                    autoCapitalize={'none'}
                                                    leftImage={require('../../Assets/VectorIcon/lock.png')}
                                                    rightImage={require('../../Assets/VectorIcon/eye.png')}
                                                    title={"Confirm Password"}
                                                    secureTextEntry={true}
                                                    imageWidth={20}
                                                    imageHeight={20}
                                                />
                                                {touched.cnfPassword && errors.cnfPassword && (
                                                    <Text style={styles.formError}>{errors.cnfPassword}</Text>
                                                )}
                                            </View>


                                            <View style={{ alignItems: "center" }}>
                                                <TouchableOpacity
                                                    style={{ backgroundColor: "#EC3525", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center", marginBottom: 25 }}
                                                    activeOpacity={0.7}
                                                    onPress={handleSubmit}
                                                >
                                                    <Text style={{ color: "#FFFFFF", fontSize: 16, textAlign: "center", fontWeight: "600" }}>Create New Account</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ alignItems: "center", paddingBottom: 80 }}>
                                                <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>Already have an account ? <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "800" }} onPress={() => props.navigation.navigate("Login")}>SignIn</Text></Text>
                                            </View>
                                        </>
                                    )}
                            </Formik>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <VerificationScreens
                        modalVisible={modalVisible}
                        handleChange={(val) => setOtp(val)}
                        onRequestClose={() => setModalVisible(false)}
                        handleSubmit={() => handleVerify()}
                    />
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