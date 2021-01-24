import {
  NotificationType,
  SetNotificationActionType,
  notificationsActionTypeConstants as T,
} from './types'

export function setNotificationsActionCreator(
  notifications: Array<NotificationType>,
): SetNotificationActionType {
  return {
    type: T.SET_NOTIFICATIONS,
    payload: {
      notifications,
    },
  }
}
