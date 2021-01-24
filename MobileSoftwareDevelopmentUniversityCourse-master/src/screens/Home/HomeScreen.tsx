import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { ScrollView } from 'react-native'
import Cards from './Cards'

type HomeScreenPropType = PropsWithChildren<unknown> & {
  navigation: NavigationProp<ParamListBase>
}

export default class HomeScreen extends Component<HomeScreenPropType> {
  constructor(props: HomeScreenPropType) {
    super(props)
  }

  render(): ReactElement {
    return (
      <ScrollView>
        <Cards {...this.props} />
      </ScrollView>
    )
  }
}
