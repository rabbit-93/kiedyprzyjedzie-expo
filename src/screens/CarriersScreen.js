import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Carriers from '../kp_api/Carriers';

export default class CarriersScreen extends Component {
  static navigationOptions = {
    title: 'Przewoźnicy',
  };

  render() {
    const carriers = Carriers.getCarriers();

    return (
      <View>
        {carriers.map(carrier => (
          <Text>{carrier.name}</Text>
        ))}
      </View>
    );
  }
}
