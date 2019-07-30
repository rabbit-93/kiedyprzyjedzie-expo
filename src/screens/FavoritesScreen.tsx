import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Divider } from 'react-native-paper';
import BusStopElement from '../components/BusStopElement';

@inject('busStopsStore')
@observer
export default class FavoritesScreen extends Component {
  static navigationOptions = {
    title: 'Ulubione przystanki'
  };

  _onBusStopPress = currentBusStop => {
    this.props.navigation.navigate('BusStopSchedule', { currentBusStop });
  };

  render() {
    const { favorites, busStops } = this.props.busStopsStore;

    if (favorites.length === 0) {
      return (
        <View style={styles.container}>
          <Text>No favorites bus stops</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <ScrollView
        // refreshControl={
        //   <RefreshControl
        //     refreshing={this.state.refreshing}
        //     onRefresh={this._onRefresh}
        //   />
        // }
        >
          {favorites.map(busStopId => {
            const busStop = busStops.find(bs => bs.id === busStopId);
            return (
              <View key={busStopId}>
                <BusStopElement
                  busStop={busStop}
                  onPress={this._onBusStopPress}
                />
                <Divider />
              </View>
            );
          })}
          {/* <FlatList
          data={this.state.BusStops}
          renderItem={({ item }) => <BusStop busStop={item} />}
          keyExtractor={item => item.number.toString()}
        /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10
    // paddingBottom: 10
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});
