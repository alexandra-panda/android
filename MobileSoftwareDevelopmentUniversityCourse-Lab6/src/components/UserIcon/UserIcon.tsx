import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

export const UserIcon = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Svg width="30" height="30" stroke="white" color="green" viewBox="-16 -16 544 544">
        <Path
          d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
          strokeWidth="24"
          stroke={'white'}
        />
        <Path
          d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
          strokeWidth="24"
          stroke={'white'}
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 22,
    left: 10,
  },
})
