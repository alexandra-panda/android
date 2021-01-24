import { DoctorType } from './types'
import { SetDoctorActionType, doctorsActionTypeConstants as T } from './types'

export function setDoctorsActionCreator(doctors: Array<DoctorType>): SetDoctorActionType {
  return {
    type: T.SET_DOCTORS,
    payload: {
      doctors,
    },
  }
}
