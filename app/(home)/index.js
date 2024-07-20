import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Octicons } from '@expo/vector-icons';

const Index = () => {
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Fetching your location...');

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location services not enabled',
        'Please enable your location to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServicesEnabled(true);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use the location service',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    console.log(location);

    let { coords } = location;
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (response.length > 0) {
        const { name, postalCode, city } = response[0];
        let address = `${name}, ${postalCode}, ${city}`;
        setDisplayCurrentAddress(address);
      } else {
        setDisplayCurrentAddress('Unable to find address');
      }
    }
  };

  console.log('My address:', displayCurrentAddress);

  return (
    <ScrollView style={{flex:1,backgroundColor:"#f8f8f8"}}>
      <View style={{flexDirection:"row",alignItems:"center",gap:12,padding:10}}>
      <Octicons name="location" size={24} color="#e52850" />
      <View style={{flex:1}}>
        <Text style={{fontSize:15,fontWeight:500}}>Deliver To</Text>
        <Text style={{color:"gray",fontSize:15,marginTop:3}}>{displayCurrentAddress}</Text>
      </View>
      <Pressable style={{backgroundColor:"#6cb4ee",width:40,height:40,borderRadius:20,justifyContent:"center",alignItems:"center"}}>
        <Text>5</Text>
      </Pressable>
      </View>
      <View>
        
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
