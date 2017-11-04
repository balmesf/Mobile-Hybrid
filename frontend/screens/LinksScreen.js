import React from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { MapView } from 'expo'

import CinemaPreview from '../components/CinemaPreview'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "CineMap",
    header:null
  }

  constructor(props) {
    super(props)
    this.state = {
      cinemas: [],
      error: false
    }
  }

  async componentDidMount() {
    try {
      const authToken = await AsyncStorage.getItem('@MovieApp:authToken');
      if (authToken !== null){
        fetch('https://mobile-hybride.herokuapp.com/cinema', {
          method: 'GET',
          headers:{
            Authorization: authToken
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('GET CINEMAS NEW SUCCESS RESPONSE: ', responseJson)
          this.setState({ cinemas: responseJson })
        })
        .catch((error) => {
          console.log('GET MOVIES NEW ERROR RESPONSE: ', error)
          this.setState({ error: 'Server error, please try again later.' })
        })
      }
    } catch (error) {
      console.log('GET MOVIES NEW ERROR RESPONSE: ', error)
      this.setState({ error: 'Server error, please try again later.' })
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <MapView
          style={{ flex: 1 }}
          followsUserLocation
          showsUserLocation
          showsMyLocationButton
          userLocationAnnotationTitle={""}>
          {
            this.state.cinemas.length > 0 && this.state.cinemas.map((cinema, index) => {
              console.log('CINEMA: ', cinema)
              if (cinema.fields.coordonnees)
                return (
                  <MapView.Marker
                    key={ index }
                    coordinate={{latitude: cinema.fields.coordonnees[0], longitude: cinema.fields.coordonnees[1]}}>
                    <MapView.Callout>
                      <CinemaPreview cinema={ cinema }/>
                    </MapView.Callout>
                  </MapView.Marker>
                )
              else
                return null
            })
          }
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})
