import {
  authActionTypeConstants as T,
  ClearAuthStateType,
  FetchAuthActionType,
  SetTokenStateType,
} from './types'

export function fetchAuthActionCreator(): FetchAuthActionType {
  return {
    type: T.FETCH_AUTH,
  }
}

export function clearAuthActionCreator(): ClearAuthStateType {
  return {
    type: T.CLEAR_AUTH,
  }
}

export function setAuthActionCreator(isAuth: boolean, token: string): SetTokenStateType {
  return {
    type: T.SET_TOKEN,
    payload: {
      isAuth,
      token,
    },
  }
}
