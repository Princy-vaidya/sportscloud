import React from 'react';
import { View, Text,StyleSheet,Image, ScrollView } from 'react-native';
import { HEIGHT, WIDTH, COLORS, FONT } from "../../../Utils/constants";
import Support from '../../../Components/Support/Support';


export default function Help() {
    return (
        <View style={styles.mainContainer}>
            <ScrollView>
            <View style={styles.TextContainer}><Text style={styles.textStyle}>How We Can Help <Text style={{color:'orange'}}>!</Text></Text></View>
            <View style={styles.SearchContainer}>
                <View style={styles.boxContainer}>
                <View><Text style={{color:'white'}}>Search</Text></View>
                <View>
                    <Image
                style={styles.searchImage}
                source={require("../../../Assets/search.png")}
                />
                <Image
                style={styles.lineImage}
                source={require("../../../Assets/line.png")}
                />
                </View>
                </View>
            </View>
            <View style={{flexDirection:"row"}}>
            <Support
            image={require("../../../Assets/search.png")}
            title="Resource & Support"
            active={true}
            />
              <Support
            image={require("../../../Assets/live.png")}
            title="Live Webinar"
            />

            </View>
           

            <View>
                <Text style={styles.assistContainer}>Assist</Text>
                <View style={{flexDirection:"row"}}>
            <Support
            image={require("../../../Assets/shuttle.png")}
            title="Getting Started"
            
            />
              <Support
            image={require("../../../Assets/invoice.png")}
            title="Account Basics"
            />

            </View>
           
             </View> 
             <View style={{flexDirection:"row"}}>
            <Support
            image={require("../../../Assets/user.png")}
            title="Season Management and Organization"
            
            />
              <Support
            image={require("../../../Assets/finance.png")}
            title="Invoice, Registration,and Financials"
            />

            </View>
            </ScrollView>
          
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"#414141"
    },
    TextContainer:{
        alignItems:"center",
        alignSelf:"center",
        alignContent:"center",
        marginVertical:20
    },
    textStyle:{
        color:"#fff",
        fontWeight:"bold",
        fontSize:20,
        letterSpacing:0.1,
    },
    SearchContainer:{
        width:"90%",
        height:50,
        backgroundColor:COLORS.TEXTCOLORS,
        borderRadius:28,
        marginHorizontal:18,
    },
    boxContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
         alignItems:"center",
         marginHorizontal:15,
         paddingVertical:15   
    },
    searchImage:{
        width:15,
        height:15,
        right:12
    },
    lineImage:{
        width:4,
        height:4
    },
    imagesContainer:{
        flexDirection:"row",

    },
    assistContainer:{
        alignItems:"center",
        alignSelf:"center",
        alignContent:"center",
        color:'white',
        fontWeight:"bold",
        fontSize:15

    }
    
})

