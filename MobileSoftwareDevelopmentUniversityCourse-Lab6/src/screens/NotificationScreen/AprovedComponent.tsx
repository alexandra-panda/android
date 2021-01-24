import React, { ReactElement } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import aproveImg from '@/assets/aproveImg.png'

type AproveComponentPropType = {
  description: string
}

export function AproveComponent(props: AproveComponentPropType): ReactElement {
  return (
    <View style={aproveStyles.container}>
      <Image style={aproveStyles.img} source={aproveImg} />
      <Text style={aproveStyles.statusText}>Your Request Has Been Approved</Text>
      <Text style={aproveStyles.descriptionText}>{props.description}</Text>
    </View>
  )
}

const aproveStyles = StyleSheet.create({
  container: {
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 150,
    height: 150,
  },
  statusText: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
    marginTop: 30,
    color: 'rgb(56,71,78)',
  },
  descriptionText: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 14,
    color: 'rgb(96,123,140)',
    lineHeight: 24,
  },
})
