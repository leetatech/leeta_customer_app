import React, {FC, useEffect, useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {CUSTOMER_MARKER, VENDOR_MARKER} from '../../Assets/svgImages';
import GetLocation from 'react-native-get-location';
import Geolocation from '@react-native-community/geolocation';

interface UserLocation {
  latitude: number;
  longitude: number;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const CustomVendorLocationsMarker = () => {
  return (
    <View>
      <VENDOR_MARKER />
    </View>
  );
};
const CustomCustomerLocationMarker = () => {
  return (
    <View>
      <CUSTOMER_MARKER />
    </View>
  );
};
const locationMarkerLists = [
  {
    id: 1,
    latitude: 6.624208,
    longitude: 3.357376195632642,
    title: 'Vendor 1',
    description: 'Fast delivery',
  },
  {
    id: 2,
    latitude: 6.624108,
    longitude: 3.367376195632642,
    title: 'Vendor 2',
    description: 'Reliable gas refill',
  },
  {
    id: 3,
    latitude: 6.634108,
    longitude: 3.357376195632642,
    title: 'Vendor 3',
    description: 'Affordable gas refill',
  },
];

const GoogleMap: FC = () => {
  const [userLocation, setUserLocation] = useState<UserLocation>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getUserPermission();
  }, []);

  //Get user permission
  const getUserPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Please grant permission to continue',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocationOnAndroid();
        } else {
          console.log('Permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    if (Platform.OS === 'ios') {
      Geolocation.setRNConfiguration({
        authorizationLevel: 'whenInUse',
        skipPermissionRequests: false,
      });
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setUserLocation({latitude, longitude});
        },
        error => {
          switch (error.code) {
            case 1:
              Alert.alert(
                'Please grant location permission to use this feature.',
              );
              break;
            case 2:
              Alert.alert(
                'Unable to determine your location. Please check your GPS settings.',
              );
              break;
            case 3:
              Alert.alert('Location request timed out. Please try again.');
              break;
          }
        },
      );
    }
  };

  const getCurrentLocationOnAndroid = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: userLocation?.latitude || 6.614308,
          longitude: userLocation.longitude || 3.347376195632642,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}>
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}>
          <CustomCustomerLocationMarker />
        </Marker>
        {locationMarkerLists.map(marker => {
          return (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}>
              <CustomVendorLocationsMarker />
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default GoogleMap;
