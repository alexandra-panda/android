import { rootGreenColor } from '@/constants'
import React, { Component, ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'

type CustomHeaderPropType = {
  leftElement: ReactElement
  centerElement: ReactElement
  rightElement: ReactElement
}

export class CustomHeader extends Component<CustomHeaderPropType> {
  constructor(props: CustomHeaderPropType) {
    super(props)
  }

  render(): ReactElement {
    return (
      <View style={styles.header}>
        <View style={{ height: '100%', justifyContent: 'center' }}>{this.props.leftElement}</View>
        <View style={{ height: '100%', justifyContent: 'center' }}>{this.props.centerElement}</View>
        <View style={{ height: '100%', justifyContent: 'center' }}>{this.props.rightElement}</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    paddingHorizontal: 12,
    backgroundColor: rootGreenColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})
