import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import KiedyPrzyjedzie from '../kp_api';
import BusStopHeader from '../components/BusStopHeader';
import ScheduleEntry from '../components/ScheduleEntry';

export default class BusStopScheduleScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   const busStop = navigation.getParam('currentBusStop', 'Odjazdy');
  //   return {
  //     title: busStop.name
  //   };
  // };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <BusStopHeader busStop={navigation.getParam('currentBusStop', null)} />
      )
    };
  };

  state = {
    BusStopSchedule: [],
    loading: true
  };

  async componentDidMount() {
    const busStop = this.props.navigation.getParam('currentBusStop', null);
    // const KP = this.props.navigation.getParam('KP', null);

    const busStopSchedule = await KiedyPrzyjedzie.getBusStopSchedule(busStop);
    this.setState({
      BusStopSchedule: busStopSchedule,
      loading: false
    });
  }

  render() {
    // console.log('render');
    // console.log(this.state.BusStopSchedule);

    const { BusStopSchedule, loading } = this.state;

    if (BusStopSchedule.length === 0 && loading === false) {
      return (
        <View style={styles.container}>
          <Text>Brak odjazdów</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            {BusStopSchedule.map((schedule, index) => {
              return (
                <View key={index}>
                  <ScheduleEntry scheduleData={schedule} />
                  <Divider />
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
    // paddingBottom: 10
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});
