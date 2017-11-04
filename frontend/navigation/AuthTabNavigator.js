import React from 'react';
import { Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import SignInScreen from '../screens/SignInScreen';

export default TabNavigator(
  {
    SignIn: {
      screen: SignInScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    }),
    animationEnabled: false
  }
);
