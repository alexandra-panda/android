/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'react-native'
import { TouchableOpacity } from 'react-native'
import { createElement } from 'react'
import { shallow } from 'enzyme'

import { HeaderButton, HeaderButtonPropType } from '@/components/header/HeaderButton'

describe('Header Button test case', () => {
  let headerButtonProps: HeaderButtonPropType

  beforeEach(() => {
    headerButtonProps = {
      onClickHandler: () => {},
      title: 'tITle_314134',
      routeDir: 'HomeAboutRouteExample341341',
    }
  })

  test('Header Button renders correctly', () => {
    const component = shallow(createElement(HeaderButton, headerButtonProps, null))
    expect(component).toMatchSnapshot()
  })

  test('Click event invoke callback', () => {
    const onClickHandlerMock = jest.fn()
    headerButtonProps.onClickHandler = onClickHandlerMock

    const component = shallow(createElement(HeaderButton, headerButtonProps, null))
    const btnProps = component.find(TouchableOpacity).props() as any

    btnProps.onPress({})
    btnProps.onPress({})
    btnProps.onPress({})

    expect(onClickHandlerMock).toHaveBeenCalledTimes(3)
  })
})
