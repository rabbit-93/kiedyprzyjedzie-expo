import { observable, computed, action, createTransformer } from 'mobx';
import { AsyncStorage } from 'react-native';

export default class FavoritesStore {
  @observable favorites = [];

  favoritesCache = new Map();

  get favorites() {
    return this.favorites;
  }

  // @computed get isFavorite() {
  //   return createTransformer(busStop => this.favorites.includes(busStop));
  // }

  @action addFavoriteBusStop(busStopID) {
    if (!this.favorites.find(id => id === busStopID))
      this.favorites.push(busStopID);
    // saveFavorites();
  }

  @action removeFavoriteBusStop(busStopID) {
    this.favorites = this.favorites.filter(elem => elem !== busStopID);
    // saveFavorites();
  }

  isFavorite = busStopID => {
    const computedFilter = computed(() => this.favorites.includes(busStopID));

    this.favoritesCache.set(busStopID, computedFilter);

    return this.favoritesCache.get();
  };

  async saveFavorites() {
    try {
      await AsyncStorage.setItem('@FavoritesStore:favorites', this.favorites);
    } catch (e) {
      console.error(e);
    }
  }
}
