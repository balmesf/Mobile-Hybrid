import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

const CinemaPreview = (props) => {
    return (
      <View style={ styles.cinema }>
        <View style={ styles.cinemaPicture }>
          <Image
            resizeMode="cover"
            source={ require('../assets/images/logo.png') }
            style={ {flex:1} }/>
        </View>
        <View style={ styles.cinemaData }>
          <Text style={ styles.mediumTitle }>{ props.cinema.fields.nom_etablissement }</Text>
          <Text style={ [styles.subtitle, {color:'rgb(219, 219, 219)', fontWeight:'bold'}] }>
            { props.cinema.fields.adresse }
          </Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  cinema: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    height:80,
    padding:5
  },

  cinemaPicture: {
    width:70,
    height:70,
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

  cinemaData: {
    height:70,
    padding:10,
    alignItems:'center',
    justifyContent:'space-between'
  },

  icon: {
    marginLeft:3
  },

  mediumTitle: {
    fontSize:20,
    color:'black',
    fontWeight:'bold'
  },

  subtitle: {
    fontSize:14,
    color:'rgb(214, 214, 214)',
    fontWeight:'500'
  }
})

export default CinemaPreview
