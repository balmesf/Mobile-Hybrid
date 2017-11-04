import { Notifications } from 'expo';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import AuthTabNavigator from './AuthTabNavigator';
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = (authToken) => StackNavigator(
  {
    Auth: {
      screen: AuthTabNavigator
    },
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    initialRouteName: authToken ? 'Main' : 'Auth',
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      gesturesEnabled: false
    }),
  }
);

export default class RootNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authToken: null
    }
  }

  async componentDidMount() {
    const authToken = await AsyncStorage.getItem('@MovieApp:authToken');
    this.setState({ authToken })
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    const RootStackNav = RootStackNavigator(this.state.authToken)
    return <RootStackNav />
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}
