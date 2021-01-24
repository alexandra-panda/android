import React, { FC, ReactElement } from 'react'
import { StatusBar, Dimensions, StyleSheet, ScrollView, GestureResponderEvent } from 'react-native'
import { StackHeaderProps } from '@react-navigation/stack'

import { HeaderButton } from '@/components/header/HeaderButton'

import { routes } from '@/routes/routes'

import constants from '@/components/header/constants'

type HeaderPropsType = StackHeaderProps

export const Header: FC<HeaderPropsType> = ({ navigation }): ReactElement => {
  const buttonOnClickFunc = function (e: GestureResponderEvent, routeName: string) {
    navigation.navigate(routeName)
  }

  return (
    <ScrollView
      horizontal={true}
      style={styles.scrollWrapper}
      contentContainerStyle={styles.elementsContainer}
    >
      <StatusBar hidden={true} />

      {Object.keys(routes)
        .filter((key) => routes[key].isHeaderButton)
        .map((key) => (
          <HeaderButton
            key={key}
            routeDir={routes[key].routeName}
            title={routes[key].headerButtonName as string}
            onClickHandler={buttonOnClickFunc}
          />
        ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollWrapper: {
    width: Dimensions.get('window').width,
    height: constants.defaultHeaderHeight,
    backgroundColor: '#256E7B',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  elementsContainer: {
    backgroundColor: 'transparent',
    height: constants.defaultHeaderHeight,
  },
})
