import { observable, computed, action, createTransformer } from 'mobx';
import { AsyncStorage } from 'react-native';

export default class BusStopsStore {
  @observable busStops = [];
  @observable favorites = [];
  @observable searchBusStops = [];
  @observable isSearching = false;

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

  get isSearching() {
    return this.isSearching;
  }

  @action filterBusStops(text) {
    // if (!this.favorites.find(id => id === busStopID))
    //   this.favorites.push(busStopID);
    // // saveFavorites();
    console.log('@action filterBusStops');
    this.isSearching = true;

    this.searchBusStops = this.busStops.filter(bs => bs.name.includes(text));
  }

  @action closeSearch() {
    console.log('@action closeSearch');
    this.isSearching = false;
  }

  addBusStops(busStops) {
    console.log('addBusStops');
    this.busStops = busStops;
  }

  @action addFavoriteBusStop(busStopID) {
    if (!this.favorites.find(id => id === busStopID))
      this.favorites.push(busStopID);
    // saveFavorites();
  }

  @action removeFavoriteBusStop(busStopID) {
    this.favorites = this.favorites.filter(elem => elem !== busStopID);
    // saveFavorites();
  }
}
