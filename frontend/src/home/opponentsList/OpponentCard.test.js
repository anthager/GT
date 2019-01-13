import React from 'react'
import OpponentCard from './OpponentCard'
import { shallow } from 'enzyme'

test('Render OpponentCard without is selected', () => {
  const props = {
    name: '',
    amount: 0,
    isSelected: false,
    postGame: () => {},
    handleClick: () => {},
    handleCancel: () => {},
  }
  const oc = shallow(<OpponentCard {...props} />).dive()
  expect(oc.find('div').length).toEqual(1)
  expect(oc.find('span').length).toEqual(1)
  expect(oc.find('CardInput').length).toEqual(0)
  expect(oc.find('.amount').length).toEqual(0)
})
test('Render OpponentCard as selected', () => {
  const props = {
    name: 'anthager',
    amount: 10,
    isSelected: true,
    postGame: () => {},
    handleClick: () => {},
    handleCancel: () => {},
  }
  const oc = shallow(<OpponentCard {...props} />).dive()
  expect(oc.find('CardInput').length).toEqual(1)
  expect(oc.find('.amount').length).toEqual(1)
})
