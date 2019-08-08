import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ScheduleEntry extends React.PureComponent {
  render() {
    const {
      lineNumber,
      directionName,
      time,
      isEstimated,
      atStop,
    } = this.props.scheduleData;

    const fontSize = directionName.length > 30 ? 12 : 14;

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...styles.text, ...styles.lineNumber }}>
            {lineNumber}
          </Text>
          <Text style={{ ...styles.text, fontSize: fontSize }}>
            {directionName}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isEstimated && <Icon name="my-location" size={15} color="#555" />}
          <Text style={{ ...styles.text, ...styles.time }}>
            {atStop ? '>>>' : time}
          </Text>
        </View>
      </View>
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
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#333333',
  },
  lineNumber: {
    width: 40,
    paddingRight: 10,
    fontWeight: 'bold',
  },
  time: {
    width: 60,
    textAlign: 'right',
    // paddingLeft: 10,
  },
});
