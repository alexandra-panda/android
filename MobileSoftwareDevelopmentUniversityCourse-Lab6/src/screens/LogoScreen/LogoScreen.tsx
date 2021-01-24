import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { FC, ReactElement } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { routeNames } from '@/routes/routeNames'
import { AppLayout } from '@/components/Layout/AppLayout'

type LogoScreenPropType = {
  navigation: NavigationProp<ParamListBase>
}

export const LogoScreen: FC<LogoScreenPropType> = (props: LogoScreenPropType): ReactElement => {
  React.useEffect(() => {
    // setTimeout(() => {
    //   props.navigation.navigate(routeNames.WelcomeScreen)
    // }, 1540)
  }, [])

  const onClickHandler = React.useCallback(() => {
    props.navigation.navigate(routeNames.WelcomeScreen)
  }, [])

  return (
    <AppLayout>
      <View style={styles.container} onTouchEnd={onClickHandler}>
        <Text style={styles.logo}>Telemedicine</Text>
      </View>
    </AppLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    marginTop: 0,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
})
