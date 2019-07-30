import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class BusStopElement extends React.PureComponent {
  render() {
    const { lineNumber, directionName, time } = this.props.scheduleData;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{lineNumber}</Text>
        <Text style={styles.text}>{directionName}</Text>
        <Text style={styles.text}>{time}</Text>
      </View>
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
