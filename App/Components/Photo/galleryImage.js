import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { HEIGHT, WIDTH, COLORS, FONT } from "../../Utils/constants";


const { width, height } = Dimensions.get("window");

const GalleryImage = (props) => {
  const { item, onPress ,multiSelect} = props;
  return (
    <TouchableOpacity style={styles.itemImageView} 
    onPress={onPress}>
      <Image style={styles.itemImage} 
      source={{ uri: item.node.image.uri }} />

     {(multiSelect && item.select)?
     <View style={styles.hightlightActiveMultiselect}>
         <Image source={require('../../Assets/Album/select.png')} 
         style={styles.select}/>
          </View>:
          multiSelect &&
          <View style={styles.hightlightMultiselect}/>}


    </TouchableOpacity>
  );
};

export default GalleryImage;

const styles = StyleSheet.create({
  itemImageView: {
    width: "30.5%",
    margin: 5,
    height: 120,
  },
  itemImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  hightlightMultiselect:{
    width:25,
    height:25,
    backgroundColor:'#6666667F',
    position:'absolute',
    borderRadius:20,
    borderWidth:3,
    borderColor:'white',
    alignSelf:'flex-end',
    margin:8,right:8
  },
  hightlightActiveMultiselect:{
    width:25,
    height:25,
    backgroundColor:'#274FA4',
    position:'absolute',
    borderRadius:20,
    borderWidth:3,
    borderColor:'white',
    alignSelf:'flex-end',
    margin:8,
    right:8,
    justifyContent:'center'
  },
  select:{
    width:10,
    height:10,
    alignSelf:'center'
  }
});
