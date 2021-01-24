import React, { PropsWithChildren, ReactElement } from 'react'
import { ImageBackground, StatusBar } from 'react-native'
import { StyleSheet } from 'react-native'
import bg from '@/assets/bg01.png'

type AppLayoutPropType = PropsWithChildren<unknown>

export const AppLayout = (props: AppLayoutPropType): ReactElement => {
  return (
    <ImageBackground source={bg} style={styles.image}>
      <StatusBar backgroundColor={'rgb(8, 218, 95)'} hidden />
      {props.children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
})
