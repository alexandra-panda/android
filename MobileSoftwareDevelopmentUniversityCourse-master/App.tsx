import React, { ReactElement, FC } from 'react'
import { ReduxWrapper } from '@/store/root/ReduxWrapper'
import ApplicationRouterWrapper from '@/routes/AppRouter'

const App: FC = (): ReactElement => {
  return (
    <ReduxWrapper>
      <ApplicationRouterWrapper />
    </ReduxWrapper>
  )
}

export default App
