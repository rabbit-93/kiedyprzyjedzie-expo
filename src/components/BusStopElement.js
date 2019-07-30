import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class BusStopElement extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress(this.props.busStop)}>
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.busStop.name}</Text>
          <Text style={styles.text}>{this.props.busStop.number}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
    // borderBottomWidth: 1,
    // borderColor: '#eeeeee'
  },
  text: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#333333'
  }
});
