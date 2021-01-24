import { Reducer } from 'redux'
import { DoctorRootActionType, DoctorsStateType, doctorsActionTypeConstants as T } from './types'

const initialState: DoctorsStateType = {
  doctors: [],
}

export const doctorsReducer: Reducer<DoctorsStateType, DoctorRootActionType> = (
  state: DoctorsStateType = initialState,
  action: DoctorRootActionType,
) => {
  switch (action.type) {
    case T.SET_DOCTORS:
      return {
        ...state,
        doctors: action.payload.doctors,
      }
    default:
      return state
  }
}
