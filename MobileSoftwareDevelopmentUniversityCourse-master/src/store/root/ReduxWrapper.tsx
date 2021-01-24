import React, { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { getStore } from './store'

export const ReduxWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <Provider store={getStore()}>{children}</Provider>
}
