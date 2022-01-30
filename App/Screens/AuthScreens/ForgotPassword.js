import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from './../../Utils/constants';
import { TextInputComponent } from "../../Components/Common/InputText"
import VerificationScreens from "../../Screens/AuthScreens/Verified"
import Loader from "../../Components/Common/Loader"
import Toast from 'react-native-root-toast';
import Network from '../../Services/Network';
import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';


export default function ForgetScreens(props) {
    const [emailID, setEmailId] = useState("");
    const [otp, setOtp] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);




    const generateOtp = async (values) => {
        setEmailId(values.email)
        var obj = {
            "email": values.email,
            'otp_type': "forgot_password"
        }
        console.log("generateOtp--->", obj);
      await  Network('api/generate-otp', 'post', obj)
            .then(async (res) => {
                console.log("res success verify otp--->", res);
                if (res.response_code == 2000) {
                    setModalVisible(true)
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
            "email": emailID ? emailID : '',
            "otp": otp ? otp : '',
            "otp_type": "forgot_password"
        }
        console.log("verifyotp", obj)
        Network('api/verify-otp', 'post', obj)
            .then((res) => {
                console.log("res success verify otp--->", res);
                if (res.response_code == 2000) {
                    setLoading(false);
                    setModalVisible(false)
                    props.navigation.navigate('ResetPassword', {
                        userId: res.response_data._id,
                        otp_type: "forgot_password"
                    })
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
            .email('Not a valid email !')
            .required('Email is required !'),
    });


    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'rgba(55, 55, 55, 0.95)' }}>
                <StatusBar backgroundColor={COLORS.APPCOLORS} barStyle="light-content" />
                <Loader loading={loading} />
                <ScrollView>

                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", marginVertical: 30 }}>
                            <TouchableOpacity
                                onPress={() => props.navigation.goBack()}
                            >
                                <Image

                                    source={require('../../Assets/VectorIcon/back.png')}
                                    resizeMode="contain" style={{ height: 20, width: 30, marginHorizontal: 30, marginTop: 15 }}
                                />
                            </TouchableOpacity>
                            <Image
                                source={require('../../Assets/LaunchScreen/Logo.png')}
                                resizeMode="contain" style={{ height: HEIGHT * 0.1, width: WIDTH * 0.6 }}
                            />
                        </View>

                        <View style={{ alignItems: "center", marginBottom: 15 }}>
                            <Text style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "bold", letterSpacing: 2 }}>Forgot Password</Text>
                        </View>
                        <Formik
                            initialValues={{ email: '' }}
                            onSubmit={(values) => generateOtp(values)}
                            validationSchema={Validate}>
                            {({
                                values,
                                handleChange,
                                errors,
                                handleSubmit,
                                setFieldTouched,
                                touched,
                            }) => (
                                    <>
                                        <View style={{ margin: 30, backgroundColor: "#595959", paddingTop: 50, borderRadius: 20 }}>
                                            <View style={{ marginBottom: 50, marginHorizontal: 30 }}>
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

                                            <View style={{ alignItems: "center", marginBottom: 50 }}>
                                                <TouchableOpacity
                                                    style={{ backgroundColor: "#EC3525", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center" }}
                                                    activeOpacity={0.7}
                                                    onPress={handleSubmit}
                                                >
                                                    <Text style={{ color: "#FFFFFF", fontSize: 20, textAlign: "center", fontWeight: "600" }}>Send</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </>
                                )}
                        </Formik>
                    </View>
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
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: "#373737"
        // alignItems: 'center',
    },
    formError: {
        color: COLORS.SECONDARY,
        // fontFamily: FONT.FAMILY.ROBOTO_Regular,
        textAlign: 'center',
        marginTop: 4,
        fontSize: 16,
    },

})

