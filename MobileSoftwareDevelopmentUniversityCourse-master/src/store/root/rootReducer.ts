import { combineReducers } from 'redux'
import { postsReducer } from '@/store/Posts/postsReducer'

const rootReducer = combineReducers({ postsReducer })

export default rootReducer
