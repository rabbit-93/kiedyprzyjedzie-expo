import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import KiedyPrzyjedzie from '../kp_api';
import Carriers from '../kp_api/Carriers';

@inject('busStopsStore')
@observer
export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Mapa przystanków',
  };

  renderMarker = data => {
    return <Marker key={data.id || Math.random()} coordinate={data.location} />;
  };

  _onBusStopMarkerPress = e => {
    // this.props.navigation.navigate(screen, { KP: this.KP, currentBusStop });
    // e._targetInst.return.key
    console.log(e._targetInst.return.key);
    const busStopId = parseInt(e._targetInst.return.key);
    const selectedBusStop = this.props.busStopsStore.busStops.find(
      b => b.id === busStopId
    );
    // console.log(toJS(selectedBusStop));

    this.props.navigation.navigate('BusStopSchedule', {
      currentBusStop: selectedBusStop,
    });
  };

  render() {
    const { busStops } = this.props.busStopsStore;
    return (
      <View style={styles.container}>
        {/* <ClusteredMapView
          style={{ flex: 1 }}
          data={this.state.busStops}
          initialRegion={{
            latitude: 50.668596,
            longitude: 17.928808,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          ref={r => {
            this.map = r;
          }}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
        /> */}
        <MapView
          initialRegion={{
            latitude: 50.668596,
            longitude: 17.928808,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        >
          {busStops.map(busStop => {
            // console.log(busStop);
            return (
              <Marker
                coordinate={{
                  latitude: busStop.latitude,
                  longitude: busStop.longitude,
                }}
                title={busStop.name}
                description={busStop.number.toString()}
                key={busStop.id}
                style={styles.marker}
                onCalloutPress={e => this._onBusStopMarkerPress(e)}
                pinColor="#2196f3"
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: 400,
    width: 400,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 60,
    height: 75,
  },
});
