/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'react-native'
import { shallow } from 'enzyme'
import React from 'react'

import { CameraScreen } from '@/screens/CameraScreen/CameraScreen'
import { PhotoResult } from '@/screens/CameraScreen/PhotoResult'
import ScreenShooter from '@/screens/CameraScreen/ScreenShooter'

import RNFS from 'react-native-fs'

jest.mock('react-native-fs', () => ({}))

describe('Camera screen test case', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  test('Camera screen snapshot', () => {
    const component = shallow(<CameraScreen />)
    expect(component).toMatchSnapshot()
  })

  test('Photo result snapshot', () => {
    const component = shallow(
      <PhotoResult base64ImageRaw="abc111" newPhotoButtonClickCallback={() => {}} />,
    )
    expect(component).toMatchSnapshot()
  })

  test('Screen shooter snapshot', () => {
    const component = shallow(<ScreenShooter onScreenSnapCallback={() => {}} />)
    expect(component).toMatchSnapshot()
  })
})
