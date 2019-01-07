import React from 'react'
import OpponentCard from './OpponentCard'
import { shallow } from 'enzyme'

const props = {
  name: '',
  amount: 0,
  isSelected: false,
  postGame: () => {},
  handleClick: () => {},
  handleCancel: () => {},
}

test('Render a div', () => {
  const oc = shallow(<OpponentCard {...props} />).dive()
  expect(oc.find('div').length).toBeGreaterThan(0)
})
