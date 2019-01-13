import React from 'react'
import { mount } from 'enzyme'
import Home from './Home'
import List from './opponentsList/OpponentsList'
import { StaticRouter } from 'react-router-dom'

class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value.toString()
  }

  removeItem(key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()

test('Should only show anthager when the search phrase is "ant"', async () => {
  const initState = {
    players: [{ name: 'simkarr', id: 1 }, { name: 'anthager', id: 2 }, { name: 'erjakob', id: 3 }],
    getOpponents: [{ name: 'anthager', amount: 24, id: 2 }, { name: 'erjakob', amount: 24, id: 3 }],
    content: [{ name: 'anthager', amount: 24, id: 2 }, { name: 'erjakob', amount: 24, id: 3 }],
  }
  Home.prototype.getOpponents = function() {
    this.setState(initState)
  }
  Home.prototype.getPlayers = () => {}
  const wrapper = mount(
    <StaticRouter location="someLocation" context={{}}>
      <Home />
    </StaticRouter>,
  )
  const home = wrapper.find(Home)
  const list = home.find(List)
  expect(list.instance().props.content.length).toBe(2)
  home.instance().onSearch('ant')
  expect(list.instance().props.content.length).toBe(1)
  expect(home).toBeTruthy()
})

test('should unselect when started typing in search "ant"', async () => {
  Home.prototype.getOpponents = () => {}
  Home.prototype.getPlayers = () => {}
  const wrapper = mount(
    <StaticRouter location="someLocation" context={{}}>
      <Home />
    </StaticRouter>,
  )
  const home = wrapper.find(Home)
  const list = home.find(List)
  list.setState({ selected: 0 })
  home.instance().onSearch('ant')
  expect(list.instance().state.selected).toBe(undefined)
  expect(home).toBeTruthy()
})
