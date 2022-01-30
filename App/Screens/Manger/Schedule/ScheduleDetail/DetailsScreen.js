import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  Modal,
  TextInput
} from 'react-native';
import { add } from 'react-native-reanimated';
import {COLORS, FONT, HEIGHT, WIDTH} from '../../../../Utils/constants';

const DetailsScreen = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [availabilityVisible, setAvailaibilityVisible] = useState(false);
  const [addAvailability, setAddAvailability] = useState('');
 const {data} =props;

 console.log('data',data)

  const onChangeTab = (index) => {
    setTabIndex(index);
  };


  const AddAvailability=()=>{
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={availabilityVisible}
                onRequestClose={() => {
                   setAvailaibilityVisible(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Add Availability Note</Text>

                      
                        <View style={{ height: HEIGHT * 0.2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <Pressable
                                style={[styles.button, styles.buttonDelete]}
                                onPress={()=>setAvailaibilityVisible(false)}
                            >
                                <Text style={[styles.textStyle, { color: COLORS.APPCOLORS }]}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonOk]}
                                onPress={()=>setAvailaibilityVisible(false)}
                            >
                                <Text style={styles.textStyle}>Ok</Text>
                            </Pressable>
                           
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#2C2C2C'}}>
      <ScrollView>
        <View style={styles.sectionContainer}>
          <Text style={styles.titleText}>Pre Match</Text>

          <View style={{flexDirection: 'row', marginTop: 0}}>
            <Pressable
              style={[
                tabIndex === 0 ? styles.activeTab : styles.inActiveTab,
                {borderTopLeftRadius: 5, borderBottomLeftRadius: 5},
              ]}
              onPress={() => onChangeTab(0)}>
              <Text style={styles.tabText}>Going</Text>
            </Pressable>
            <Pressable
              style={[tabIndex === 1 ? styles.activeTab : styles.inActiveTab]}
              onPress={() => onChangeTab(1)}>
              <Text style={styles.tabText}>Maybe</Text>
            </Pressable>
            <Pressable
              style={[
                tabIndex === 2 ? styles.activeTab : styles.inActiveTab,
                {borderTopRightRadius: 5, borderBottomRightRadius: 5},
              ]}
              onPress={() => onChangeTab(2)}>
              <Text style={styles.tabText}>No</Text>
            </Pressable>
          </View>
          <Pressable style={styles.availableBorder}
          onPress={()=>setAvailaibilityVisible(true)}>
            <Text style={styles.available}>My Availability Notes</Text>
          </Pressable>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.titleText}>Event Details</Text>

          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.tabText}>Location</Text>
              <Text style={styles.subText}>{data[0].place}</Text>
            </View>
            <Image
              source={require('../../../../Assets/VectorIcon/right.png')}
              style={{height: 10, width: 20, tintColor: 'white'}}
            />
          </View>

          <View style={styles.columnContainer}>
            <Text style={styles.tabText}>Arrival Time</Text>
            <Text style={styles.subText}>{data[0].arrivalTime}</Text>
          </View>

          <View style={styles.columnContainer}>
            <Text style={styles.tabText}>Notes</Text>
            <Text style={styles.subText}>{data[0].notes}</Text>
          </View>

          <View style={styles.columnContainer}>
            <Text style={styles.tabText}>Uniform</Text>
            <Text style={styles.subText}>{data[0].uniform}</Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.tabText}>Home/Away</Text>
            <Text style={styles.subText}>{data[0].homeaway}</Text>
          </View>
          <View style={[styles.rowContainer, {marginTop: 10}]}>
            <View>
              <Text style={styles.tabText}>Opponent</Text>
              <Text style={styles.subText}>Jaynt</Text>
            </View>
            <Image
              source={require('../../../../Assets/VectorIcon/right.png')}
              style={{height: 10, width: 20, tintColor: 'white'}}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.titleText}>Game Day</Text>

          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.tabText}>Scores and Chats</Text>
              <Text style={styles.subText}>XYZ Live</Text>
            </View>
            <Image
              source={require('../../../../Assets/VectorIcon/right.png')}
              style={{height: 10, width: 20, tintColor: 'white'}}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.titleText}>Assignments</Text>
            <Pressable style={[styles.availableBorder,{width:'32%'}]}>
              <Text style={styles.available}>Add Another</Text>
            </Pressable>
          </View>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.tabText}>Assignments</Text>
              <Text style={styles.subText}>{data[0].assignment}</Text>
            </View>
            <Image
              source={require('../../../../Assets/VectorIcon/right.png')}
              style={{height: 10, width: 20, tintColor: 'white'}}
            />
          </View>
        </View>
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={availabilityVisible}
                onRequestClose={() => {
                   setAvailaibilityVisible(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Add Availability Note</Text>
                        <View style={styles.input}>
                        <TextInput
                        style={styles.textInput}
                        onChangeText={(value)=>setAddAvailability(value)}
                        placeholder=''
                        value={addAvailability}
                        keyboardType='default'
                        autoCorrect={false}
                        autoCompleteType='off'
        
                    />
                    </View>
                      
                        <View style={{marginTop:'10%',  justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <Pressable
                                style={[styles.button, styles.buttonDelete]}
                                onPress={()=>setAvailaibilityVisible(false)}
                            >
                                <Text style={[styles.textStyle]}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonOK]}
                                onPress={()=>setAvailaibilityVisible(false)}
                            >
                                <Text style={styles.textStyle}>Ok</Text>
                            </Pressable>
                           
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
      </ScrollView>
    
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  inActiveTab: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  activeTab: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    backgroundColor: COLORS.GREENCOLOR,
  },
  tabText: {
    color: 'white',
    fontSize: 16,
  },
  available: {
    color: COLORS.REDCOLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
  availableBorder: {
    marginTop: 10,
    borderBottomWidth: 2,
    width: '50%',
    alignSelf: 'center',
    borderBottomColor: COLORS.REDCOLOR,
  },
  sectionContainer: {
    backgroundColor: '#595959',
    margin: 10,
    borderRadius: 10,
    padding: 15,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subText: {
    color: COLORS.TEXTCOLORS,
    fontSize: 14,

    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.GRAY,
    // marginTop:10
  },

  columnContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.GRAY,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)'
},
modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: WIDTH * 0.85,
    height: HEIGHT * 0.3
},
button: {
    borderRadius: 10,
    padding: 10,
},
buttonOpen: {
    backgroundColor: "#F194FF",
},
buttonOK: {
    backgroundColor: COLORS.REDCOLOR,
    width: WIDTH * 0.28,
    height: HEIGHT * 0.065,
    alignItems: 'center',
    justifyContent: 'center'
},
buttonDelete: {
    // borderColor: COLORS.APPCOLORS,
    borderWidth: 1,
    width: WIDTH * 0.28,
    height: HEIGHT * 0.065,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'black'
},
textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    // fontFamily: FONT.FAMILY.ROBOTO_Regular,
    fontSize: FONT.SIZE.MEDIUM
},
modalText: {
    marginBottom: 10,
    marginTop:10,
    color: 'black',
    fontSize:20, 
    // fontFamily: FONT.FAMILY.ROBOTO_Medium, 
  
},
textInput: {
    height: 54,
    flex: 1,
    padding: 10,
    marginLeft: 10,
    fontSize:18,
  },
  
  input: {
    borderRadius:5,
    borderWidth:1,
    marginBottom:10,
    // width: width/1.1 ,
    height:54,
    fontSize: 18,
    flexDirection:'row',
 
    justifyContent:'space-between',
  }
});
