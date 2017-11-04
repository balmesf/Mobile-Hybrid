import React from 'react'
import { NavigationActions } from 'react-navigation'
import {
  Image,
  Platform,
  TextInput,
  StyleSheet,
  Text,
  TouchableHighlight,
  AsyncStorage,
  View,
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import Button from 'apsl-react-native-button'

const SIGN_IN = 'SIGN_IN'
const SIGN_UP = 'SIGN_UP'

const navigateAction = NavigationActions.navigate({

  routeName: 'Main',

  params: {}
})


export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: null
  }

  constructor(props) {
    super(props)
    this.state = {
      authStep: SIGN_IN,
      username: '',
      password: '',
      confirmPassword: '',
      loading: false
    }

    this.setAuthStep = this.setAuthStep.bind(this)
    this.handleButton = this.handleButton.bind(this)
  }

  setAuthStep() {
    this.setState({
      username: '',
      password: '',
      confirmPassword: '',
      error: false,
      loading:false,
      authStep: this.state.authStep === SIGN_IN ? SIGN_UP : SIGN_IN
    })
  }

  handleButton() {
    if (this.state.authStep === SIGN_IN) {
      if (this.state.username.length > 0 && this.state.password.length > 0) {
        console.log('LOGIN IN...')
        this.setState({ loading: true })
        fetch('https://mobile-hybride.herokuapp.com/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        })
        .then((response) => response.json())
        .then( async (responseJson) => {
          console.log('LOGIN SUCCESS RESPONSE: ', responseJson)
          if (responseJson.status_code < 200 || responseJson.status_code >= 400) {
            console.log('rr')
            this.setState({ error: responseJson.message, loading:false })
            return
          }
          try {
            await AsyncStorage.setItem('@MovieApp:authToken', responseJson.access_token)
            this.setState({ error: false, loading: false })
            this.props.navigation.dispatch(navigateAction)
          } catch (error) {
            this.setState({ error: 'Sorry a problem occurs, try again.', loading:false })
          }
        })
        .catch((error) => {
          console.log('LOGIN ERROR RESPONSE: ', error)
          this.setState({ error: 'Sorry a problem occurs, try again.', loading: false })
        })
        this.setState({ loading: false })
        return
      }
    } else {
      if (this.state.username.length > 0 && (this.state.password.length > 0 && (this.state.password === this.state.confirmPassword))) {
        console.log('SIGNING UP...')
        this.setState({ loading: true })
        fetch('https://mobile-hybride.herokuapp.com/signup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        })
        .then((response) => response.json())
        .then(async (responseJson) => {
          console.log('SIGNUP SUCCESS RESPONSE: ', responseJson)
          if (responseJson.status_code < 200 || responseJson.status_code >= 400) {
            console.log('ERROR STATUS SIGN UP')
            this.setState({ error: responseJson.message, loading: false })
            return
          }
          try {
            await AsyncStorage.setItem('@MovieApp:authToken', responseJson.access_token)
            this.setState({ error: false, loading: false })
            this.props.navigation.dispatch(navigateAction)
          } catch (error) {

            this.setState({ error: 'Sorry a problem occurs, try again.', loading: false })
          }
        })
        .catch((error) => {
          console.log('SIGNUP ERROR RESPONSE: ', error)
          this.setState({ error: 'Sorry a problem occurs, try again.', loading: false })
        })
        return
      }
    }
    this.setState({ error: 'Sorry a problem occurs, try again.' })
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          <TouchableHighlight
            underlayColor="transparent"
            style={ {padding:5} }
            onPress={ () => {} }>
            <View>
              <Text style={ styles.smallTitle }>
                <FontAwesome
                  name="chevron-left"
                  size={15}
                  color="transparent"
                />
              </Text>
            </View>
          </TouchableHighlight>
          <View style={ styles.headerLogo }>
            <Image
              style={ {flex:1} }
              resizeMode='contain'
              source={ require('../assets/images/logo.png') }/>
          </View>
          <Text style={ styles.smallTitle }>
            <FontAwesome
              name="star"
              size={15}
              style={ styles.starIcon }
              color="transparent"
            />
          </Text>
        </View>
        <View style={ styles.signInContent }>
          <View>
            <TextInput
              style={ styles.input }
              keyboardType="email-address"
              placeholder="Username"
              placeholderTextColor="rgb(222, 222, 222)"
              value={ this.state.username }
              onChangeText={ (text) => this.setState({ username: text }) }/>
            <TextInput
              style={ styles.input }
              secureTextEntry
              placeholderTextColor="rgb(222, 222, 222)"
              placeholder="Password"
              value={ this.state.password }
              onChangeText={ (text) => this.setState({ password: text }) }/>
            {
              this.state.authStep === SIGN_UP ? (
                <TextInput
                  style={ styles.input }
                  secureTextEntry
                  placeholderTextColor="rgb(222, 222, 222)"
                  placeholder="Confirm password"
                  value={ this.state.confirmPassword }
                  onChangeText={ (text) => this.setState({ confirmPassword: text }) }/>
              ) : null
            }
            {
              this.state.error ? (
                <Text style={ [styles.link, {textAlign:'center', padding:5, color: 'rgb(232, 44, 44)'}] }>
                  { this.state.error }
                </Text>
              ) : null
            }
            <Button
              onPress={ () => this.handleButton() }
              style={ styles.button }
              isLoading={ this.state.loading }
              textStyle={ styles.buttonText }>
              { this.state.authStep === SIGN_IN ? 'Login' : 'Create account' }
            </Button>
          </View>
          <Text style={ styles.textSeparator }>OU</Text>
          <View style={ {flexDirection:'row', justifyContent:'center', alignItems:'center'} }>
            <Text style={ styles.text }>
              { this.state.authStep === SIGN_IN ? "You don't have an account? " : "You already have an account? "}
            </Text>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={ this.setAuthStep }>
              <Text style={ styles.link }>
                { this.state.authStep === SIGN_IN ? 'Create an account' : 'Login' }
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:30,
    backgroundColor: '#fff'
  },

  header: {
    height:40,
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:20
  },

  headerLogo: {
    width:50,
    height:40,
    overflow:'hidden',
    justifyContent:'center',
    alignItems: 'center'
  },

  input: {
    alignSelf:'stretch',
    height:40,
    marginBottom:15,
    borderBottomWidth:1,
    borderColor:"rgb(222, 222, 222)",
    fontSize:14
  },

  button: {
    alignSelf:'stretch',
    height:40,
    marginTop:5,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black'
  },

  buttonText: {
    fontSize:14,
    color:'white',
    fontWeight:"bold"
  },

  text: {
    fontSize:14
  },

  link: {
    fontSize:14,
    fontWeight:'bold'
  },

  textSeparator: {
    fontSize:14,
    textAlign:'center',
    fontWeight:'bold',
    color: 'rgb(222, 222, 222)'
  },

  signInContent: {
    flex:1,
    alignItems:'stretch',
    justifyContent:'space-around',
    paddingVertical:10,
    paddingHorizontal:30
  }
})
