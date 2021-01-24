import { ImageSourcePropType } from 'react-native'

export enum doctorsActionTypeConstants {
  SET_DOCTORS = '@Doctors/SET_DOCTORS',
}

export type DoctorType = {
  doctorId: string
  name: string
  specialisation: string
  grade: string //5 start
  description: string
  address: string
  image: ImageSourcePropType
}

export type DoctorsStateType = {
  doctors: Array<DoctorType>
}

export interface SetDoctorActionType {
  type: typeof doctorsActionTypeConstants.SET_DOCTORS
  payload: {
    doctors: Array<DoctorType>
  }
}

export type DoctorRootActionType = SetDoctorActionType
