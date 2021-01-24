import { Action, Reducer } from 'redux'
import {
  NotificationsStateType,
  notificationsActionTypeConstants as T,
  NotificationsRootStateType,
} from './types'

const initialState: NotificationsStateType = {
  notifications: [
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit , t. Ut enim ad minim venia m, quis nostrud exercitation ullamco',
      requestDetails: {
        description: 'Aku ingin menjadi setitik awan kecil di langit bersama mantari yaga hah',
        desease: 'Sore Eyes',
        location: 'St. broxlyn 212',
        name: 'Jojon Suehndra',
      },
      doctorId: 0,
    },
  ],
}

export const notificationsReducer: Reducer<NotificationsStateType, NotificationsRootStateType> = (
  state: NotificationsStateType = initialState,
  action: NotificationsRootStateType,
) => {
  switch (action.type) {
    case T.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.notifications,
      }
    default:
      return state
  }
}
