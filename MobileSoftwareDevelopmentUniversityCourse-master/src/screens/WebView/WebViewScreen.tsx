import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { Component, ReactElement } from 'react'
import { WebView } from 'react-native-webview'

type WebViewScreenPropType = {
  navigation: NavigationProp<ParamListBase>
  route: {
    params: {
      urlPath: string
    }
  }
}

class WebViewScreen extends Component<WebViewScreenPropType> {
  constructor(props: WebViewScreenPropType) {
    super(props)
  }

  render(): ReactElement {
    const uri: string = this.props.route.params.urlPath

    return <WebView source={{ uri }} />
  }
}

export default WebViewScreen
