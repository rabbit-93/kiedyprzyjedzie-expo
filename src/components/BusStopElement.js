import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class BusStopElement extends React.PureComponent {
  render() {
    const { busStop, onPress } = this.props;
    const fontSize = parseInt(busStop.name.length) <= 30 ? 16 : 15;

    return (
      <TouchableOpacity onPress={() => onPress(busStop)}>
        <View style={styles.container}>
          <Text style={{ ...styles.text, fontSize: fontSize }}>
            {busStop.name}
          </Text>
          <Text style={{ ...styles.text, fontSize: 16 }}>{busStop.number}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderColor: '#eeeeee'
  },
  text: {
    // fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#333333',
  },
});
