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
  TextInput,
  FlatList,
} from 'react-native';
import {add} from 'react-native-reanimated';
import {COLORS, FONT, HEIGHT, WIDTH} from '../../../../Utils/constants';

const AvailabilityScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [availabilityVisible, setAvailaibilityVisible] = useState(false);
  const [addAvailability, setAddAvailability] = useState('');
  const [going, setGoing] = useState([
    'Archit Jhoe',
    'Princy Vaiday',
    'YYYY ZZ',
  ]);
  const [maybe, setMaybe] = useState(['Archit Jhoe']);
  const [notgoing, setNotGoing] = useState(['Archit Jhoe', 'Princy Vaiday']);
  const [notReply, setNotReply] = useState(['Archit Jhoe', 'Princy Vaiday']);

  const onChangeTab = (index) => {
    setTabIndex(index);
  };

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
              <Text style={styles.tabText}>ALL</Text>
            </Pressable>
            <Pressable
              style={[tabIndex === 1 ? styles.activeTab : styles.inActiveTab]}
              onPress={() => onChangeTab(1)}>
              <Text style={styles.tabText}>Players</Text>
            </Pressable>
            <Pressable
              style={[
                tabIndex === 2 ? styles.activeTab : styles.inActiveTab,
                {borderTopRightRadius: 5, borderBottomRightRadius: 5},
              ]}
              onPress={() => onChangeTab(2)}>
              <Text style={styles.tabText}>No Player</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.titleText}>3 Going</Text>

          <FlatList
            style={{}}
            showsVerticalScrollIndicator={false}
            data={going}
            renderItem={({item}) => {
              return (
                <View style={styles.rowContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../../../Assets/roster/person.png')}
                      style={{width: 50, height: 50}}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text style={styles.tabText}>{item}</Text>
                      <Pressable
                        style={styles.availableBorder}
                        onPress={() => setAvailaibilityVisible(true)}>
                        <Text style={styles.available}>
                          My Availability Notes
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: COLORS.GREENCOLOR,
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.titleText}>1 May be</Text>
          <FlatList
            style={{}}
            showsVerticalScrollIndicator={false}
            data={maybe}
            renderItem={({item}) => {
              return (
                <View style={styles.rowContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../../../Assets/roster/person.png')}
                      style={{width: 50, height: 50}}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text style={styles.tabText}>{item}</Text>
                      <Pressable
                        style={styles.availableBorder}
                        onPress={() => setAvailaibilityVisible(true)}>
                        <Text style={styles.available}>
                          My Availability Notes
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: COLORS.PRIMARY,
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.titleText}>2 Not Going</Text>
          <FlatList
            style={{}}
            showsVerticalScrollIndicator={false}
            data={notgoing}
            renderItem={({item}) => {
              return (
                <View style={styles.rowContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../../../Assets/roster/person.png')}
                      style={{width: 50, height: 50}}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text style={styles.tabText}>{item}</Text>
                      <Pressable
                        style={styles.availableBorder}
                        onPress={() => setAvailaibilityVisible(true)}>
                        <Text style={styles.available}>
                          My Availability Notes
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: COLORS.REDCOLOR,
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.titleText}>2 Havn't reply</Text>
          <FlatList
            style={{}}
            showsVerticalScrollIndicator={false}
            data={notReply}
            renderItem={({item}) => {
              return (
                <View style={styles.rowContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../../../Assets/roster/person.png')}
                      style={{width: 50, height: 50}}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text style={styles.tabText}>{item}</Text>
                      <Pressable
                        style={styles.availableBorder}
                        onPress={() => setAvailaibilityVisible(true)}>
                        <Text style={styles.available}>
                          My Availability Notes
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 1,
                      borderColor: COLORS.TEXTCOLORS,
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={availabilityVisible}
            onRequestClose={() => {
              setAvailaibilityVisible(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Add Availability Note</Text>
                <View style={styles.input}>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(value) => setAddAvailability(value)}
                    placeholder=""
                    value={addAvailability}
                    keyboardType="default"
                    autoCorrect={false}
                    autoCompleteType="off"
                  />
                </View>

                <View
                  style={{
                    marginTop: '10%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Pressable
                    style={[styles.button, styles.buttonDelete]}
                    onPress={() => setAvailaibilityVisible(false)}>
                    <Text style={[styles.textStyle]}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonOK]}
                    onPress={() => setAvailaibilityVisible(false)}>
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

export default AvailabilityScreen;

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
    backgroundColor: COLORS.REDCOLOR,
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
    marginTop: 0,
    borderBottomWidth: 2,

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
    // borderBottomWidth: 0.5,
    // borderBottomColor: COLORS.GRAY,
    paddingBottom: 5,
    // marginTop:10
  },

  columnContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.GRAY,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: WIDTH * 0.85,
    height: HEIGHT * 0.3,
  },
  button: {
    borderRadius: 10,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonOK: {
    backgroundColor: COLORS.REDCOLOR,
    width: WIDTH * 0.28,
    height: HEIGHT * 0.065,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDelete: {
    // borderColor: COLORS.APPCOLORS,
    borderWidth: 1,
    width: WIDTH * 0.28,
    height: HEIGHT * 0.065,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    // fontFamily: FONT.FAMILY.ROBOTO_Regular,
    fontSize: FONT.SIZE.MEDIUM,
  },
  modalText: {
    marginBottom: 10,
    marginTop: 10,
    color: 'black',
    fontSize: 20,
    // fontFamily: FONT.FAMILY.ROBOTO_Medium,
  },
  textInput: {
    height: 54,
    flex: 1,
    padding: 10,
    marginLeft: 10,
    fontSize: 18,
  },

  input: {
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    // width: width/1.1 ,
    height: 54,
    fontSize: 18,
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
});
