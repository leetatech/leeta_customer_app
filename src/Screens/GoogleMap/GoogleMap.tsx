import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {CUSTOMER_MARKER, VENDOR_MARKER} from '../../Assets/svgImages';

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
    latitude: 6.653129140579424,
    longitude: 3.2934292901538815,
    title: 'Vendor 1',
    description: 'one stop store for fast delivery',
  },
  {
    id: 2,
    latitude: 6.643129140579424,
    longitude: 3.2934292901538815,
    title: 'Vendor 2',
    description: 'Reliable gas refill',
  },
  {
    id: 3,
    latitude: 6.645129140579424,
    longitude: 3.2934292901538815,
    title: 'Vendor 3',
    description: 'Affordable gas refill',
  },
];
const GoogleMap: FC = () => {

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 6.633129140579424,
          longitude: 3.2934292901538815,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        >
        <Marker
          coordinate={{
            latitude: 6.633129140579424,
            longitude: 3.2934292901538815,
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
              description={marker.description}
            >
              <CustomVendorLocationsMarker />
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default GoogleMap;
