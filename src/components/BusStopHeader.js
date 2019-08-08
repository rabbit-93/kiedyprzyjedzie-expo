import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

@inject('busStopsStore')
@observer
export default class BusStopHeader extends Component {
  _handleClickFavorite = () => {
    console.log('_handleClickFavorite');

    const { busStopsStore, busStop } = this.props;
    const isFavorite = busStopsStore.favorites.find(f => f === busStop.id);

    if (isFavorite) busStopsStore.removeFavoriteBusStop(busStop.id);
    else busStopsStore.addFavoriteBusStop(busStop.id);
  };

  render() {
    const { busStopsStore, busStop, loading } = this.props;
    const favorite = busStopsStore.favorites.find(f => f === busStop.id);
    // const favorite = false;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {busStop.name} ({busStop.number})
        </Text>
        <Text>{loading && 'L'}</Text>
        <TouchableOpacity onPress={this._handleClickFavorite}>
          <Icon name={favorite ? 'star' : 'star-o'} size={20} color="#333333" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
  },
});
