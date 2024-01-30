import React, {FC, useEffect, useState} from 'react';
import {
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
  latitude: number | null;
  longitude: number | null;
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
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    getLocationPermission();
  }, []);

  //Get user permission
  const getLocationPermission = async () => {
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
    } else if (Platform.OS === 'ios') {
      Geolocation.setRNConfiguration({
        authorizationLevel: 'whenInUse',
        skipPermissionRequests: false,
      });
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log('LATITUDE',latitude, 'longitude', longitude)
          setUserLocation({ latitude, longitude });
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission denied');
              break;
            case 2:
              console.log('Position unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      )      
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
          latitude: 6.614308,
          longitude: 3.347376195632642,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}>
        <Marker
          coordinate={{
            latitude: userLocation.latitude || 0,
            longitude: userLocation.longitude || 0,
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
