import React from 'react'
import { shallow, mount } from 'enzyme'
import List from './OpponentsList'
import Home from '../Home'

test('Render OpponentList with 3 opponents', () => {
  const props = {
    onSearch: () => {},
    postGame: () => {},
    content: [
      { name: 'simkarr', amount: 24, id: 1 },
      { name: 'anthager', amount: 24, id: 1 },
      { name: 'erjakob', amount: 24, id: 1 },
    ],
    cardColor: '',
    searchPhrase: '',
  }
  const list = shallow(<List {...props} />).dive()
  expect(list.find('OpponentCard').length).toEqual(3)
  expect(list.find('PlayerSearch').length).toEqual(1)
})
test('Should mark the first card as selected and it should be passed to the child', () => {
  const props = {
    onSearch: () => {},
    postGame: () => {},
    content: [
      { name: 'simkarr', amount: 24, id: 1 },
      { name: 'anthager', amount: 24, id: 1 },
      { name: 'erjakob', amount: 24, id: 1 },
    ],
    cardColor: '',
    searchPhrase: '',
  }
  const list = shallow(<List {...props} />)
  list.setState({ selected: 0 })
  expect(list.find('PlayerSearch').length).toEqual(1)
  expect(
    list
      .find('OpponentCard')
      .first()
      .props().isSelected,
  ).toBeTruthy()
})

// test('Should remove filter down the shown opponents when typed in search', () => {
//   const fucn = Home.onSearch
//   const props = {
//     onSearch: () => {},
//     postGame: () => {},
//     content: [
//       { name: 'simkarr', amount: 24, id: 1 },
//       { name: 'anthager', amount: 24, id: 1 },
//       { name: 'erjakob', amount: 24, id: 1 },
//     ],
//     cardColor: '',
//     searchPhrase: '',
//   }
//   const list = mount(<List {...props} />)
//   const ps = list.find('PlayerSearch')
//   const search = ps.find('input')

//   const event = { target: { value: 'anton' } }
//   search.simulate('change', event)
//   console.log(search.instance().props)
//   expect(list.find('OpponentCard').length).toEqual(1)
// })

test('Should remove the selection when started typing in search', () => {
  const props = {
    onSearch: () => {},
    postGame: () => {},
    content: [
      { name: 'simkarr', amount: 24, id: 1 },
      { name: 'anthager', amount: 24, id: 1 },
      { name: 'erjakob', amount: 24, id: 1 },
    ],
    cardColor: '',
    searchPhrase: '',
  }
  const listSpy = jest.spyOn(List.prototype, 'search')
  const list = mount(<List {...props} />)
  list.setState({ selected: 0 })
  const ps = list.find('PlayerSearch')
  const search = ps.find('input')

  const spy = jest.spyOn(ps.instance(), 'search')
  const event = { target: { value: 'anton' } }
  search.simulate('change', event)
  expect(spy).toHaveBeenCalled()
  expect(listSpy).toHaveBeenCalled()
  expect(
    list
      .find('OpponentCard')
      .first()
      .props().isSelected,
  ).toBeTruthy()
})
