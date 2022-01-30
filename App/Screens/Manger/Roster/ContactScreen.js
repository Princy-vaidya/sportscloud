
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Button,
  StatusBar,
  TouchableOpacity
} from "react-native";
import Contacts from "react-native-contacts";
import {CommonPicker} from '../../../Components/Common/commonPicker';
import ListItem from "../../../Components/ListItem/ListItem";
import Avatar from "../../../Components/Avatar/Avatar";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import Network from '../../../Services/Network';
import Toast from 'react-native-root-toast';
import {COLORS, FONT, HEIGHT, WIDTH, IMAGE_URL} from '../../../Utils/constants';
import Loader from '../../../Components/Common/Loader';
import AsyncStorage from '@react-native-community/async-storage';

export default class ContactScreen extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);

    this.state = {
      contacts: [],
      searchPlaceholder: "Search",
      typeText: null,
      loading: true,
      sportsData:[],
      sportsName:'',
      loading:false,
      toggle:false
    };

    // if you want to read/write the contact note field on iOS, this method has to be called
    // WARNING: by enabling notes on iOS, a valid entitlement file containing the note entitlement as well as a separate
    //          permission has to be granted in order to release your app to the AppStore. Please check the README.md
    //          for further information.
    Contacts.iosEnableNotesUsage(false);
  }

  async componentDidMount() {
    this.listTeam()
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts."
      }).then(() => {
        this.loadContacts();
      });
    } else {
      this.loadContacts();
    }
  }

  loadContacts() {
    Contacts.getAll()
      .then(contacts => {
        this.setState({ contacts, loading: false });
      })
      .catch(e => {
        this.setState({ loading: false });
      });

    Contacts.getCount().then(count => {
      this.setState({ searchPlaceholder: `Search` });
    });

    Contacts.checkPermission();
  }

  search(text) {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === "" || text === null) {
      this.loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then(contacts => {
        this.setState({ contacts });
      });
    } else if (emailAddressRegex.test(text)) {
      Contacts.getContactsByEmailAddress(text).then(contacts => {
        this.setState({ contacts });
      });
    } else {
      Contacts.getContactsMatchingString(text).then(contacts => {
        this.setState({ contacts });
      });
    }
  }

  listTeam = async () => {
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
            this.setState({
              sportsData:res.response_data
            });
          } else if (res.response_code == 4000) {
            Toast.show(res.response_message);
          }
        })
        .catch((error) => {
          console.log('error===>', error);
        });
    }
  };

  
 onChangeValue = (name) => {
    this.setState({
      sportsName:name
    })
    
  };

  onPressContact(contact) {
    var text = this.state.typeText;
    this.setState({ typeText: null });
    if (text === null || text === '')
      Contacts.openExistingContact(contact)
    else {
      var newPerson = {
        recordID: contact.recordID,
        phoneNumbers: [{ label: 'mobile', number: text }]
      }
      Contacts.editExistingContact(newPerson).then(contact => {
        //contact updated
      });
    }
  }

  addNew() {
    Contacts.openContactForm({}).then(contact => {
      // Added new contact
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
        loading: false 
      }));
    })
  }

  onMultipleSelectInvitaion = (item,index) => {
    let listArray = this.state.contacts;
    let newArray = [];

   
   this.setState({
     toggle:!this.state.toggle
   })

  
    listArray[index].select = !listArray[index].select;
    // newArray = array.filter((item) => item.select === true);
  this.setState({
    contacts:listArray
  })
    // let players = [];
    // newArray.map((item) => {
    //   players.push(item.playerId);
    // });
    // setSelectedPlayer(players);
  };

  render() {
    return (
      <SafeAreaView style={{height: HEIGHT, backgroundColor: '#414141'}}>
      <StatusBar backgroundColor={'#262626'} barStyle="light-content" />
      <Loader loading={this.state.loading} />

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
          onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../../../Assets/VectorIcon/back.png')}
            resizeMode="contain"
            style={{height: 10, width: 20}}
          />

          <Text style={{color: '#FFFFFF', fontSize: 14, marginLeft: 20}}>
            Contacts
          </Text>
        </TouchableOpacity>
        <View style={{flex: 0.4, alignItems: 'flex-start'}}>
          <CommonPicker
            selected={this.state.sportsName}
            placeholder={{}}
            onChange={(sportsName) => this.onChangeValue(sportsName)}
            items={this.state.sportsData.map((item) => {
              return {label: item.team_name, value: item};
            })}
          />
        </View>
      </View>

        <View
          style={{
            paddingLeft: 100,
            paddingRight: 100,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {/* <Image
            source={require("./logo.png")}
            style={{
              aspectRatio: 6,
              resizeMode: "contain"
            }}
          /> */}
        </View>
        {/* <Button title="Add new" onPress={() => this.addNew()} /> */}
        <View style={{alignSelf:'center',marginVertical:'5%'}}>
        <SearchBar
          searchPlaceholder={this.state.searchPlaceholder}
          onChangeText={this.search}
        />
        <View style={{margin:10}}>
         <TouchableOpacity
            style={styles.sendInviteButton}
            onPress={() => handleSentInvite()}>
            <Text style={styles.sendInviteText}>Send Invite</Text>
          </TouchableOpacity>
          </View>
        </View>

       
        {/* <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <TextInput
            keyboardType='number-pad'
            style={styles.inputStyle}
            placeholder='Enter number to add to contact'
            onChangeText={text => this.setState({ typeText: text })}
            value={this.state.typeText}
          />
        </View> */}

        {
          this.state.loading === true ?
            (
              <View style={styles.spinner}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <ScrollView style={{ flex: 1,marginHorizontal:15 }}>

                {this.state.contacts.map((contact,index) => {
                  return (
                    <ListItem
                      leftElement={
                        <Avatar
                          img={
                            contact.hasThumbnail
                              ? { uri: contact.thumbnailPath }
                              : undefined
                          }
                          placeholder={getAvatarInitials(
                            `${contact.givenName} ${contact.familyName}`
                          )}
                          width={40}
                          height={40}
                        />
                      }
                      key={contact.recordID}
                      title={`${contact.givenName} ${contact.familyName}`}
                      description={`${contact.company}`}
                      select={contact.select}
                      onPress={() => this.onPressContact(contact)}
                      onLongPress={() => Contacts.viewExistingContact(contact)}
                      onDelete={() =>
                        Contacts.deleteContact(contact).then(() => {
                          this.loadContacts();
                        })
                      }
                      onMultipleSelectInvitaion={()=>this.onMultipleSelectInvitaion(contact,index)}
                    />
                  );
                })}
              </ScrollView>
            )
        }

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    alignContent: "center",
    justifyContent: "center"
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: "center"
  },
  sendInviteButton: {
    alignItems: 'center',
    backgroundColor: COLORS.REDCOLOR,
    width: '40%',
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  sendInviteText: {
    padding: 10,
    color: 'white',
    fontSize: FONT.SIZE.MEDIUM,
  },
});

const getAvatarInitials = textString => {
  if (!textString) return "";
  const text = textString.trim();
  const textSplit = text.split(" ");

  if (textSplit.length <= 1) return text.charAt(0);

  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);

  return initials;
};