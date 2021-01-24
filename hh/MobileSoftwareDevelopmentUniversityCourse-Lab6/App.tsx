/**
 * React Native App
 * https://github.com/facebook/react-native
 */

import React, { ReactElement, FC } from 'react'

import { ReduxWrapper } from '@/store/root'
import AppNavigator from '@/routes/AppRouter'

const App: FC = (): ReactElement => {
  return (
    <ReduxWrapper>
      <AppNavigator />
    </ReduxWrapper>
  )
}
export default App
