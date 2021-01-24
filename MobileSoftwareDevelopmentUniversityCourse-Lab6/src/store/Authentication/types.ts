import { Action } from 'redux'

export enum authActionTypeConstants {
  FETCH_AUTH = '@Auth/FETCH_AUTH',
  SET_TOKEN = '@Auth/SET_TOKEN',
  CLEAR_AUTH = '@Auth/CLEAR_AUTH',
}

export interface AuthenticationStateType {
  token: string
  isAuthenticated: boolean
}

export interface FetchAuthActionType extends Action {
  type: typeof authActionTypeConstants.FETCH_AUTH
}

export interface SetTokenStateType extends Action {
  type: typeof authActionTypeConstants.SET_TOKEN
  payload: {
    token: string
    isAuth: boolean
  }
}

export interface ClearAuthStateType extends Action {
  type: typeof authActionTypeConstants.CLEAR_AUTH
}

export type AuthenticationRootActionType =
  | FetchAuthActionType
  | SetTokenStateType
  | ClearAuthStateType
