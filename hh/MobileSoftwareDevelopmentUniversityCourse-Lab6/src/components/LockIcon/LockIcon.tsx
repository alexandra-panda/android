import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg'

export const LockIcon = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Svg width="30" height="30" stroke="white" color="green" viewBox="0 0 512 512">
        <Path
          d="M336 208v-95a80 80 0 00-160 0v95"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={'white'}
        />
        <Rect
          strokeWidth="24"
          x="96"
          y="208"
          height="272"
          width="300"
          rx="48"
          ry="48"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Rect
          strokeWidth="24"
          x="240"
          y="350"
          height="72"
          width="20"
          rx="48"
          ry="48"
          strokeLinecap="round"
          strokeLinejoin="round"
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
