import { Reducer } from 'redux'
import { PostsStateType, postsActionTypeConstants as T } from './types'
import { PostsRootActionType } from '@/store/Posts/types'

const initialState: PostsStateType = {
  isFetch: false,
  posts: [],
  currentPage: 1,
  POSTS_PER_PAGE: 6,
}

export const postsReducer: Reducer<PostsStateType, PostsRootActionType> = (
  state: PostsStateType = initialState,
  action: PostsRootActionType,
) => {
  switch (action.type) {
    case T.START_LOAD:
      return {
        ...state,
        isFetch: true,
      }
    case T.STOP_LOAD:
      return {
        ...state,
        isFetch: false,
      }
    case T.ADD_IMAGE_FOR_POST:
      const newArray = [...state.posts]
      for (let i = 0; i < newArray.length; i++) {
        const el = newArray[i]
        if (el.id === action.payload.id) {
          el.base64Image = action.payload.base64Image
          break
        }
      }
      return {
        ...state,
        posts: newArray,
      }
    case T.ADD_POSTS:
      return {
        ...state,
        posts: state.posts.concat(action.payload),
        currentPage: state.currentPage + 1,
      }
    case T.REPLACE_POSTS_STATE:
      return {
        ...state,
        ...action.payload,
      }
    case T.FETCH_POST:
    default:
      return state
  }
}
