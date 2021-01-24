// import { Action } from 'redux'

export enum notificationsActionTypeConstants {
  SET_NOTIFICATIONS = '@Notifications/SET_NOTIFICATIONS',
}

export type NotificationType = {
  description: string
  requestDetails: {
    name: string //Jojon Suehandra
    desease: string //Sore Eyes
    location: string //St. Broxlyn 212
    description: string
  }
  doctorId: number
}

export type NotificationsStateType = {
  notifications: Array<NotificationType>
}

export interface SetNotificationActionType {
  type: notificationsActionTypeConstants.SET_NOTIFICATIONS
  payload: {
    notifications: Array<NotificationType>
  }
}

export type NotificationsRootStateType = SetNotificationActionType
