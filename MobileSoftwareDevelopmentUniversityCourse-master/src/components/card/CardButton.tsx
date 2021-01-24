import React, { FC, ReactElement } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export type CardButtonPropType = {
  title: string
  onClickHandler: () => void
}

export const CardButton: FC<CardButtonPropType> = (props): ReactElement => {
  return (
    <TouchableOpacity
      onPress={props.onClickHandler}
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
    flex: 0,
    backgroundColor: '#7a9ea3',
    paddingHorizontal: 9,
    paddingVertical: 6,
    marginVertical: 8,
    marginHorizontal: 5,
    borderRadius: 2,
    maxWidth: 90,
    minWidth: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customBtnText: {
    fontSize: 16,
    color: '#fff',
  },
})
