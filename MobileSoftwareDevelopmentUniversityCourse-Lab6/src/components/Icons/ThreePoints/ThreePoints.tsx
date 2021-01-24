import React, { ReactElement } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Svg, { Circle } from 'react-native-svg'

type ThreePointsPropType = {
  onClick: () => void
}

export class ThreePoints extends React.Component<ThreePointsPropType> {
  constructor(props: ThreePointsPropType) {
    super(props)
  }

  render(): ReactElement {
    return (
      <TouchableOpacity onPress={this.props.onClick} activeOpacity={0.7}>
        <View>
          <Svg width="30" height="30" stroke="white" color="green" viewBox="0 0 512 512">
            <Circle fill="white" cx="96" cy="256" r="48" strokeMiterlimit="10" />
            <Circle fill="white" cx="256" cy="256" r="48" strokeMiterlimit="10" />
            <Circle fill="white" cx="416" cy="256" r="48" strokeMiterlimit="10" />
          </Svg>
        </View>
      </TouchableOpacity>
    )
  }
}
