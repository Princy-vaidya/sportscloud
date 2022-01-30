import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from './../../Utils/constants';
import { TextInputComponent } from "../../Components/Common/InputText"
import Loader from "../../Components/Common/Loader"
import Toast from 'react-native-root-toast';
import Network from '../../Services/Network';
import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function ResetScreens(props) {
    const [loading, setLoading] = useState(false);

   
    const resetSubmit = (values) => {
        setLoading(true);
        const { params } = props.route;
        var obj = {
            "password": values.password,
            "id": params.userId
          }
        console.log("objectData====>", obj)  
        Network('api/reset-password', 'post', obj)
        .then((res) => {
            console.log("res success verify otp--->", res);
            if (res.response_code == 2000) {
                setLoading(false);
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
                            <Text style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "bold", letterSpacing: 2 }}>Reset Password</Text>
                        </View>

                        <View style={{ margin: 30, backgroundColor: "#595959", paddingTop: 50, borderRadius: 20 }}>
                            <Formik
                                initialValues={{ password: '',cnfPassword:'' }}
                                onSubmit={(values) => resetSubmit(values)}
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
                                            <View style={{ marginBottom:20,marginHorizontal: 30 }}>
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

                                            <View style={{ alignItems: "center", marginBottom: 50 }}>
                                                <TouchableOpacity
                                                    style={{ backgroundColor: "#EC3525", borderRadius: 25, width: WIDTH * 0.8, height: HEIGHT * 0.06, justifyContent: "center" }}
                                                    activeOpacity={0.7}
                                                    onPress={handleSubmit}
                                                >
                                                    <Text style={{ color: "#FFFFFF", fontSize: 20, textAlign: "center", fontWeight: "600" }}>Save</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    )}
                            </Formik>
                        </View>
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