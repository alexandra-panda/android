import React, { ReactElement } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

type Animation1PropType = unknown

type Animation1StateType = {
  position: number //0.0 ... 1.0
  isIncrement: boolean
}

export class Animation1 extends React.Component<Animation1PropType, Animation1StateType> {
  private timerId: ReturnType<typeof setInterval> | undefined

  constructor(props: Animation1PropType) {
    super(props)

    this.state = {
      isIncrement: true,
      position: 0.0,
    }

    this.intervalDelayCallback = this.intervalDelayCallback.bind(this)
  }

  intervalDelayCallback(): void {
    const DELAY = 0.05
    const newPosVal = this.state.position + (this.state.isIncrement ? DELAY : -DELAY)

    if (newPosVal >= 1.0) {
      this.setState({ position: 1.0, isIncrement: false })
      return
    }

    if (newPosVal <= 0.0) {
      this.setState({ position: 0.0, isIncrement: true })
      return
    }

    this.setState({ position: newPosVal })
  }

  componentDidMount(): void {
    this.timerId = setInterval(this.intervalDelayCallback, 33)
  }

  componentWillUnmount(): void {
    clearInterval(this.timerId)
  }

  render(): ReactElement {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.inner, { width: `20%`, left: `${80 * this.state.position}%` }]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    padding: 3,
    borderColor: '#AAA',
    borderWidth: 3,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  inner: {
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8178ee',
  },
  label: {
    fontSize: 19,
    color: 'black',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
  },
})
