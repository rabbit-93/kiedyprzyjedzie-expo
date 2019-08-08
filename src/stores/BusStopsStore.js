import { observable, computed, action, createTransformer } from 'mobx';
import { AsyncStorage } from 'react-native';

export default class BusStopsStore {
  @observable busStops = [];
  @observable favorites = [];
  @observable searchBusStops = [];
  @observable isSearching = false;
  @observable searchText = '';

  get busStops() {
    console.log('get busStops()');
    return this.busStops;
  }

  get favorites() {
    return this.favorites;
  }

  get searchBusStops() {
    console.log('get searchBusStops');

    return this.searchBusStops;
  }

  get searchText() {
    console.log('get searchText()');

    return this.searchText;
  }

  set searchText(text) {
    this.searchText = text;
  }

  @computed
  get searching() {
    console.log('get searching: ' + this.isSearching);
    return this.isSearching;
  }

  @action
  setSearching(searching) {
    this.isSearching = searching;
    console.log('setSearching: ' + this.isSearching);
  }

  @computed
  get filteredBusStops() {
    if (this.searchText === '') {
      return this.busStops;
    }

    return this.busStops.filter(
      bs =>
        bs.name.includes(this.searchText) ||
        bs.number === parseInt(this.searchText.trim())
    );
  }

  filterBusStops(phrase) {
    return this.busStops.filter(
      bs => bs.name.includes(phrase) || bs.number === parseInt(phrase.trim())
    );
  }

  closeSearch() {
    console.log('@action closeSearch');
    this.isSearching = false;
  }

  addBusStops(busStops) {
    console.log('addBusStops');
    this.busStops = busStops;
  }

  @action
  addFavoriteBusStop(busStopID) {
    if (!this.favorites.find(id => id === busStopID))
      this.favorites.push(busStopID);
    // saveFavorites();
  }

  @action
  removeFavoriteBusStop(busStopID) {
    this.favorites = this.favorites.filter(elem => elem !== busStopID);
    // saveFavorites();
  }
}
