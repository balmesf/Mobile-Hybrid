import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import { ExpoConfigView } from '@expo/samples'

import { NavigationActions } from 'react-navigation'
import Button from 'apsl-react-native-button'

const navigateAction = NavigationActions.navigate({
  routeName: 'Auth',
  params: {}
})

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    header:null
  };

  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  async handleLogout() {
    try {
      const authToken = await AsyncStorage.getItem('@MovieApp:authToken');
      if (authToken !== null) {
        fetch('https://mobile-hybride.herokuapp.com/logout', {
          method: 'GET',
          headers:{
            Authorization: authToken
          }
        })
        .then((response) => response.json())
        .then(async (responseJson) => {
          console.log('LOGOUT SUCCESS RESPONSE: ', responseJson)
          if (responseJson.status_code < 200 || responseJson.status_code >= 400) {
            console.log('ERROR STATUS LOGOUT')
            // this.setState({ error: responseJson.message, loading: false })
            return
          }
          try {
            await AsyncStorage.setItem('@MovieApp:authToken', '')
            // this.setState({ error: false, loading: false })
            this.props.navigation.dispatch(navigateAction)
          } catch (error) {
            // this.setState({ error: 'Sorry a problem occurs, try again.', loading: false })
          }
        })
        .catch((error) => {
          console.log('LOGOUT ERROR RESPONSE: ', error)
          // this.setState({ error: 'Sorry a problem occurs, try again.', loading: false })
        })
      }
      return
    } catch(e) {
      return
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Button
          onPress={ () => this.handleLogout() }
          style={ styles.button }
          textStyle={ styles.buttonText }>
          <Text style={ styles.buttonText }>Logout</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center'
  },

  button: {
    alignSelf:'center',
    paddingHorizontal:20,
    height:40,
    marginTop:5,
    borderColor:'transparent',
    borderRadius:10,
    backgroundColor:'rgba(0, 0, 0, 0.25)'
  },

  buttonText: {
    fontSize:14,
    color:'white',
    fontWeight:"bold"
  }
})
