import React from 'react';
import { Provider } from 'mobx-react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { useScreens } from 'react-native-screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import stores from './src/stores';
import AllBusStopsScreen from './src/screens/AllBusStopsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import MapScreen from './src/screens/MapScreen';
import BusStopScheduleScreen from './src/screens/BusStopScheduleScreen';

useScreens();

const BusStopsStack = createStackNavigator(
  {
    AllBusStops: { screen: AllBusStopsScreen },
    BusStopSchedule: { screen: BusStopScheduleScreen },
  },
  {
    navigationOptions: {
      tabBarLabel: 'Przystanki',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="bus" color={tintColor} size={20} />
        // <MaterialCommunityIcons name="bus" color={tintColor} size={25} />
      ),
    },
  }
);

const MapStack = createStackNavigator(
  {
    Map: { screen: MapScreen },
    BusStopSchedule: { screen: BusStopScheduleScreen },
  },
  {
    navigationOptions: {
      tabBarLabel: 'Mapa',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="map" color={tintColor} size={20} />
      ),
    },
  }
);

const FavoritesStack = createStackNavigator(
  {
    Favorites: { screen: FavoritesScreen },
    BusStopSchedule: { screen: BusStopScheduleScreen },
  },
  {
    navigationOptions: {
      tabBarLabel: 'Ulubione',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="star" color={tintColor} size={20} />
      ),
    },
  }
);

const BottomTabNavigator = createMaterialBottomTabNavigator(
  {
    BusStopsStack,
    MapStack,
    FavoritesStack,
  },
  {
    initialRouteName: 'BusStopsStack',
    activeTintColor: '#ffffff',
    // inactiveColor: '#cfd8dc',
    inactiveTintColor: '#a9e1fc',
    barStyle: { backgroundColor: '#039be5' },
    shifting: false,
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
