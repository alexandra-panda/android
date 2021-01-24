import { combineReducers } from 'redux'
import { postsReducer } from '@/store/Posts/postsReducer'
import { notificationsReducer } from '../Notifications/notificationsReducer'
import { doctorsReducer } from '../Doctors/doctorsReducer'
import { authenticationReducer } from '../Authentication/authenticationReducer'

const rootReducer = combineReducers({
  postsReducer,
  notificationsReducer,
  doctorsReducer,
  authenticationReducer,
})

export default rootReducer
