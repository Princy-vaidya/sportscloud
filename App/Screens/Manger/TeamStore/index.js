import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, FlatList,Modal } from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH,IMAGE_URL } from '../../../Utils/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import { CommonPicker } from "../../../Components/Common/commonPicker"
import { MyordersComponent } from "../../../Components/TeamStore/index"
// import AddStoreModal from "../../../Components/TeamStore/AddStoreModal"
import Search from "../../../Components/Common/Search"
import Network from '../../../Services/Network';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    StoreTextInput,
    PickerComponent,
    DatePickerComponent,
  } from '../../../Components/Common/InputText';
  import {Formik} from 'formik';
  import * as Yup from 'yup';
  import * as ImagePicker from "react-native-image-picker";
  import {base_url} from "../../../Utils/constants";
  import axios from 'axios';
  import Loader from '../../../Components/Common/Loader';
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



export default function TeamStore(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [fileName, setFileName] = useState("");
    const [serchValue, setSearch] = useState("");
    const [sportsName, setSportsName] = useState("");
    const [sportsValue, setSportsData] = useState([]);
    const [shopData, setShopData] = useState([]);
    const [invalid, setInvalid] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);



    useEffect(()=>{
        listTeam()
    },[])

    const placeholderSports = {
        label: 'select sports',
        value: 'sports',
    };

    const listTeam = async() => {
        const user =   await AsyncStorage.getItem('@user')
        const userData = JSON.parse(user)
        console.log("useerrererer",userData)
        if (userData) {
            let header = {
                'authToken': userData.authtoken
            }
          Network('api/my-team-list?team_manager_id=' + userData._id ,'get', header)
                .then(async (res) => {
                    if (res.response_code == 2000) {
                        console.log("hello----",res)
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

      const onChangeValue = (name)=>{
        setSportsName(name)
        teamShopData()
    }

    const onAddPhoto = async () => {
       
        ImagePicker.launchImageLibrary(
            {
              mediaType: "photo",
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
             setProfileImage(response.uri);
             console.log('profile',profileImage)
             setProfile(response);
             setModalVisible(true)
            }
          );
      };

 
      const onAddTeamStore=async(values)=>{
      

      if(profileImage===""){
          alert( 'please select Image')
      }else{
    const user = await AsyncStorage.getItem('@user');
    const userData = JSON.parse(user);
    setLoading(true);
    // if (userData) {
        let formdata = new FormData();
        formdata.append("image", {
            uri:
            Platform.OS === "android"
              ? profile.uri
              : profile.uri.replace("file://", ""),
          name: profile.fileName,
          type: profile.type,
        });
        formdata.append("team_id", sportsName._id);
        formdata.append("manager_id", userData._id);
        formdata.append("name", values.name);
        formdata.append("jersey_number", values.jersyNumber);
        formdata.append("description", values.description);
        formdata.append("price", values.price);
        formdata.append("brand", values.brand);
        formdata.append("color", values.color);
        formdata.append("material", values.material);
        formdata.append("size", values.size);       
      
     console.log('formdata',formdata)
     console.log(base_url + 'api/add-store-image',userData.authtoken)

    axios({
        method: "POST",
        url:`${base_url}api/add-store-image`,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userData.authtoken,
        },
        data: formdata,
      })
        .then((res) => {
            setLoading(false);
            console.log('response--->', res.data.response_message);
            if (res.data.response_code == 2000) {
              Toast.show(res.data.response_message);
              teamShopData()
               setModalVisible(false)
            } else {
              setLoading(false);
              Toast.show(res.data.response_message);
            }
          })
          .catch((error) => {
            setLoading(false);
            Toast.show('Something went wrong !');
          });
       
       setProfileImage('')
    }
    }
      
  


    const Validate = Yup.object().shape({
    
        name: Yup.string().required('Name is required!'),
        jersyNumber: Yup.string().required('Jersy Number is required!'),
        description: Yup.string().required('Description is required!'),
        price: Yup.string().required('Price is required!'),
        brand: Yup.string().required('Brand is required!'),
        color:Yup.string().required('Color is required!'),
        material:Yup.string().required('Material is required!'),
        size:Yup.string().required('Size is required!')
      });

        const teamShopData = async()=> {
        const user =   await AsyncStorage.getItem('@user')
        const userData = JSON.parse(user)
        console.log("useerrererer",userData)
        if (userData) {
            let header = {
                'authToken': userData.authtoken
            } 
           Network('api/team-store-product-list?manager_id=' + userData._id + '&team_id=' + sportsName._id, 'get', header)
           .then(async (res) => {
            if (res.response_code == 2000) {
                console.log("sportdata----",JSON.stringify(res))
                if(res.response_data.docs.length===0){
                   setInvalid(true)
                }else{
                setShopData(res.response_data.docs)
                setInvalid(false)
                }
            } else if (res.response_code == 4000) {
                Toast.show(res.response_message)
            }
        })
        .catch((error) => {
            console.log("error===>", error)
        });
}
       }

     const  emptyProductComponent = () => {
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 35 }}>
            <Text style={{ textAlign: 'center', color: 'gray',fontSize: 18 }}>No Products Found !</Text>
          </View>
        );
      }
      
    return (
        <>
            <SafeAreaView style={{ height: HEIGHT, backgroundColor: '#414141' }}>
                <StatusBar backgroundColor={"#262626"} barStyle="light-content" />
                <Loader loading={loading} />

                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "#2C2C2C" }}>
                    <TouchableOpacity style={{ flex: 0.4, flexDirection: "row", alignItems: "center" }} onPress={() => props.navigation.goBack()}>
                        <Image
                            source={require('../../../Assets/VectorIcon/back.png')}
                            resizeMode="contain" style={{ height: 10, width: 20 }}
                        />

                        <Text style={{ color: "#FFFFFF", fontSize: 14, marginLeft: 20 }}>Team Store</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 0.4, alignItems: "flex-start" }}>
                        <CommonPicker
                            selected={sportsName}
                            placeholder={{}}
                            onChange={(sportsName)=>onChangeValue(sportsName)}
                            items={sportsArray}
                        />
                    </View>

                    <View style={{ flex: 0.2, alignItems: "flex-end", position: "absolute", right: 15 }}>
                        <View style={{ backgroundColor: "#595959", width: 30, height: 30, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                            <Entypo name="plus" size={24} color="white" onPress={() => setModalVisible(true)} />
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                    {/* <AddStoreModal /> */}


                    <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={{ width: WIDTH * 0.86, flexDirection: 'row', justifyContent: 'flex-end', padding: 15 }} onPress={() =>setModalVisible(false)}>
                                <AntDesign name="close" size={30} color={COLORS.HEADERCOLOR} />
                            </TouchableOpacity>
    
                            
                         
                            <ScrollView 
                            showsVerticalScrollIndicator={false}
                            style={{}}>
                                
                                    
                                    <Formik
            initialValues={{
              name: '',
              jersyNumber: '',
              description: '',
              price: '',
              brand: '',
              color:'',
              material:'',
              size:''
            }}
         onSubmit={(values)=>onAddTeamStore(values)}
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
              
                  <>
                    <View
                      style={{
                        // backgroundColor: '#595959',
                        // marginHorizontal: 10,
                        // borderRadius: 10,
                        // padding: 15,
                        // marginBottom: 10,
                      }}>
                      
                      <KeyboardAwareScrollView >

                     
                      <View style={{ alignItems: "center" ,marginTop:10,borderWidth:1,borderRadius:10,width:'50%',alignSelf:'center'}}>
                        {profileImage===""?<Image
                            source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO8AAADTCAMAAABeFrRdAAAAh1BMVEUAAAD///8sLCyioqITExP39/f7+/vj4+Pb29vq6urz8/PX19fo6Oimpqa7u7vMzMxFRUW0tLRfX1/IyMh3d3fBwcGKioptbW3Ly8usrKx9fX3S0tK3t7c3NzdVVVWRkZFOTk5nZ2coKCiampqDg4MbGxs6OjoyMjKPj48MDAwXFxchISFJSUktjjbDAAAIIElEQVR4nO2cbVvqMAyGO468CgqIIigKCqIH/v/vOwcGY23S9HVQvPJ8hLHlpl2bpklFdj7Vm8+D3tNoPNx+rWu1WX++GE0/J3e33TPaIM7ylM59b9QXeq2G34PWWSypnrfVW/wlUEvqP921q7amWt7mZGiHWuhj+liv0qIKeV+ePhxhD9r2qnujK+Od3vjB5pp9VmRWZbxPIbhCLCoyq7r+HMZb1WhdHe8gBLdflVUVjlfrAN7HqoyKydseS9PnrT/upnyf7jjirByPtz0WYiR9MvLmfS3fZinEONoEFYu3vtwbKtnV8OaFd4nVxpF4Pw+GDqVPfYesSfkmk8OH0yh+VxTeu5Opt9IXb164N9I9NsXnMXyQCLzNbcnWmfRV24t3UL7FY/mPuAs2Npx3KRsrDTVFZ3SRNDhnX9J382agtaG8Dz+qufL3Hj1amntf1G+fwuwN460voLmyQR1n3K30+zn4/u9ziMVBvHfAmJ3kLveIXkNI8pxRn2Xc8Dc5gLeBNC5soGzqhiu7LHP8ogdvo/15wZtVaCBf6OZHS22ndUnlf8VB3rzU+lb2DJxeYfm/mmuv+5En+qp5O19aS4TqZRE9AehN+uE9den7GXkfDGYrfsEfa96O9LsZee2XfHGFvO+OdluvlOTejA//JXkMWz68Fj7Em/tPBAhaAVcG6PsMvO2Vjek95VfU7sJRK/kn5l703790nYqdeckxpCTV0aXfxb3kRb3lWsMxsOfKa70A2Cg/bBiBlbfRdmfiNXORI+/S/PyjxupvDV16Il9t74c6rSDceDUeJC71FaZb7I98rUssaKg+KBbv1vzssoALRPhkCm42dnnQ2j7U48Bbr7nhglmY6KQD2ws1sg4D2PN2zNOhqhq8Cf4Sqz2h7vyol9i8XWcTBHQ7MnSAX4BJ1Ga2VmQZ2rLlbfrgouu2huJH1GC84tvnUeoIEMTb8sPVTBaT08A3RHxg55BILivn0o7XG1cXNK4/9JbTZe8ecwc9u5IQ01i8AbjuUXL3CF+hRRxe7z88l9vCvOGZ9LGX2fOw4A3EtetnhcjAiVHIhODK67cnImlhTdsIw/2/QAzl9XAzoGaWoZeOswvnCmzibWzMj7CRlf8T/ObsRAObeEP7VyGL2fE1zpNIYAPvPI4JO61NPr3TkogSNWjRvNFM2GtJPeo54oOIaYnktYmYOUnr43Zd80ppgdiKFW9QxphG79hI3YrbjwTRlQheh20QFw0HMnJ7Em1MLEnn1Ol5I/gZOq2nvedWu91uPfdG4TMuLhA9M/GG+LEpCA8AaHn9UolSEuri6HgD05eTEDbha3iNW3NXIWQuwHmjOLKXF4yPaniDag8S0haQobxxnZ0LCm48YLz26QeJa23VnwPy0tMSgovw+mdpJ6YaFuyFvNfvaORCcSFv79J2RtIHntmh8v6SmVd8aLaEFd7GL5l5N7odcLV9o4c0LqKVNv4L3t9mSFlYIvoLcIvmRubfT/MN09YNwP0upmLMv+pa5IalLID7ftrDwtcLV+1RAtx9h32leLO2RwZFIsJxj6t/bTznWv0OgHvsqxuaN2s7ZpelIVBWeXo1xzSvX3HYhQVwy910YuDN2vNL2e0pEnf/Ch95NeW119XEoCpaMX9z4r3p48SdK1oemnB36W8H3t2Yrdm8q2LXrBKBcDPSOR9z3nyvqI9XyXeuI3wHcLGGest5j51Wkxt2DdF3K9x53p9P5VMzPOmgnnwTA7uxZJDhYbwqV9hoNk49czjPJYCLdcmdw7HjlVcHNbyJddWvSQgU5WC4+yWSQJLJNU1sKhq8nAAu1hvzzGSBFfd94EVMjehpFnEE6kIw3MNQLPCIpKamB55OkIAALtYRj+kNQhNf3+D1xA3/M3GqEtjGx3CL+heh3S3SpPTcJxaxBbhY4topl0PoV7krTY6n4wEE1eoetAdyUalGQrSIPBxNovaLVUXsWQRwsaSxcrsJsvrlB9wvl0PZZKUCpTwYrjTZ7PyNFpHzpTn44TZSWrSfaoeVD6jlwXBl9ylfL1C7KJoi+V3C0qXe5Ju8g1nhKsv6w/qX2kXRHN/SEg+Xin7c7DOVwZl+yFQDdlaK+BW1i6I7LfBSYfndgWB9kC+I4MJd0VO8rkukqS7w7cVL8iL9DWgGe2Y5PkmZj2ZfpsSL4GKHdkrx2C6xizJEmjghXgQXLWNQ4s/ULgo8CCEdXmTRgxcxqPF2KsT+pg52yfAiuJoSBri/QE0ySpl9KrwIrq5mEdlP6cz1T5pLTZwIL4KrPZMD3T+iQuzlY0HS4EVOFtDXHOP7ZdQuSmnjJQleBFdTq6HnpZu4AE6BFykHVw/zsOElQuynJVMKvLDmjzwrm9j/1e2inK5Iglc9/5A+jpPa78ZOD5XulwavXBhmKDSm60ORQO6i9HUavJKVpuO/DPW/MMRedqMT4S0VSxnPDTLW7ytNLI19qfAWVejmQ8/N5zNITSwvsZLhzSclfVasC68UsJdfj2R4972wZnPql935OcddFMULT4c3m4ovq6MZLc9HOkT+lH8wId5sYQdifd7XLvaqZvCkxGsp+/PcXn7Atb+aN8vAFukv5wViXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXua9Ft7JqnYRzfxN/gehx437OTz88gAAAABJRU5ErkJggg=='}}
                            resizeMode="contain"
                            style={{ height: 120, width:120, borderRadius: 10, }}
                        />:
                        <Image
                        source={{uri:profileImage}}
                        resizeMode="contain"
                        style={{ height: 120, width:120, borderRadius: 10, }}
                    />
                        }
                        <TouchableOpacity style={{backgroundColor:'#595959',width:'100%',borderBottomLeftRadius:10,borderBottomRightRadius:10}}
                        onPress={()=>onAddPhoto()}>
                            <Text style={{paddingHorizontal:35,padding:5,textAlignVertical:'center',color:'white'}}>Add Photo</Text>
                        </TouchableOpacity>
                    </View>
                      <View style={{margin:10,marginTop:15}}>
                        <StoreTextInput
                          value={values.name}
                          onChangeText={handleChange('name')}
                          onBlur={() => setFieldTouched('name')}
                          placeholder="Enter Name"
                          placeholderTextColor={COLORS.TEXTCOLORS}
                          keyboardType={'default'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Name'}
                        />
                        {touched.name && errors.name && (
                          <Text style={styles.formError}>
                            {errors.name}
                          </Text>
                        )}
                      </View>
                      <View style={{margin:10,marginTop:15}}>
                        <StoreTextInput
                          value={values.jersyNumber}
                          onChangeText={handleChange('jersyNumber')}
                          onBlur={() => setFieldTouched('jersyNumber')}
                          placeholder="Enter Jersy Number"
                          placeholderTextColor={COLORS.TEXTCOLORS}
                          keyboardType={'numeric'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Jersy Number'}
                        />
                        {touched.jersyNumber && errors.jersyNumber && (
                          <Text style={styles.formError}>
                            {errors.jersyNumber}
                          </Text>
                        )}
                      </View>

                      <View style={{margin:10,marginTop:15}}>
                        <StoreTextInput
                          value={values.description}
                          onChangeText={handleChange('description')}
                          onBlur={() => setFieldTouched('description')}
                          placeholder="Enter Description"
                          placeholderTextColor={COLORS.TEXTCOLORS}
                          keyboardType={'default'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Description'}
                        />
                        {touched.description && errors.description && (
                          <Text style={styles.formError}>
                            {errors.description}
                          </Text>
                        )}
                      </View>

                      <View style={{margin:10,marginTop:15}}>
                        <StoreTextInput
                          value={values.price}
                          onChangeText={handleChange('price')}
                          onBlur={() => setFieldTouched('price')}
                          placeholder="Enter Price"
                          placeholderTextColor={COLORS.TEXTCOLORS}
                          keyboardType={'numeric'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Price'}
                        />
                        {touched.price && errors.price && (
                          <Text style={styles.formError}>
                            {errors.price}
                          </Text>
                        )}
                      </View>


                      <View style={{margin:10,marginTop:15}}>
                        <StoreTextInput
                          value={values.brand}
                          onChangeText={handleChange('brand')}
                          onBlur={() => setFieldTouched('brand')}
                          placeholder="Enter Brand"
                          placeholderTextColor={COLORS.TEXTCOLORS}
                          keyboardType={'default'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Brand'}
                        />
                        {touched.brand && errors.brand && (
                          <Text style={styles.formError}>
                            {errors.brand}
                          </Text>
                        )}
                      </View>


                      <View style={{margin:10,marginTop:15}}>
                        <StoreTextInput
                          value={values.color}
                          onChangeText={handleChange('color')}
                          onBlur={() => setFieldTouched('color')}
                          placeholder="Enter Color"
                          placeholderTextColor={COLORS.TEXTCOLORS}
                          keyboardType={'default'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Color'}
                        />
                        {touched.color && errors.color && (
                          <Text style={styles.formError}>
                            {errors.color}
                          </Text>
                        )}
                      </View>


                      <View style={{margin:10,marginTop:15}}>
                        <StoreTextInput
                          value={values.material}
                          onChangeText={handleChange('material')}
                          onBlur={() => setFieldTouched('material')}
                          placeholder="Enter Material"
                          placeholderTextColor={COLORS.TEXTCOLORS}
                          keyboardType={'default'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Material'}
                        />
                        {touched.material && errors.material && (
                          <Text style={styles.formError}>
                            {errors.material}
                          </Text>
                        )}
                      </View>


                      <View style={{margin:10,marginTop:15}}>
                        <StoreTextInput
                          value={values.size}
                          onChangeText={handleChange('size')}
                          onBlur={() => setFieldTouched('size')}
                          placeholder="Enter Size"
                          placeholderTextColor={COLORS.TEXTCOLORS}
                          keyboardType={'default'}
                          autoCorrect={false}
                          autoCompleteType="off"
                          editable={true}
                          autoCapitalize={'none'}
                          title={'Size'}
                        />
                        {touched.size && errors.size && (
                          <Text style={styles.formError}>
                            {errors.size}
                          </Text>
                        )}
                      </View>

                    </KeyboardAwareScrollView>
                      
                    </View>

                   
                 
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#EC3525',
                        borderRadius: 25,
                        width: WIDTH * 0.8,
                        height: HEIGHT * 0.06,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop:20,
                        marginBottom:50
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
                       ADD
                      </Text>
                    </TouchableOpacity>
                  </>   
             
              </>
            )}
            </Formik>
                                    </ScrollView>
                            </View>
    
                            
    
                        </View>
                    
                </Modal>
            </View>

                    <View style={{ alignItems: "center", marginBottom: 10 }}>
                        <Search
                            value={serchValue}
                            onChange={(serchValue) => setSearch(serchValue)}
                            placeholder={"Search store"}
                            inputwidth="90%"
                        />
                    </View>

                    <View>
                        <Text style={{ color: "#EC3525", fontSize: 16, fontWeight: "600", textAlign: "center" }}>My orders</Text>
                    </View>

                    <View style={{ alignItems: "center", height: HEIGHT * 0.64 }}>
                        <FlatList
                            style={{}}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={shopData}
                            numColumns={2}
                            renderItem={({ item }) => {
                                return (
                                    <MyordersComponent
                                        title={item.name}
                                        price={item.price == null ? "No" : item.price}
                                        size={item.size == null ? "No" : item.size }
                                        image={`${IMAGE_URL}${item.image}`}

                                    />
                                );
                            }}
                            keyExtractor={item => item.team_id}
                            ListEmptyComponent={invalid && emptyProductComponent}

                        />
                    </View>

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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: WIDTH * 0.86,
        height: HEIGHT * 0.9
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 3,
        fontSize: FONT.SIZE.MEDIUM
    },
    formError: {
        color: COLORS.SECONDARY,
        // fontFamily: FONT.FAMILY.ROBOTO_Regular,
        textAlign: 'center',
        marginTop: 4,
        fontSize: 14,
      },
})