import React, { ReactElement } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Svg, { Path } from 'react-native-svg'

type BackArrowPropType = {
  onClick: () => void
}

export class BackArrow extends React.Component<BackArrowPropType> {
  constructor(props: BackArrowPropType) {
    super(props)
  }

  render(): ReactElement {
    return (
      <TouchableOpacity onPress={this.props.onClick} activeOpacity={0.7}>
        <View>
          <Svg width="30" height="30" stroke="white" color="green" viewBox="-16 -16 544 544">
            <Path
              d="M244 400L100 256l144-144M120 256h292"
              strokeWidth="48"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      </TouchableOpacity>
    )
  }
}
