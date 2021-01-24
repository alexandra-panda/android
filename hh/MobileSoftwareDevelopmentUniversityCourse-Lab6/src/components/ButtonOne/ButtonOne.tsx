import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { StyleSheet, Text, View, Dimensions, GestureResponderEvent, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

type ButtonOnePropType = {
  bgColor: string
  borderColor: string
  textColor?: string
  fullWidth?: boolean
  style?: ViewStyle

  onClick: (e: GestureResponderEvent) => void
} & PropsWithChildren<unknown>

export const ButtonOne: FC<ButtonOnePropType> = (props): ReactElement => {
  const textColor = props.textColor || 'rgb(8, 218, 95)'
  const customStyles = props.style ? props.style : {}

  return (
    <TouchableOpacity
      onPress={props.onClick}
      activeOpacity={0.7}
      style={{
        ...styles.headerButton,
        backgroundColor: props.bgColor,
        borderColor: props.borderColor,
        width: props.fullWidth ? '100%' : Dimensions.get('screen').width * 0.8,
        ...customStyles,
      }}
    >
      <View>
        <Text style={{ ...styles.customBtnText, color: textColor }}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  headerButton: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 2,
    height: 55,
    borderRadius: 50,
    minWidth: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
