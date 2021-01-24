import React, { ReactElement } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

type ProgresBarPropType = {
  percent: number
}

type ProgresBarStateType = unknown

export class ProgresBar extends React.Component<ProgresBarPropType, ProgresBarStateType> {
  anim = new Animated.Value(0)

  constructor(props: ProgresBarPropType) {
    super(props)
  }

  render(): ReactElement {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.inner, { width: `${this.props.percent}%` }]} />
        <Animated.Text style={styles.label}>{String(this.props.percent)}</Animated.Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    padding: 3,
    borderColor: '#AAA',
    borderWidth: 3,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  inner: {
    flexGrow: 2,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#24c8dd',
  },
  label: {
    fontSize: 19,
    color: 'black',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
  },
})
