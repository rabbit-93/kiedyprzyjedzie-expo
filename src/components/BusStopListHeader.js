import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Text, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

@inject('busStopsStore')
@observer
export default class BusStopListHeader extends Component {
  _openSearch = () => {
    const { setSearching } = this.props.busStopsStore;
    console.log('_openSearch');
    setSearching(true);
  };

  _closeSearch = () => {
    const {
      setSearching,
      searchText,
      setSearchText,
    } = this.props.busStopsStore;

    console.log('_closeSearch');
    if (searchText !== '') {
      searchText('');
    } else {
      setSearching(false);
    }
  };

  _onChangeText = text => {
    const {
      setSearching,
      searchText,
      setSearchText,
      filterBusStops,
    } = this.props.busStopsStore;

    console.log('_onChangeText');
    setSearching(true);
    setSearchText(text);
    // filterBusStops(text.toUpperCase());

    // this.setState({ searchText: text });
  };

  render() {
    const { searching, searchText } = this.props.busStopsStore;

    console.log('header render');

    if (searching) {
      return (
        <View style={styles.container}>
          <View>
            <TextInput
              value={searchText}
              placeholder="Szukaj"
              onChangeText={text => this._onChangeText(text)}
              autoFocus
            />
          </View>
          <TouchableOpacity onPress={this._closeSearch}>
            <Icon name="close" size={22} color="#333333" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Lista przystanków</Text>
          <TouchableOpacity onPress={this._openSearch}>
            <Icon name="search" size={20} color="#333333" />
          </TouchableOpacity>
          {/* <IconButton
            icon="search"
            color="#333333"
            size={20}
            onPress={this._openSearch}
          /> */}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333333',
  },
});
