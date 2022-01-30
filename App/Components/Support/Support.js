import React from 'react'
import { View, Text,StyleSheet,Image } from 'react-native'
import { HEIGHT, WIDTH, COLORS, FONT } from "../../Utils/constants";

export default function Support({image,title,active}) {
    return (
        
        // <View style={[styles.main, active && {backgroundColor: '#2C2C2C'}]}>
        <View style={styles.main}>
           
            <View style={[styles.Boxcontainer ,active &&{backgroundColor: '#2C2C2C'}]}>
                <View style={styles.resourceContainer}>
                <View>
                    <Image
                    style={styles.imageContainer}
                    source={image}
                    />
                </View>
                <View style={{margin:8}}><Text style={[styles.textStyle,active &&{color:'#EC3525'}]}>{title}</Text></View>
                </View>
                
            </View>
            {/* <View style={styles.secondcontainer}>
            <View style={styles.resourceContainer}>
                <View>
                    <Image
                    style={styles.imageContainer}
                    source={image}
                    />
                </View>
                <View style={{margin:8}}><Text style={styles.textStyle}>{title}</Text></View>
                </View>

                </View>  */}
            
              
        </View>
        
    )
}
const styles = StyleSheet.create({
    main:{
        flexDirection:"row",
        justifyContent:"space-between",
       marginVertical:-1
    },
    Boxcontainer:{
        width:145,
        height:145,
         backgroundColor:COLORS.TEXTCOLORS,
        borderRadius:10,
        marginVertical:20,
        marginHorizontal:20
    },
    
    imageContainer:{
        width:60,
        height:60
    },
    resourceContainer:{
        flexDirection:"column",
        alignItems:"center",
        alignSelf:"center",
         justifyContent:"center",
        marginVertical:30,  
    },
    textStyle:{
        fontFamily:"Poppins",
        textAlign:"center",
         fontSize:11,
        // fontWeight:"bold",
        color:'black'
    }
    
})
