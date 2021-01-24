import React, { FC, ReactElement } from 'react'
import { View, StyleSheet, Button, Alert } from 'react-native'
import { FileJSONStorage } from '@/storage/index'

function clearApplicationCache() {
  Alert.alert(
    'Confirm',
    `Remove app cache ???`,
    [
      {
        text: 'Yes',
        onPress: async () => {
          const storage = new FileJSONStorage<unknown>()
          await storage.remove('data')
        },
      },
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
    ],
    { cancelable: false },
  )
}

export const OptionsScreen: FC = (): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <Button color="#711" onPress={clearApplicationCache} title="Clear application cache" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  childContainer: {
    minWidth: 300,
    minHeight: 400,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
})
