import React, { FunctionComponent, ReactElement } from 'react'
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ImageSourcePropType,
  GestureResponderEvent,
} from 'react-native'
import homeImg from '@/assets/Home.png'
import notificationImg from '@/assets/Notification.png'
import profileImg from '@/assets/Profile.png'
import scheduleImg from '@/assets/Schedule.png'

import homeImgGreen from '@/assets/Homeg.png'
import notificationImgGreen from '@/assets/Notificationg.png'
import profileImgGreen from '@/assets/Profileg.png'
import scheduleImgGreen from '@/assets/Scheduleg.png'

import redPoint from '@/assets/redPoint.png'
import { rootGreenColor } from '@/constants'

type BottomMenuItem = {
  withRedPoint?: boolean
  iconColor: 'grey' | 'green'
  width: number
  height: number
  type: 'Notification' | 'Profile' | 'Schedule' | 'Home'
  onClick: (event: GestureResponderEvent) => void
}

export const BottomMenuItem: FunctionComponent<BottomMenuItem> = (
  props: BottomMenuItem,
): ReactElement => {
  let icon: ImageSourcePropType
  let gIcon: ImageSourcePropType

  switch (props.type) {
    case 'Home':
      icon = homeImg
      gIcon = homeImgGreen
      break
    case 'Profile':
      icon = profileImg
      gIcon = profileImgGreen
      break
    case 'Schedule':
      icon = scheduleImg
      gIcon = scheduleImgGreen
      break
    case 'Notification':
      icon = notificationImg
      gIcon = notificationImgGreen
      break
    default:
      throw new Error('Unknown prop.type value for BottomMenuItem component.')
  }

  const isGreen = props.iconColor === 'green'

  return (
    <TouchableOpacity
      onPress={props.onClick}
      activeOpacity={0.7}
      delayLongPress={1}
      delayPressIn={1}
      delayPressOut={1}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ maxHeight: props.height, maxWidth: props.width }}
          source={isGreen ? gIcon : icon}
        />
        {props.withRedPoint ? (
          <Image style={{ position: 'absolute', right: 17, top: 4 }} source={redPoint} />
        ) : null}
        <Text style={{ color: isGreen ? rootGreenColor : 'grey', fontSize: 12 }}>{props.type}</Text>
      </View>
    </TouchableOpacity>
  )
}
