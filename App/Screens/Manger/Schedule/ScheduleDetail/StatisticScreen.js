import React, { useState } from 'react'
import { StyleSheet, Text, View,SafeAreaView ,FlatList} from 'react-native'
import { COLORS } from '../../../../Utils/constants'

const StatisticScreen = () => {
    const [data,setData]=useState([
        {player:'Archit Zoe',min:'30',pm2:'2',pa2:'2',pp2:'100%',pm3:'2'},
        {player:'Princy Vaidya',min:'30',pm2:'2',pa2:'2',pp2:'100%',pm3:'2'},
        {player:'XXX YYY',min:'30',pm2:'2',pa2:'2',pp2:'100%',pm3:'2'},
        {player:'Archit Zoe',min:'30',pm2:'2',pa2:'2',pp2:'100%',pm3:'2'},
        {player:'Princy Vaidya',min:'30',pm2:'2',pa2:'2',pp2:'100%',pm3:'2'},
        {player:'XXX YYY',min:'30',pm2:'2',pa2:'2',pp2:'100%',pm3:'2'},
        {player:'Archit Zoe',min:'30',pm2:'2',pa2:'2',pp2:'100%',pm3:'2'},
        {player:'Princy Vaidya',min:'30',pm2:'2',pa2:'2',pp2:'100%',pm3:'2'},
        {player:'XXX YYY',min:'30',pm2:'2',pa2:'2',pp2:'100%',pm3:'2'}
    ])
    return (
        <SafeAreaView style={{flex:1,backgroundColor: '#2C2C2C'}}>
            <View style={{width:'95%', alignSelf:'center',marginTop:10}}>

                <View style={{flexDirection:'row',justifyContent:'space-between',
                backgroundColor:'#595959',padding:10,
                borderWidth:1,borderColor:COLORS.TEXTCOLORS}}>
                <View style={{marginTop:5,width:'35%',}}>
                   <Text style={styles.titleStyle}>Player</Text>
                   </View>
                   {/* <View style={{marginTop:5,width:'12%',}}> */}
                   <Text style={styles.titleStyle}>MIN</Text>
                   {/* </View> */}
                   {/* <View style={{marginTop:5,width:'12%'}}> */}
                   <Text style={styles.titleStyle}>PM2</Text>
                   {/* </View> */}
                   {/* <View style={{marginTop:5,width:'12%'}}> */}
                   <Text style={styles.titleStyle}>PA2</Text>
                   {/* </View> */}
                   {/* <View style={{marginTop:5,width:'15%'}}> */}
                   <Text style={styles.titleStyle}>PP2</Text>
                   {/* </View> */}
                   {/* <View style={{marginTop:5,width:'10%'}}> */}
                   <Text style={styles.titleStyle}>PM3</Text>
                   {/* </View> */}
                </View>
           <FlatList
            style={{}}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => {
              return (
               <View style={{flexDirection:'row',padding:10,borderWidth:1,borderTopWidth:0,borderColor:COLORS.TEXTCOLORS}}>
                   <View style={{width:'40%'}}>
                   <Text style={styles.textStyle}>{item.player}</Text>
                   </View>
                   <View style={{width:'12%'}}>
                   <Text style={styles.textStyle}>{item.min}</Text>
                   </View>
                   <View style={{width:'12%',alignItems:'center'}}>
                   <Text style={styles.textStyle}>{item.pm2}</Text>
                   </View>
                   <View style={{width:'12%',alignItems:'center'}}>
                   <Text style={styles.textStyle}>{item.pa2}</Text>
                   </View>
                   <View style={{width:'17%',alignItems:'center'}}>
                   <Text style={styles.textStyle}>{item.pp2}</Text>
                   </View>
                   <View style={{width:'5%',alignItems:'center'}}>
                   <Text style={styles.textStyle}>{item.pm3}</Text>
                   </View>
               </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
       </View>
        </SafeAreaView>
    )
}

export default StatisticScreen

const styles = StyleSheet.create({
    textStyle:{
        fontSize:14,
        color:'white'
    },
    titleStyle:{
        fontSize:14,
        color:'white',
        fontWeight:'bold'
    }
})
