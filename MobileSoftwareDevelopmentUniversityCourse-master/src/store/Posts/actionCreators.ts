import { ThunkDispatch } from 'redux-thunk'
import {
  FetchPostsActionType,
  AddPostsActionType,
  StartFetchActionType,
  StopFetchActionType,
  AddImageToPostActionType,
  ReplacePostsStateActionType,
  Post,
  postsActionTypeConstants as T,
  PostsStateType,
} from './types'
import { GlobalStateType } from '@/store'
import { Action } from 'redux'
import { FileJSONStorage, Storage } from '@/storage'
import { fetchPosts, fetchImageForPost } from '@/webApi'

type AsyncActionCreatorType<T extends Action | Action> = (
  dispatch: ThunkDispatch<GlobalStateType, unknown, T>,
  getState: () => GlobalStateType,
) => void

function addPostsActionCreator(posts: Array<Post>): AsyncActionCreatorType<AddPostsActionType> {
  const action: AddPostsActionType = {
    type: T.ADD_POSTS,
    payload: posts,
  }

  return async (
    dispatch: ThunkDispatch<GlobalStateType, unknown, Action>,
    getState: () => GlobalStateType,
  ) => {
    dispatch(action)
    const storage: Storage<PostsStateType> = new FileJSONStorage<PostsStateType>()
    const state: PostsStateType = getState().postsReducer
    state.isFetch = false

    await storage.save('data', state)
  }
}

function startFetchActionCreator(): StartFetchActionType {
  return {
    type: T.START_LOAD,
  }
}

function stopFetchActionCreator(): StopFetchActionType {
  return {
    type: T.STOP_LOAD,
  }
}

function replacePostsStateActionCreator(state: PostsStateType): ReplacePostsStateActionType {
  return {
    type: T.REPLACE_POSTS_STATE,
    payload: state,
  }
}

function addImageToPostActionCreator(
  id: number,
  base64Image: string,
): AsyncActionCreatorType<AddImageToPostActionType> {
  const action: AddImageToPostActionType = {
    type: T.ADD_IMAGE_FOR_POST,
    payload: {
      base64Image,
      id,
    },
  }

  return async (
    dispatch: ThunkDispatch<GlobalStateType, unknown, Action>,
    getState: () => GlobalStateType,
  ) => {
    dispatch(action)
    const storage: Storage<PostsStateType> = new FileJSONStorage<PostsStateType>()
    const state: PostsStateType = getState().postsReducer
    state.isFetch = false

    await storage.save('data', state)
  }
}

export function fetchNewPosts(): AsyncActionCreatorType<FetchPostsActionType> {
  return async (
    dispatch: ThunkDispatch<GlobalStateType, unknown, Action>,
    getState: () => GlobalStateType,
  ) => {
    try {
      const pageNumber = getState().postsReducer.currentPage
      const postsPerPage = getState().postsReducer.POSTS_PER_PAGE
      const isFetch = getState().postsReducer.isFetch
      if (isFetch) {
        return
      }

      dispatch(startFetchActionCreator())
      const postsArray: Array<Post> = await fetchPosts(pageNumber, postsPerPage)
      dispatch(addPostsActionCreator(postsArray))
      postsArray.forEach(async (a) => {
        try {
          const base64ImageData = await fetchImageForPost(a.id)
          dispatch(addImageToPostActionCreator(a.id, base64ImageData))
        } catch (e) {
          console.error(e)
        }
      })

      dispatch(stopFetchActionCreator())
    } catch (error) {
      dispatch(stopFetchActionCreator())
      console.error(error)
    }
  }
}

export function fetchPostsFirstTime(): AsyncActionCreatorType<FetchPostsActionType> {
  return async (
    dispatch: ThunkDispatch<GlobalStateType, unknown, Action>,
    getState: () => GlobalStateType,
  ) => {
    try {
      const pageNumber = getState().postsReducer.currentPage
      const postsPerPage = getState().postsReducer.POSTS_PER_PAGE
      const isFetch = getState().postsReducer.isFetch
      if (isFetch) {
        return
      }
      dispatch(startFetchActionCreator())
      const storage: Storage<PostsStateType> = new FileJSONStorage<PostsStateType>()
      const stateFromStorage = await storage.load('data')

      if (stateFromStorage !== null) {
        dispatch(replacePostsStateActionCreator(stateFromStorage))
      } else {
        dispatch(startFetchActionCreator())
        const postsArray: Array<Post> = await fetchPosts(pageNumber, postsPerPage)
        dispatch(addPostsActionCreator(postsArray))
        postsArray.forEach(async (a) => {
          try {
            const base64ImageData = await fetchImageForPost(a.id)
            dispatch(addImageToPostActionCreator(a.id, base64ImageData))
          } catch (e) {
            console.error(e)
          }
        })
      }

      dispatch(stopFetchActionCreator())
    } catch (error) {
      dispatch(stopFetchActionCreator())
      console.error(error)
    }
  }
}
