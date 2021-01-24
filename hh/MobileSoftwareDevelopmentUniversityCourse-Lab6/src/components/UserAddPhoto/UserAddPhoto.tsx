import React, { ReactElement } from 'react'
import { View } from 'react-native'
import Svg, { Circle, Path, Text } from 'react-native-svg'

export const UserAddPhoto = (): ReactElement => {
  const color = 'rgb(144, 164, 173)'

  return (
    <View>
      <Svg width="150" height="150">
        <Circle cx="75" cy="75" r="75" strokeDasharray="4 4" strokeWidth="1" stroke={color} />
        <Svg width="150" height="150" stroke="black" color="green" viewBox="-200 -100 900 900">
          <Path
            d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
            strokeWidth="17"
            stroke={color}
          />
          <Path
            d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
            strokeWidth="17"
            stroke={color}
          />
        </Svg>
        <Svg height="60" width="200">
          <Text
            fill={'rgb(92, 92, 92)'}
            stroke={color}
            fontSize="90"
            x="250"
            y="600"
            textAnchor="middle"
          >
            ADD PHOTOS
          </Text>
        </Svg>
      </Svg>
    </View>
  )
}
