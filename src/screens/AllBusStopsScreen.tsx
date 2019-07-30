import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  StatusBar
} from 'react-native';
import { Divider } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import KiedyPrzyjedzie from '../kp_api/index';
import Carriers from '../kp_api/Carriers';
import BusStopElement from '../components/BusStopElement';

interface IProps {}

@inject('busStopsStore')
@observer
export default class AllBusStopsScreen extends Component<IProps> {
  static navigationOptions = {
    title: 'Lista przystanków'
  };

  state = {
    BusStops: [],
    refreshing: true
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

    this.props.busStopsStore.addBusStops(busStops);

    this.setState({ refreshing: false });
  }

  _onBusStopPress = currentBusStop => {
    this.props.navigation.navigate('BusStopSchedule', { currentBusStop });
  };
  dupa = 0;
  render() {
    this.dupa += 1;
    console.log(this.dupa);

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {this.props.busStopsStore.busStops.map(busStop => {
            return (
              <View key={busStop.number}>
                <BusStopElement
                  busStop={busStop}
                  onPress={this._onBusStopPress}
                />
                <Divider />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10
  }
});
