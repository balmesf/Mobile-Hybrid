import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableHighlight,
  View,
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import Button from 'apsl-react-native-button'

import MoviePreview from '../components/MoviePreview'

const MOVIE_LIST = 'MOVIE_LIST'
const MOVIE_DETAIL = 'MOVIE_DETAIL'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Movies",
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      movieStep: MOVIE_LIST,
      movieSelected: null,
      movies: [],
      error: false
    }

    this.selectMovie = this.selectMovie.bind(this)
  }

  async componentDidMount() {
    try {
      const authToken = await AsyncStorage.getItem('@MovieApp:authToken');
      if (authToken !== null){
        fetch('https://mobile-hybride.herokuapp.com/movies/new', {
          method: 'GET',
          headers:{
            Authorization: authToken
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('GET MOVIES NEW SUCCESS RESPONSE: ', responseJson)
          this.setState({ movies: responseJson })
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

  selectMovie(id) {
    this.setState({ movieSelected: this.state.movies.find(movie => movie.id === id), movieStep: MOVIE_DETAIL })
  }

  render() {
    return (
      <View style={ styles.container }>
        {
          this.state.movieStep === MOVIE_LIST ? (
            <View style={ {flex:1, paddingLeft:30, paddingRight:30} }>
              <Text style={ styles.bigTitle }>À l'affiche</Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={ styles.moviesList }>
                {
                  this.state.movies.length > 0 && this.state.movies.map((movie, index) => {
                    return (
                      <MoviePreview
                        key={ index }
                        movie={ movie }
                        action={ this.selectMovie }/>
                    )
                  })
                }
                <Text style={ {paddingVertical:20, color:'rgb(222, 222, 222)', fontWeight:'500', textAlign:'center'} }>
                  { this.state.movies.length <= 0 ? "Sorry, there is no movies to display." : "Vous avez atteint la fin des films à l'affiche." }
                </Text>
              </ScrollView>
            </View>
          ) : (
            <View style={ {flex:1, overflow:'visible'} }>
              <Image
                resizeMode="cover"
                blurRadius={ 10 }
                source={ {uri: this.state.movieSelected.picture_url} }
                style={ {flex: 1} }>
                <View style={ {flex:1, paddingHorizontal:20, paddingTop:20, backgroundColor:'rgba(0, 0, 0, 0.5)'} }>
                  <View style={ styles.movieDetailPictureContainer }>
                    <Image
                      resizeMode="cover"
                      source={ {uri: this.state.movieSelected.picture_url} }
                      style={ styles.movieDetailPicture }/>
                  </View>
                  <View style={ {paddingTop:20, justifyContent:'space-between', alignItems:'flex-start'} }>
                    <View>
                      <View style={ {flexDirection:'row', marginBottom:20, justifyContent:'space-between'} }>
                        <Text style={ [styles.mediumTitle, { paddingRight: 10 }] }>
                          { this.state.movieSelected.title }
                        </Text>
                        <View style={ {flexDirection:'row', alignItems:'center'} }>
                          <Text style={ [styles.mediumTitle, {color:'white'}] }>
                            { this.state.movieSelected.vote_average } / 10
                          </Text>
                          <FontAwesome
                            name="star"
                            size={15}
                            style={ styles.starIcon }
                            color="rgb(246, 212, 64)"
                          />
                        </View>
                      </View>
                      <View style={ {marginBottom:10} }>
                        <Text
                          style={ [styles.smallTitle, {fontWeight:'normal', color:'rgb(237, 237, 237)'}] }>
                          { this.state.movieSelected.overview }
                        </Text>
                      </View>
                    </View>
                    <View style={ {flexDirection:'row', justifyContent:'center', alignItems:'center'} }>
                      <Button
                        onPress={ () => this.setState({ movieStep: MOVIE_LIST }) }
                        style={ styles.button }
                        textStyle={ styles.buttonText }>
                        <Text style={ styles.buttonText }>RETOUR</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </Image>
            </View>
          )
        }
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

  moviesList: {
    flex:1
  },

  bigTitle: {
    fontSize:30,
    color:'black',
    fontWeight:'bold'
  },

  mediumTitle: {
    fontSize:25,
    color:'white',
    fontWeight:'bold'
  },

  smallTitle: {
    fontSize:15,
    color: 'black',
    fontWeight:'bold'
  },

  movieDetailPictureContainer: {
    flex:1,
    overflow:'visible',
    shadowOffset: {
      width: 0, height: 10
    },
    borderRadius:10,
    shadowColor: 'red',
    overflow:'hidden',
    shadowRadius: 5,
    shadowOpacity: 1
  },

  movieDetailPicture: {
    flex: 1
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
  },
})
