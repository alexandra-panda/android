import { Reducer } from 'redux'
import {
  AuthenticationStateType,
  authActionTypeConstants as T,
  AuthenticationRootActionType,
} from './types'

const initialState: AuthenticationStateType = {
  token: '',
  isAuthenticated: false,
}

export const authenticationReducer: Reducer<
  AuthenticationStateType,
  AuthenticationRootActionType
> = (state: AuthenticationStateType = initialState, action: AuthenticationRootActionType) => {
  switch (action.type) {
    case T.CLEAR_AUTH:
      return {
        ...state,
        isAuthenticated: false,
        token: '',
      }
    case T.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuth,
      }
    case T.FETCH_AUTH:
      return {
        ...state,
      }
    default:
      return state
  }
}
