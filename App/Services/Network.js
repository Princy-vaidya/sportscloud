import NetInfo from "@react-native-community/netinfo";
import {base_url} from '../Utils/constants'
import axios from 'axios'
import Toast from 'react-native-root-toast';
import Loader from "../Components/Common/Loader"


export default Network = (endpoint, method, body) => {
  console.log("dfdfgdfgdfg",endpoint,method,body,`${base_url}${endpoint}`)
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      if(state.isConnected) {
        if (method == 'get') {
          axios({
            method,
            url: `${base_url}${endpoint}`,
            headers: {
             'Content-Type': 'application/json',
             'x-access-token': body.authToken ? body.authToken : ""
            },
            body: body,
          })
          .then(function (response) {
            resolve(response.data)
          })
          .catch(function (error) {
            console.log("error========>", error);
            // Toast.show('Something went wrong. Please try again !')
            reject(error)
          });
        }else{
        axios({
          method,
          url: `${base_url}${endpoint}`,
          headers: {
           'Content-Type': 'application/json',
           'x-access-token': body ? body.authToken : ""
          },
          data: body
        })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          console.log("error========>", error);
          // Toast.show('Something went wrong. Please try again !')
          reject(error)
        });
      }
      } else {
        reject('No connection')
        Toast.show('Please check your internet connection !', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM
        })
      }
    });
  })
}
