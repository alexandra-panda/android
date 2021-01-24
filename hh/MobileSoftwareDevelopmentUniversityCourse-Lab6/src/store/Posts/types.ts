import { Action } from 'redux'

export enum postsActionTypeConstants {
  FETCH_POST = '@Posts/FETCH_POST',
  START_LOAD = '@Posts/START_LOAD',
  STOP_LOAD = '@Posts/STOP_LOAD',
  ADD_POSTS = '@Posts/ADD_POSTS',
  ADD_IMAGE_FOR_POST = '@Posts/ADD_IMAGE_FOR_POST',
  REPLACE_POSTS_STATE = '@Posts/REPLACE_POSTS_STATE',
}

export type Post = {
  id: number
  webUrl: string
  downloadImageUrl: string
  author: string
  base64Image: string
}

export type PostsStateType = {
  posts: Array<Post>
  isFetch: boolean
  currentPage: number
  readonly POSTS_PER_PAGE: number
}

export interface FetchPostsActionType extends Action {
  type: typeof postsActionTypeConstants.FETCH_POST
}

export interface AddPostsActionType extends Action {
  type: typeof postsActionTypeConstants.ADD_POSTS
  payload: Array<Post>
}

export interface StartFetchActionType extends Action {
  type: typeof postsActionTypeConstants.START_LOAD
}

export interface StopFetchActionType extends Action {
  type: typeof postsActionTypeConstants.STOP_LOAD
}

export interface AddImageToPostActionType extends Action {
  type: typeof postsActionTypeConstants.ADD_IMAGE_FOR_POST
  payload: {
    id: number
    base64Image: string
  }
}

export interface ReplacePostsStateActionType extends Action {
  type: typeof postsActionTypeConstants.REPLACE_POSTS_STATE
  payload: PostsStateType
}

export type PostsRootActionType =
  | FetchPostsActionType
  | AddPostsActionType
  | StartFetchActionType
  | StopFetchActionType
  | AddImageToPostActionType
  | ReplacePostsStateActionType
