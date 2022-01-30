import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONT, HEIGHT, WIDTH, IMAGE_URL} from '../../Utils/constants';

const InviteList = (props) => {
  const {item,onPress} = props;
  return (
    <View style={styles.InviteSelectionView}>
      <View style={{flexDirection: 'row', alignItems: 'center',width:'85%'}}>
        <View style={styles.profileView}>
          <Text style={styles.profileText}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
     <TouchableOpacity style={{width:'15%',justifyContent:'center'}}
     onPress={onPress}>
     
     {!item.select ?
     <View
        style={styles.selectBox}
      />:
       <View
        style={styles.selectBox}
      >
        <Image source={require('../../Assets/Album/select.png')} 
         style={styles.select}/>
      </View>
      }
      </TouchableOpacity>
    </View>
  );
};

export default InviteList;

const styles = StyleSheet.create({
  InviteSelectionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    // backgroundColor:'white',
    // width: '85%',
    alignSelf:'center'
  },
  profileView: {
    backgroundColor: COLORS.GRAY,
    borderRadius: 30,
    marginLeft: 30,
  },
  profileText: {
    padding: 15,
    paddingHorizontal: 20,
    fontSize: FONT.SIZE.LARGE,
  },
  nameText: {
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.TEXTCOLORS,
    marginLeft: 10,
  },
  select:{
    width:13,
    height:13,
    alignSelf:'center'
  },
  selectBox:{
    width: 20,
    height: 20,
    backgroundColor: COLORS.GRAY,
    alignSelf: 'center',
    justifyContent:'center'
  }
});
