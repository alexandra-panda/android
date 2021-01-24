import { routeNames } from '@/routes/routeNames'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { FC, ReactElement } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, GestureResponderEvent } from 'react-native'
import { BottomMenuItem } from './BottomMenuItem'

type BottomMenuPropType = {
  selected: 'Home' | 'Notification' | 'Schedule' | 'Profile'
  notificationsIsPresent?: boolean
  navigation: NavigationProp<ParamListBase>
}

export const BottomMenu: FC<BottomMenuPropType> = (props: BottomMenuPropType): ReactElement => {
  return (
    <View style={styles.container}>
      <BottomMenuItem
        onClick={
          (/*e: GestureResponderEvent*/) => props.navigation.navigate(routeNames.DoctorListScreen)
        }
        iconColor={props.selected === 'Home' ? 'green' : 'grey'}
        type="Home"
        height={23}
        width={21}
      />
      <BottomMenuItem
        onClick={
          (/*e: GestureResponderEvent*/) => props.navigation.navigate(routeNames.NotificationScreen)
        }
        iconColor={props.selected === 'Notification' ? 'green' : 'grey'}
        withRedPoint={props.notificationsIsPresent}
        type="Notification"
        height={24}
        width={18}
      />

      {/* CENTER */}
      <TouchableOpacity
        activeOpacity={0.7}
        delayLongPress={1}
        delayPressIn={1}
        delayPressOut={1}
        onPress={() => props.navigation.navigate(routeNames.HomeScreen)}
      >
        <View style={styles.centerButton}>
          <Text style={{ color: 'white', fontSize: 38 }}>+</Text>
        </View>
      </TouchableOpacity>

      <BottomMenuItem
        onClick={(e: GestureResponderEvent) => console.log(e)}
        iconColor={props.selected === 'Schedule' ? 'green' : 'grey'}
        type="Schedule"
        height={23}
        width={24}
      />
      <BottomMenuItem
        onClick={() => props.navigation.navigate(routeNames.ProfileScreen)}
        iconColor={props.selected === 'Profile' ? 'green' : 'grey'}
        type="Profile"
        height={23}
        width={21}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  centerButton: {
    width: 60,
    height: 60,
    backgroundColor: 'rgb(7, 218, 95)',
    marginBottom: 25,
    borderRadius: 50,
    alignItems: 'center',
  },
})
