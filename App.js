import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert, Animated, Easing } from 'react-native';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer, createStackNavigator  } from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import registerForNotifications from './services/push_notifications';
import {store, persistor } from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';
import ModalScreen from './screens/ModalScreen';

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
 }
}

const MainNavigator = createBottomTabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: {
    screen: createBottomTabNavigator({
      map: { screen: MapScreen },
      deck: { screen: DeckScreen },
      Reviews: createStackNavigator({
        review: {screen: ReviewScreen},
        settings: {screen: SettingsScreen}
      })
    },{
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'map':
          iconName = 'my-location';
          break;
        case 'deck':
          iconName = 'description';
          break;
        case 'Reviews':
          iconName = 'favorite'
          break;
        default:
          iconName = 'home';
          break;
      }
      return (
        <Icon
          size={22}
          name={iconName}
          color={tintColor}
        />
      );
    },
    tabBarOnPress: ({ navigation, defaultHandler }) => {
        if (
          navigation.state.routeName === "deck"
        ) {
          return null;
        }
        defaultHandler();
      },
  }),
    })
  }
}, {
  defaultNavigationOptions:{
    tabBarVisible: false
  },
  lazy: true
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainNavigator,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transparentCard: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const thisSceneIndex = scene.index;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [1, 1, 0.5],
        });

        return { opacity, transform: [{ translateY }] };
      },
    })
  }
);

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
