import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from './../../Utils/constants';
import { TextInputComponent } from "../../Components/Common/InputText"
import Loader from "../../Components/Common/Loader"
import Toast from 'react-native-root-toast';
import { loginUser } from '../../Redux/Actions/authAction';
import { useDispatch } from 'react-redux';
import Network from '../../Services/Network';
import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function LoginScreens(props) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()



    const loginSubmit = async (values) => {
        setLoading(true);
        var obj = {
            "email": values.email,
            "password": values.password,
            "apptype": "IOS",
            "devicetoken": "123456"
        }
        console.log('login data========>', obj);
        Network('api/login', 'post', obj)
            .then(async (res) => {
                setLoading(false);
                if (res.response_code == 2000) {
                    Toast.show(res.response_message);
                    await AsyncStorage.setItem(
                        '@user',
                        JSON.stringify(res.response_data),
                    );
                    dispatch(loginUser(res.response_data))
                    //  props.navigation.replace('Splash')
                } else {
                    Toast.show(res.response_message);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    }

    const Validate = Yup.object().shape({
        email: Yup.string().trim()
            .email('Not a valid email')
            .required('Email is required!'),
        password: Yup.string().required('Password is required!'),
    });


    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'rgba(55, 55, 55, 0.95)' }}>
                <StatusBar backgroundColor={COLORS.APPCOLORS} barStyle="light-content" />
                <Loader loading={loading} />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ alignItems: "center", marginVertical: 40 }}>
                            <Image
                                source={require('../../Assets/LaunchScreen/Logo.png')}
                                resizeMode="contain" style={{ height: HEIGHT * 0.1, width: WIDTH * 0.6 }}
                            />
                        </View>

                        <View style={{ marginLeft: 25, marginBottom: 40 }}>
                            <Text style={{ color: COLORS.WHITE, fontWeight: "600", fontStyle: "normal", fontSize: 24, marginBottom: 2 }}>Hello There!</Text>
                            <Text style={{ color: COLORS.WHITE, fontWeight: "300", fontStyle: "normal", fontSize: 16 }}>Please enter your user Id and password</Text>
                        </View>
                        <Formik
                            initialValues={{ email: '', password: "" }}
                            onSubmit={(values) => loginSubmit(values)}
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
                                                title={"User Id"}
                                                imageWidth={20}
                                                imageHeight={15}
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
                                                leftImage={require('../../Assets/VectorIcon/lock.png')}
                                                rightImage={require('../../Assets/VectorIcon/eye.png')}
                                                title={"Password"}
                                                secureTextEntry={true}
                                                imageWidth={20}
                                                imageHeight={20}

                                            />
                                             {touched.password && errors.password && (
                                                    <Text style={styles.formError}>{errors.password}</Text>
                                                )}
                                        </View>

                                        <View style={{ alignItems: "center", marginBottom: 15 }}>
                                            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }} onPress={() => props.navigation.navigate("ForgotPass")}>Forgot Password?</Text>
                                        </View>


                                        <View style={{ alignItems: "center" }}>
                                            <TouchableOpacity
                                                style={{ backgroundColor: "#EC3525", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center", marginBottom: 25 }}
                                                activeOpacity={0.7}
                                                onPress={handleSubmit}
                                            >
                                                <Text style={{ color: "#FFFFFF", fontSize: 16, textAlign: "center", fontWeight: "600" }}>Login</Text>
                                            </TouchableOpacity>

                                            <View style={{ alignItems: "center", paddingBottom:20 }}>
                                                <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>New User ? <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "800" }} onPress={() => props.navigation.navigate("Signup")}>Register Now</Text></Text>
                                            </View>


                                            <TouchableOpacity
                                                style={{ backgroundColor: "#FFFFFF", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center", marginBottom: 25 }}
                                                activeOpacity={0.7}
                                            >
                                                <Text style={{ color: "#595959", fontSize: 16, textAlign: "center", fontWeight: "600" }}>Join New Team</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                        </Formik>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,
        // alignItems: 'center',
    },
    formError: {
        color: COLORS.SECONDARY,
        // fontFamily: FONT.FAMILY.ROBOTO_Regular,
        textAlign: 'center',
        marginTop:4,
        fontSize: 16,
    },

})


