import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import KiedyPrzyjedzie from '../kp_api/index';
import Carriers from '../kp_api/Carriers';
import BusStopElement from '../components/BusStopElement';
import BusStopListHeader from '../components/BusStopListHeader';

interface IProps {}

@inject('busStopsStore')
@observer
export default class AllBusStopsScreen extends Component<IProps> {
  static navigationOptions = () => ({
    headerTitle: <BusStopListHeader />,
  });

  state = {
    BusStops: [],
    loading: true,
  };

  async componentDidMount() {
    this.getBusStops();
  }

  _onRefresh = () => {
    this.getBusStops();
  };

  async getBusStops() {
    const carriers = await Carriers.getCarriers();
    const carrier = carriers.find(carrier => {
      return carrier.name === 'MZK Sp. z o.o. Opole';
    });

    KiedyPrzyjedzie.setCarrier(carrier);
    const busStops = await KiedyPrzyjedzie.getBusStops();

    console.log('busStops downloaded');

    this.props.busStopsStore.addBusStops(busStops);

    this.setState({ loading: false });
  }

  _onBusStopPress = currentBusStop => {
    this.props.navigation.navigate('BusStopSchedule', {
      currentBusStop,
    });
  };

  render() {
    const {
      isSearching,
      searchText,
      setIsSearching,
      setSearchText,
      filteredBusStops,
    } = this.props.busStopsStore;

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
          {this.state.loading && (
            <Text style={{ display: 'flex', alignItems: 'center' }}>
              Ładowanie
            </Text>
          )}
          {filteredBusStops.map(busStop => {
            return (
              <View key={busStop.number} style={styles.list}>
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
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  list: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
