import React, { FC, ReactElement } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native'

import constants from '@/components/header/constants'

type HeaderButtonPropType = {
  title: string
  onClickHandler: (e: GestureResponderEvent, routeName: string) => void
  routeDir: string
}

export const HeaderButton: FC<HeaderButtonPropType> = (props): ReactElement => {
  return (
    <TouchableOpacity
      onPress={(e) => props.onClickHandler(e, props.routeDir)}
      activeOpacity={0.7}
      style={styles.headerButton}
    >
      <View>
        <Text style={styles.customBtnText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: '#7a9ea3',
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginHorizontal: 5,
    height: constants.defaultHeaderButtonHeight,
    borderRadius: 2,
    maxWidth: 90,
    minWidth: 70,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -constants.defaultHeaderButtonHeight / 2 }],
    top: constants.defaultHeaderHeight / 2,
  },
  customBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
})
