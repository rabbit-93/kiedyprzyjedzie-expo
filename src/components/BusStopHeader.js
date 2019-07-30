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
    const favoriteBusStopList = busStopsStore.favoriteBusStops;
    console.log(favoriteBusStops);

    const favorite = favoriteBusStopList.find(bs => bs === busStop);
    console.log('favorite: ' + favorite);
    busStopsStore.addFavoriteBusStop(busStop);

    // if (!favorite) {
    // } else {
    //   favoritesStore.removeFavoriteBusStop(busStop.id);
    // }
  };

  dupa = 0;

  render() {
    const { busStopsStore, busStop } = this.props;
    // await busStopsStore.getFavorites();
    const favorite = busStopsStore.favoriteBusStops.find(bs => bs === busStop);
    // const favorite = false;
    this.dupa += 1;
    console.log('Header ' + this.dupa);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{busStop.name}</Text>
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
    marginRight: 10
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333333'
  }
});
