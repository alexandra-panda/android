/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'react-native'
import { shallow } from 'enzyme'
import { ProgresBar } from '@/components/progressBar'
import React from 'react'

describe('Progress Bar test case', () => {
  test('Progress Bar snapshot test', () => {
    const component = shallow(<ProgresBar percent={44} />)
    expect(component).toMatchSnapshot()
  })
})
