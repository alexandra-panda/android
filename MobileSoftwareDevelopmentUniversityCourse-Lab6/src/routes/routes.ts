import { ComponentClass, FunctionComponent } from 'react'

import WelcomeScreen from '@/screens/WelcomeScreen/WelcomeScreen'
import { LogoScreen } from '@/screens/LogoScreen/LogoScreen'

import { routeNames } from './routeNames'
import SignUpScreen from '@/screens/SignUpScreen/SignUpScreen'
import LoginScreen from '@/screens/LoginScreen/LoginScreen'
import { DoctorListScreen } from '@/screens/DoctorListScreen/DoctorListScreen'
import { NotificationScreen } from '@/screens/NotificationScreen/NotificationScreen'
import { DoctorDetailsScreen } from '@/screens/DoctorDetailsScreen/DoctorDetailsScreen'
import { HomeScreen } from '@/screens/HomeScreen/HomeScreen'
import { ProfileScreen } from '@/screens/ProfileScreen/ProfileScreen'

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
  LogoScreen: {
    component: LogoScreen,
    isHeaderButton: false,
    routeName: routeNames.LogoScreen,
  },
  WelcomeScreen: {
    component: WelcomeScreen,
    isHeaderButton: false,
    routeName: routeNames.WelcomeScreen,
  },
  SignUpScreen: {
    component: SignUpScreen,
    isHeaderButton: false,
    routeName: routeNames.SignUpScreen,
  },
  LoginScreen: {
    component: LoginScreen,
    isHeaderButton: false,
    routeName: routeNames.LoginScreen,
  },
  DoctorListScreen: {
    component: DoctorListScreen,
    isHeaderButton: false,
    routeName: routeNames.DoctorListScreen,
  },
  NotificationScreen: {
    component: NotificationScreen,
    isHeaderButton: false,
    routeName: routeNames.NotificationScreen,
  },
  DoctorDetailsScreen: {
    component: DoctorDetailsScreen,
    isHeaderButton: false,
    routeName: routeNames.DoctorDetailsScreen,
  },
  HomeScreen: {
    component: HomeScreen,
    isHeaderButton: false,
    routeName: routeNames.HomeScreen,
  },
  ProfileScreen: {
    component: ProfileScreen,
    isHeaderButton: false,
    routeName: routeNames.ProfileScreen,
  },
}

export const initialRoute = routes['HomeScreen'] || routes[Object.keys(routes)[0]]
