/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'react-native'
import { View } from 'react-native'
import { createElement } from 'react'
import { shallow } from 'enzyme'

import * as routes from '@/routes/routes'

jest.mock('@/routes/routes', () => ({
  routes: {
    View1: {
      component: View,
      isHeaderButton: true,
    },
    View2: {
      component: View,
      isHeaderButton: true,
    },
    View3: {
      component: View,
      isHeaderButton: true,
    },
  },
}))

import { Header, HeaderPropsType } from '@/components/header/Header'
//

describe('Header Button test case', () => {
  let fakeProps: HeaderPropsType

  beforeEach(() => {
    fakeProps = {
      insets: {} as any,
      layout: {} as any,
      navigation: {} as any,
      mode: 'float',
      scene: {} as any,
      styleInterpolator: {} as any,
    }
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  test('Header renders correctly', () => {
    const component = shallow(createElement(Header, fakeProps, null))
    expect(component).toMatchSnapshot()
  })

  test('Header contains one or more buttons (HeaderButton Components)', () => {
    const component = shallow(createElement(Header, fakeProps, null))
    component.debug()
  })
})
