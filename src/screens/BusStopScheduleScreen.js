import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import KiedyPrzyjedzie from '../kp_api/index';
import BusStopHeader from '../components/BusStopHeader';
import ScheduleEntry from '../components/ScheduleEntry';

export default class BusStopScheduleScreen extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   const busStop = navigation.getParam('currentBusStop', 'Odjazdy');
  //   return {
  //     title: busStop.name
  //   };
  // };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <BusStopHeader
          busStop={navigation.getParam('currentBusStop', null)}
          loading={navigation.getParam('loading', true)}
        />
      ),
    };
  };

  state = {
    BusStopSchedule: [],
    loading: true,
  };

  isLoading = () => {
    return this.props.navigation.getParam('loading', true);
  };

  loading = (isLoading, manualRefresh) => {
    this.props.navigation.setParams({ loading: isLoading });

    if (manualRefresh || this.state.loading)
      this.setState({ loading: isLoading });
  };

  startInterval = async () => {
    try {
      this.timer = setInterval(async () => {
        this.fetchBusStopSchedule(false);
      }, 7 * 1000); // default: 10 seconds
    } catch (e) {
      console.log(e);
    }
  };

  async componentDidMount() {
    this.fetchBusStopSchedule(false);

    this.startInterval();
  }

  componentDidUpdate() {
    clearInterval(this.timer);
    this.startInterval();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  fetchBusStopSchedule = async manualRefresh => {
    this.loading(true, manualRefresh);

    const busStop = this.props.navigation.getParam('currentBusStop', null);
    // const KP = this.props.navigation.getParam('KP', null);
    let busStopSchedule = null;

    try {
      busStopSchedule = await KiedyPrzyjedzie.getBusStopSchedule(busStop);
    } catch (e) {
      console.log(e);
    }

    this.setState({
      BusStopSchedule: busStopSchedule || null,
    });

    this.loading(false);
  };

  render() {
    // console.log('render');
    // console.log(this.state.BusStopSchedule);

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={() => this.fetchBusStopSchedule(true)}
            />
          }
        >
          {this.state.BusStopSchedule &&
            this.state.BusStopSchedule.map((schedule, index) => {
              return (
                <View key={index} style={styles.list}>
                  <ScheduleEntry scheduleData={schedule} />
                  <Divider />
                </View>
              );
            })}

          {!this.state.BusStopSchedule.length && !this.state.loading && (
            <View style={styles.noDepartures}>
              <MaterialCommunityIcons name="bus-side" color="#aaa" size={200} />
              <Text style={{ color: '#444' }}>
                Brak odjazdów w ciągu najbliższych 4 godzin
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  noDepartures: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
