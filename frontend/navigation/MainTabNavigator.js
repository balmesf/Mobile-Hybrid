import React from 'react';
import { Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Links: {
      screen: LinksScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = Platform.OS === 'ios'
              ? 'film'
              : 'film'
            break;
          case 'Links':
            iconName = Platform.OS === 'ios'
              ? 'map-marker'
              : 'map-marker'
            break;
          case 'Settings':
            iconName = Platform.OS === 'ios'
              ? 'cog'
              : 'cog'
        }
        return (
          <FontAwesome
            name={iconName}
            size={22}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: true
  }
);
