import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as LocationGeoCoding from "expo-location";

const index = () => {
    const [locationServicesEnabled,setLocationServicesEnabled] = useState(false);
    const [disPlayCurrentAddress,setDisplayCurrentAddress]=useState("fetching your location...");

    useEffect(()=>{
      checkIfLocationEnabled();
      getCurrentLocation();
    },[]);

    const checkIfLocationEnabled = async()=>{
      let enabled = await Location.hasServicesEnabledAsync();

      if(!enabled){
        Alert.alert("Location services not enabled","Please enable your location to continue",[{text:"OK"}],{cancelable:false})
      }else{
        setLocationServicesEnabled(true)
      }
    }

    const getCurrentLocation = async()=>{
      let {status} = await Location.requestBackgroundPermissionsAsync();

      if(status !== granted){
        Alert.alert("Permission is not granted","Allow the app to use the location service",[{text:"OK"}],{cancelable:false})
      }
    }
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})