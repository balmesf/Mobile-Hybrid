import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

const MoviePreview = (props) => {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={ () => props.action(props.movie.id) }>
        <View style={ styles.movie }>
          <View style={ styles.moviePicture }>
            <Image
              resizeMode="cover"
              source={ {uri: props.movie.picture_url} }
              style={ {flex:1} }/>
          </View>
          <View style={ styles.movieData }>
            <Text style={ styles.mediumTitle }>{ props.movie.title }</Text>
            <View style={ styles.movieRate }>
              <Text style={ [styles.subtitle, {color:'black', fontWeight:'bold'}] }>{ props.movie.vote_average } / 10</Text>
              <FontAwesome
                name="star"
                size={15}
                style={ styles.starIcon }
                color="rgb(246, 212, 64)"
              />
            </View>
            <Text style={ styles.subtitle }>
              {/* {
                props.movie.genre.map((genre, index) => {
                  return (
                    <Text key={ index }>{ genre }&nbsp;</Text>
                  )
                })
              } */}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
  movie: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    height:130,
    paddingTop:15,
    paddingBottom:15,
    borderBottomWidth:1,
    borderColor:'rgb(238, 238, 238)'
  },

  moviePicture: {
    width:80,
    height:80,
    borderRadius:10,
    backgroundColor:'rgb(242, 242, 242)',
    shadowOffset: {
      width: 0, height: 15
    },
    shadowColor: 'rgb(227, 227, 227)',
    overflow:'hidden',
    shadowRadius: 10,
    shadowOpacity: .25
  },

  movieData: {
    flex:1,
    height:80,
    paddingLeft:20,
    justifyContent:'space-between'
  },

  movieRate: {
    flexDirection:'row',
    alignItems:'center'
  },

  starIcon: {
    marginLeft:3
  },

  mediumTitle: {
    fontSize:25,
    color:'black',
    fontWeight:'bold'
  },

  subtitle: {
    fontSize:14,
    color:'rgb(214, 214, 214)',
    fontWeight:'500'
  }
})

export default MoviePreview
