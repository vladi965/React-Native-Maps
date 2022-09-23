import * as React from "react";
import * as Location from "expo-location";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {GOOGLE_MAPS_KEY} from '@env';
const carImage = require('./assets/image/uber1.png');

export default function App() {
  const [origin, setOrigin] = React.useState({
    latitude: -12.0412358,
    longitude: -76.9714561,
  });

  const [destination, setDestination] = React.useState({
    latitude: -12.0430826,
    longitude: -76.9719278,
  })

  React.useEffect(() => {
    getLocationPermission();
  }, [])

   async function getLocationPermission(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      alert('Permiso denegado');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);
  }

  

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04
      }}
      >
        <Marker 
          draggable
          coordinate={origin}
          image={carImage}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker
          draggable 
          coordinate={destination}
          onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
        />
        <MapViewDirections 
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="black"
          strokeWidth={5}
        />
        {/* <Polyline 
          lineDashPattern={[1]}
          coordinates={[origin, destination]}
          strokeColor="red"
          strokeWidth={5}
        />   */} 
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
