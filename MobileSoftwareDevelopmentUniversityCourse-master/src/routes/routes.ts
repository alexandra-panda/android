import { ComponentClass, FunctionComponent } from 'react'

import HomeScreen from '@/screens/Home/HomeScreen'
import RandomScreen from '@/screens/Random/RandomScreen'
import WebViewScreen from '@/screens/WebView/WebViewScreen'
import { OptionsScreen } from '@/screens/Options/OptionsScreen'

import { routeNames } from './routeNames'

type CustomRouteType = {
  [prop: string]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentClass<any, any> | FunctionComponent<any>
    isHeaderButton: boolean
    routeName: string
    headerButtonName?: string
  }
}

export const routes: CustomRouteType = {
  HomeScreen: {
    component: HomeScreen,
    isHeaderButton: true,
    routeName: routeNames.MainScreen,
    headerButtonName: 'Home',
  },
  RandomScreen: {
    component: RandomScreen,
    isHeaderButton: true,
    routeName: routeNames.RandomScreen,
    headerButtonName: 'Random',
  },
  WebViewScreen: {
    component: WebViewScreen,
    isHeaderButton: false,
    routeName: routeNames.WebViewScreen,
  },
  OptionsScreen: {
    component: OptionsScreen,
    isHeaderButton: true,
    routeName: routeNames.OptionsScreen,
    headerButtonName: 'Options',
  },
}

export const initialRoute = routes['HomeScreen'] || routes[Object.keys(routes)[0]]
