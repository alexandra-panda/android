import { rootGreenColor } from '@/constants'
import React, { ReactElement } from 'react'
import { View, StyleSheet, Text } from 'react-native'

type RequestDetailsPropType = {
  name: string
  desease: string
  location: string
  description: string
}

export const RequestDetails = (props: RequestDetailsPropType): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, color: rootGreenColor, marginTop: 15 }}>Request Details</Text>
      <Text style={styles.title}>Name</Text>
      <Text style={styles.text}>{props.name}</Text>
      <Text style={styles.title}>Desease</Text>
      <Text style={styles.text}>{props.desease}</Text>
      <Text style={styles.title}>Location</Text>
      <Text style={styles.text}>{props.location}</Text>
      <Text style={styles.title}>Description</Text>
      <Text style={styles.text}>{props.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '700',
    marginTop: 25,
    color: 'rgb(56,71,78)',
    fontSize: 18,
  },
  text: {
    marginTop: 12,
    color: 'rgb(96,123,140)',
    lineHeight: 24,
    fontSize: 18,
  },
})
