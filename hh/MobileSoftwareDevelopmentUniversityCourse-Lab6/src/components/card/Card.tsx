import React, { ReactElement } from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'

import { CardButton } from './CardButton'

const CARD_DEFAULT_BF_COLOR = '#c9cedd'
const CARD_DEFAULT_TXT_COLOR = 'black'

type CardPropType = {
  author: string
  id: number
  base64Image: string
  onInfoClick: () => void
  bgColor?: string
  txtColor?: string
}

export function Card(props: CardPropType): ReactElement {
  const bgColor = props.bgColor || CARD_DEFAULT_BF_COLOR
  const txtColor = props.txtColor || CARD_DEFAULT_TXT_COLOR
  const img = props.base64Image ? (
    <Image style={styles.image} source={{ uri: `data:image/gif;base64,${props.base64Image}` }} />
  ) : null

  return (
    <View style={{ ...styles.container, ...{ backgroundColor: bgColor } }}>
      <Text style={{ ...styles.title, ...{ color: txtColor } }}>Post number: {props.id}</Text>
      <Text style={{ ...styles.author, ...{ color: txtColor } }}>Author: {props.author}</Text>
      {img}
      <CardButton title="Info" onClickHandler={props.onInfoClick} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 5,
    paddingBottom: 10,
    minHeight: 300,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 17,
    fontStyle: 'italic',
  },
  image: {
    flex: 1,
    width: Dimensions.get('screen').width > 320 ? 320 : Dimensions.get('screen').width * 0.9,
    height: 240,
  },
})
