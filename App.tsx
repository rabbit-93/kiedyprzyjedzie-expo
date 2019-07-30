import React from 'react';
import { Provider } from 'mobx-react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import stores from './src/stores';
import AllBusStopsScreen from './src/screens/AllBusStopsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import MapScreen from './src/screens/MapScreen';
import BusStopScheduleScreen from './src/screens/BusStopScheduleScreen';

const BusStopsStack = createStackNavigator({
  AllBusStops: { screen: AllBusStopsScreen },
  BusStopSchedule: { screen: BusStopScheduleScreen }
});

const MapStack = createStackNavigator({
  Map: { screen: MapScreen },
  BusStopSchedule: { screen: BusStopScheduleScreen }
});

const FavoritesStack = createStackNavigator({
  Favorites: { screen: FavoritesScreen },
  BusStopSchedule: { screen: BusStopScheduleScreen }
});

const BottomTabNavigator = createMaterialBottomTabNavigator(
  {
    BusStopsStack,
    MapStack,
    FavoritesStack
  },
  {
    initialRouteName: 'BusStopsStack',
    activeColor: '#ffffff',
    inactiveColor: '#cfd8dc',
    barStyle: { backgroundColor: '#039be5' },
    shifting: false
  }
);

const AppContainer = createAppContainer(BottomTabNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <AppContainer />
      </Provider>
    );
  }
}
